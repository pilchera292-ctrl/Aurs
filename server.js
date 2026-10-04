import express from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Clave secreta para firmar tokens
const JWT_SECRET = process.env.JWT_SECRET || "sombra_super_secret_key_2026";
const PORT = process.env.PORT || 3000;

// Limitador de tasa: Previene fuerza bruta en el endpoint de autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos fallidos
  message: {
    success: false,
    message: "Demasiados intentos fallidos. Nodo bloqueado por 15 minutos."
  }
});

// Base de datos simulada (En producción conectar a PostgreSQL, MongoDB, etc.)
// Contraseña en texto plano: "sombra123"
const USERS_DB = [
  {
    id: "usr_01",
    usuario: "admin",
    role: "ROOT_OPERATOR",
    passwordHash: "$2a$10$xS2/j5dD0v4UvI/H42xR6.NHzR4G24.4m8L4hIeR1jO4uS.k8.B1C"
  }
];

// -----------------------------------------------------------------------------
// MIDDLEWARE: Autenticación de JWT
// -----------------------------------------------------------------------------
function authenticateToken(req, res, next) {
  const token = req.cookies.sombra_token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Acceso denegado. Token no detectado." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token expirado o no válido." });
    }
    req.user = user;
    next();
  });
}

// -----------------------------------------------------------------------------
// VISTAS Y ENDPOINTS
// -----------------------------------------------------------------------------

// Gateway Principal
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA 2.4 — Gateway Central</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');

* { box-sizing: border-box; }

body {
  margin: 0; min-height: 100vh; display: flex;
  justify-content: center; align-items: center;
  background: radial-gradient(circle at 50% 20%, rgba(0, 170, 255, 0.16), transparent 35%),
              linear-gradient(180deg, #111827 0%, #090d16 55%, #05070b 100%);
  color: #f3f4f6; font-family: 'Fira Code', monospace; overflow: hidden;
}

body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; opacity: 0.18;
  background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 32px 32px;
}

.scanlines {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 10;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
}

.container {
  width: 90%; max-width: 420px; padding: 32px;
  background: rgba(20, 25, 35, 0.94); border: 2px solid #00a2ff; border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 12px 45px rgba(0,0,0,0.75), 0 0 25px rgba(0,162,255,0.16);
  position: relative; z-index: 2;
}

.container::before {
  content: ""; position: absolute; top: -2px; left: 18px; right: 18px; height: 3px;
  background: #00a2ff; border-radius: 0 0 4px 4px; box-shadow: 0 0 12px rgba(0,162,255,0.65);
}

.header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
.logo { font-size: 24px; font-weight: 600; letter-spacing: 4px; color: #00a2ff; text-shadow: 0 0 10px rgba(0,162,255,0.5); }
.subtitle { font-size: 11px; color: #8b95a7; margin-top: 7px; letter-spacing: 1px; }
.system-status { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; color: #22c55e; margin-top: 10px; }
.dot { width: 7px; height: 7px; background-color: #22c55e; border-radius: 50%; box-shadow: 0 0 9px #22c55e; animation: blink 1.5s infinite; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.input-group { margin-bottom: 18px; text-align: left; position: relative; }
.label { display: block; margin-bottom: 8px; color: #aeb7c5; font-size: 12px; }
.input-wrapper { position: relative; display: flex; align-items: center; }

input {
  width: 100%; padding: 13px 14px; border-radius: 6px; border: 1px solid #303846;
  background: #0c111a; color: #f3f4f6; outline: none; font-family: inherit; font-size: 14px; transition: all 0.2s ease;
}
input:focus { border-color: #00a2ff; box-shadow: 0 0 0 2px rgba(0,162,255,0.16); }

.toggle-pwd { position: absolute; right: 12px; background: none; border: none; color: #8b95a7; cursor: pointer; font-size: 11px; }

button[type="submit"] {
  width: 100%; margin-top: 10px; padding: 14px; border: 0; border-radius: 6px;
  background: #00a2ff; color: white; font-family: inherit; font-size: 14px; font-weight: 600;
  letter-spacing: 1px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.35);
}
button:hover { background: #29b5ff; box-shadow: 0 0 15px rgba(0,162,255,0.35); }
button:disabled { background: #374151; cursor: not-allowed; box-shadow: none; }

#status { margin-top: 20px; min-height: 20px; font-size: 12px; text-align: center; line-height: 1.4; }
.status-info { color: #60a5fa; }
.status-success { color: #22c55e; }
.status-error { color: #ef4444; }
</style>
</head>
<body>
  <div class="scanlines"></div>
  <div class="container">
    <div class="header">
      <div class="logo">S0MBRA 2.4</div>
      <div class="subtitle">SISTEMA RESTRICTO DE ACCESO CENTRAL</div>
      <div class="system-status">
        <span class="dot"></span>
        <span>NODO ACTIVO — ENCRIPTACIÓN TLS v1.3</span>
      </div>
    </div>

    <form id="auth-form" onsubmit="access(event)">
      <div class="input-group">
        <label class="label" for="usuario">> USUARIO</label>
        <input id="usuario" type="text" placeholder="Ingresa tu usuario..." autocomplete="off" spellcheck="false" required>
      </div>

      <div class="input-group">
        <label class="label" for="clave">> ACCESO / CLAVE</label>
        <div class="input-wrapper">
          <input id="clave" type="password" placeholder="••••••••••••" autocomplete="off" required>
          <button type="button" class="toggle-pwd" onclick="togglePasswordVisibility()">VER</button>
        </div>
      </div>

      <button id="btn-submit" type="submit">AUTENTICAR</button>
    </form>

    <div id="status"></div>
  </div>

<script>
// Comprobar si existe una sesión válida
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/verify');
    if (res.ok) {
      window.location.href = '/terminal';
    }
  } catch (e) {}
});

function togglePasswordVisibility() {
  const claveInput = document.getElementById("clave");
  const toggleBtn = document.querySelector(".toggle-pwd");
  if (claveInput.type === "password") {
    claveInput.type = "text";
    toggleBtn.textContent = "OCULTAR";
  } else {
    claveInput.type = "password";
    toggleBtn.textContent = "VER";
  }
}

async function access(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById("usuario");
  const claveInput = document.getElementById("clave");
  const btn = document.getElementById("btn-submit");
  const status = document.getElementById("status");

  const usuario = usuarioInput.value.trim();
  const clave = claveInput.value.trim();

  usuarioInput.disabled = true;
  claveInput.disabled = true;
  btn.disabled = true;

  status.className = "status-info";
  status.textContent = "⏳ Firmando handshake JWT...";

  try {
    const response = await fetch("/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, clave })
    });

    const data = await response.json();

    if (data.success) {
      status.className = "status-success";
      status.textContent = "✅ TOKEN ASIGNADO. Redirigiendo a la Terminal...";
      setTimeout(() => {
        window.location.href = "/terminal";
      }, 700);
    } else {
      status.className = "status-error";
      status.textContent = "❌ " + (data.message || "Acceso denegado.");
      resetForm();
    }
  } catch (error) {
    status.className = "status-error";
    status.textContent = "❌ ERROR: Sin respuesta del nodo servidor.";
    resetForm();
  }
}

function resetForm() {
  document.getElementById("usuario").disabled = false;
  document.getElementById("clave").disabled = false;
  document.getElementById("btn-submit").disabled = false;
}
</script>
</body>
</html>
  `);
});

// Endpoint POST: Verificación de Credenciales y Entrega de JWT
app.post("/access", authLimiter, async (req, res) => {
  try {
    const usuario = String(req.body?.usuario || "").trim();
    const clave = String(req.body?.clave || "").trim();

    if (!usuario || !clave) {
      return res.status(400).json({ success: false, message: "Campos incompletos." });
    }

    const userFound = USERS_DB.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());
    if (!userFound) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas." });
    }

    const isMatch = await bcrypt.compare(clave, userFound.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas." });
    }

    // Generar Token JWT con vigencia de 2 horas
    const token = jwt.sign(
      { id: userFound.id, usuario: userFound.usuario, role: userFound.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Guardar JWT en Cookie HttpOnly
    res.cookie("sombra_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000
    });

    res.json({ success: true, message: "Autenticación exitosa." });

  } catch (error) {
    console.error("Error en servidor:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor." });
  }
});

// Verificación de token mediante API
app.get("/api/verify", authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Terminal Privada (Ruta Protegida por Cookie)
app.get("/terminal", (req, res) => {
  const token = req.cookies.sombra_token;

  if (!token) return res.redirect("/");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA 2.4 — Terminal Control</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');
body { background: #05070b; color: #00a2ff; font-family: 'Fira Code', monospace; padding: 40px; margin: 0; }
.terminal-card {
  max-width: 650px; margin: 40px auto; background: rgba(20, 25, 35, 0.95);
  border: 1px solid #00a2ff; padding: 25px; border-radius: 8px;
  box-shadow: 0 0 25px rgba(0,162,255,0.2);
}
h1 { font-size: 20px; color: #f3f4f6; margin-top: 0; border-bottom: 1px solid #303846; padding-bottom: 10px; }
.info-line { margin: 10px 0; font-size: 13px; color: #aeb7c5; }
.info-line span { color: #00a2ff; font-weight: 600; }
.sys-logs { background: #0c111a; padding: 15px; border-radius: 4px; border: 1px solid #1e293b; margin-top: 15px; font-size: 12px; color: #22c55e; }
button { background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-family: inherit; font-weight: 600; cursor: pointer; margin-top: 20px; }
button:hover { background: #dc2626; }
</style>
</head>
<body>
  <div class="terminal-card">
    <h1>> CENTRO DE COMANDO S0MBRA v2.4</h1>
    <div class="info-line">OPERADOR: <span>${decoded.usuario.toUpperCase()}</span></div>
    <div class="info-line">ROL ASIGNADO: <span>${decoded.role}</span></div>
    <div class="info-line">EXPIRACIÓN DE SESIÓN: <span>${new Date(decoded.exp * 1000).toLocaleTimeString()}</span></div>
    
    <div class="sys-logs">
      [OK] Enlace seguro establecido con gateway.<br>
      [OK] Módulos de encriptación TLS v1.3 verificados.<br>
      [OK] Bienvenido al nodo maestro de administración.
    </div>

    <button onclick="logout()">CERRAR SESIÓN</button>
  </div>

  <script>
    async function logout() {
      await fetch('/logout', { method: 'POST' });
      window.location.href = '/';
    }
  </script>
</body>
</html>
    `);
  } catch (err) {
    res.redirect("/");
  }
});

// Endpoint para cerrar sesión
app.post("/logout", (req, res) => {
  res.clearCookie("sombra_token");
  res.json({ success: true, message: "Sesión destruida." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[S0MBRA 2.4] Server iniciado en el puerto ${PORT}`);
});
