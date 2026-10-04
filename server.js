import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
const ACCESS_KEY = process.env.ACCESS_KEY;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA ACCESS</title>
<style>
* { box-sizing: border-box; }

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
  max-width: 390px;
  padding: 30px;
  background: #111;
  border: 1px solid #292929;
  border-radius: 18px;
  text-align: center;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 8px;
}

.subtitle {
  color: #888;
  margin-bottom: 25px;
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
  margin-bottom: 12px;
}

button {
  width: 100%;
  padding: 14px;
  border: 0;
  border-radius: 10px;
  background: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
}

#status {
  margin-top: 18px;
  min-height: 22px;
  color: #aaa;
}
</style>
</head>

<body>

<div class="container">

  <div class="logo">S0MBRA</div>

  <div class="subtitle">🔐 Sistema de acceso</div>

  <input
    id="code"
    type="text"
    placeholder="Ingresá tu código"
    autocomplete="off"
  >

  <button onclick="access()">ENTRAR</button>

  <div id="status"></div>

</div>

<script>
async function access() {

  const code = document.getElementById("code").value.trim();
  const status = document.getElementById("status");

  if (!code) {
    status.textContent = "⚠️ Ingresá un código";
    return;
  }

  status.textContent = "⏳ Verificando...";

  try {

    const response = await fetch("/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (data.success) {
      status.textContent = "✅ Acceso autorizado";
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

    const code = String(req.body?.code || "").trim();

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Falta el código"
      });
    }

    if (!ACCESS_KEY) {
      return res.status(500).json({
        success: false,
        message: "ACCESS_KEY no configurado"
      });
    }

    if (code !== ACCESS_KEY) {
      return res.status(401).json({
        success: false,
        message: "Código incorrecto"
      });
    }

    if (!DISCORD_WEBHOOK) {
      return res.status(500).json({
        success: false,
        message: "Webhook no configurado"
      });
    }

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "S0MBRA ACCESS",
        embeds: [
          {
            title: "🔐 Nuevo acceso a S0MBRA",
            description: "Un usuario ingresó correctamente al sistema.",
            fields: [
              {
                name: "Estado",
                value: "🟢 AUTORIZADO"
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    });

    res.json({
      success: true,
      message: "Acceso autorizado"
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
