const express = require('express');
const jwt = require('jwt-simple');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Trust Proxy para obtener la IP real si estás detrás de un proxy (Nginx, Cloudflare, Heroku)
app.set('trust proxy', true);

// Configuración
const SECRET_KEY = 'tu_clave_secreta_jwt';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/TU_WEBHOOK_AQUI';
const MAX_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutos de bloqueo

// Almacenamiento en memoria para contador de intentos y bloqueos temporales
const loginAttempts = new Map();

// 🌐 Función para sanitizar/obtener IP del cliente con precauciones
function getClientIp(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    return ip.split(',')[0].trim();
}

// 📋 Registro local de accesos en archivo
function logAccessLocal(entry) {
    const logLine = `[${entry.timestamp}] Usuario:${entry.username} | Status: ${entry.success ? 'ÉXITO' : 'FALLO'} \vert{} IP: ${entry.ip} | Intentos: ${entry.attempts} \vert{} User-Agent:${entry.userAgent}\n`;
    fs.appendFileSync(path.join(__dirname, 'access.log'), logLine, 'utf8');
}

// 🔔 Envío de alertas a Discord
async function sendDiscordNotification(data) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes('TU_WEBHOOK_AQUI')) return;

    const embed = {
        title: data.success ? '✅ Inicio de sesión exitoso' : '❌ Intento de sesión fallido',
        color: data.success ? 0x2ecc71 : 0xe74c3c,
        fields: [
            { name: '🟢 Usuario', value: `\`${data.username}\``, inline: true },
            { name: '🕐 Fecha y Hora', value: data.timestamp, inline: true },
            { name: '🌐 IP', value: `\`${data.ip}\``, inline: true },
            { name: '📊 Intentos registrados', value: `${data.attempts}`, inline: true },
            { name: '🔒 Estado Bloqueo', value: data.isLocked ? '⛔ Bloqueado' : '🟢 Activo', inline: true },
            { name: '🖥️ User-Agent', value: `\`\`\`${data.userAgent.substring(0, 150)}\`\`\`` }
        ],
        timestamp: new Date().toISOString()
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, { embeds: [embed] });
    } catch (err) {
        console.error('Error al enviar webhook a Discord:', err.message);
    }
}

// Ruta de Autenticación
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const clientIp = getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'Desconocido';
    const now = Date.now();
    const formattedDate = new Date().toLocaleString();

    // Key para rastrear intentos (combinación de Usuario e IP para mayor precisión)
    const attemptKey = `${username}_${clientIp}`;
    let attemptData = loginAttempts.get(attemptKey) || { count: 0, lockUntil: 0 };

    // 🔒 Verificación de bloqueo temporal
    if (attemptData.lockUntil > now) {
        const remainingMinutes = Math.ceil((attemptData.lockUntil - now) / 60000);
        return res.status(429).json({
            error: `Cuenta/IP bloqueada temporalmente. Intenta de nuevo en ${remainingMinutes} minuto(s).`
        });
    }

    // Validación de credenciales (Ejemplo estático para la demostración)
    const isValidUser = (username === 'admin' && password === '123456');

    if (!isValidUser) {
        // 📊 Incrementar contador de intentos
        attemptData.count += 1;

        // 🔒 Aplicar bloqueo temporal si supera el límite
        let isLocked = false;
        if (attemptData.count >= MAX_ATTEMPTS) {
            attemptData.lockUntil = now + LOCK_TIME_MS;
            isLocked = true;
        }

        loginAttempts.set(attemptKey, attemptData);

        const logEntry = {
            username: username || 'Anónimo',
            timestamp: formattedDate,
            success: false,
            ip: clientIp,
            attempts: attemptData.count,
            isLocked: isLocked,
            userAgent: userAgent
        };

        // 📋 Registro local y 🔔 Notificación
        logAccessLocal(logEntry);
        sendDiscordNotification(logEntry);

        return res.status(401).json({
            error: 'Credenciales inválidas',
            intentosRestantes: Math.max(0, MAX_ATTEMPTS - attemptData.count)
        });
    }

    // Resetear contador de intentos en caso de éxito
    loginAttempts.delete(attemptKey);

    // 🎫 Crear sesión mediante JWT / Cookie
    const payload = {
        username: username,
        iat: Math.floor(now / 1000),
        exp: Math.floor((now + 3600000) / 1000) // Expiración en 1 hora
    };
    
    const token = jwt.encode(payload, SECRET_KEY);

    // Guardar token en cookie HTTP-Only segura
    res.cookie('authToken', token, {
        httpOnly: true, // Protege contra XSS
        secure: process.env.NODE_ENV === 'production', // Requiere HTTPS en producción
        sameSite: 'strict', // Protege contra CSRF
        maxAge: 3600000
    });

    const logEntry = {
        username: username,
        timestamp: formattedDate,
        success: true,
        ip: clientIp,
        attempts: 1,
        isLocked: false,
        userAgent: userAgent
    };

    // 📋 Registro local y 🔔 Notificación
    logAccessLocal(logEntry);
    sendDiscordNotification(logEntry);

    return res.status(200).json({
        message: 'Autenticación exitosa',
        token: token
    });
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
