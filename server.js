import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA 2.4</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(circle at 50% 20%, rgba(0, 170, 255, 0.16), transparent 35%),
    linear-gradient(180deg, #111827 0%, #090d16 55%, #05070b 100%);
  color: #f3f4f6;
  font-family: 'Fira Code', monospace;
  overflow: hidden;
}

/* Estilo Roblox: bloques y líneas de fondo */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Luces ambientales */
body::after {
  content: "";
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(0, 162, 255, 0.08);
  filter: blur(80px);
  top: -220px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.container {
  width: 90%;
  max-width: 420px;
  padding: 32px;
  background: rgba(20, 25, 35, 0.94);
  border: 2px solid #00a2ff;
  border-radius: 10px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.05),
    0 12px 45px rgba(0,0,0,0.75),
    0 0 25px rgba(0,162,255,0.16);
  position: relative;
  z-index: 2;
}

/* Barra superior estilo interfaz Roblox */
.container::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 18px;
  right: 18px;
  height: 3px;
  background: #00a2ff;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 12px rgba(0,162,255,0.65);
}

.header {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #00a2ff;
  text-shadow: 0 0 10px rgba(0,162,255,0.5);
}

.subtitle {
  font-size: 11px;
  color: #8b95a7;
  margin-top: 7px;
  letter-spacing: 1px;
}

.system-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  color: #22c55e;
  margin-top: 10px;
}

.dot {
  width: 7px;
  height: 7px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 9px #22c55e;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.input-group {
  margin-bottom: 18px;
  text-align: left;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #aeb7c5;
  font-size: 12px;
}

input {
  width: 100%;
  padding: 13px 14px;
  border-radius: 6px;
  border: 1px solid #303846;
  background: #0c111a;
  color: #f3f4f6;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s ease;
}

input::placeholder {
  color: #596273;
}

input:focus {
  border-color: #00a2ff;
  box-shadow: 0 0 0 2px rgba(0,162,255,0.16);
}

button {
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border: 0;
  border-radius: 6px;
  background: #00a2ff;
  color: white;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.35);
}

button:hover {
  background: #29b5ff;
  box-shadow:
    0 0 15px rgba(0,162,255,0.35),
    0 5px 15px rgba(0,0,0,0.4);
}

button:active {
  transform: translateY(1px);
}

button:disabled {
  background: #374151;
  cursor: not-allowed;
  box-shadow: none;
}

#status {
  margin-top: 20px;
  min-height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
}

.status-info {
  color: #60a5fa;
}

.status-success {
  color: #22c55e;
}

.status-error {
  color: #ef4444;
}
</style>
</head>

<body>

<div class="container">

  <div class="header">

    <div class="logo">S0MBRA 2.4</div>

    <div class="subtitle">
      SISTEMA RESTRICTO DE ACCESO CENTRAL
    </div>

    <div class="system-status">
      <span class="dot"></span>
      <span>NODO ACTIVO — ENCRIPTACIÓN TLS v1.3</span>
    </div>

  </div>

  <div class="input-group">
    <label class="label">> USUARIO</label>

    <input
      id="usuario"
      type="text"
      placeholder="Ingresa tu usuario..."
      autocomplete="off"
      spellcheck="false"
    >
  </div>

  <div class="input-group">
    <label class="label">> ACCESO / CLAVE</label>

    <input
      id="clave"
      type="password"
      placeholder="••••••••••••"
      autocomplete="off"
    >
  </div>

  <button id="btn-submit" onclick="access()">
    AUTENTICAR
  </button>

  <div id="status"></div>

</div>

<script>
async function access() {

  const usuarioInput = document.getElementById("usuario");
  const claveInput = document.getElementById("clave");
  const btn = document.getElementById("btn-submit");
  const status = document.getElementById("status");

  const usuario = usuarioInput.value.trim();
  const clave = claveInput.value.trim();

  if (!usuario || !clave) {
    status.className = "status-error";
    status.textContent = "❌ ERROR: Ingrese credenciales completas.";
    return;
  }

  usuarioInput.disabled = true;
  claveInput.disabled = true;
  btn.disabled = true;

  status.className = "status-info";
  status.textContent = "⏳ Validando handshake de autenticación...";

  try {

    await new Promise(resolve => setTimeout(resolve, 800));

    const response = await fetch("/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario,
        clave
      })
    });

    const data = await response.json();

    if (data.success) {

      status.className = "status-success";
      status.textContent =
        "✅ ACCESO AUTORIZADO. Redirigiendo al terminal...";

      setTimeout(() => {
        alert("Acceso concedido a S0MBRA 2.4.");
      }, 1000);

    } else {

      status.className = "status-error";
      status.textContent =
        "❌ " + (data.message || "Credenciales rechazadas.");

      resetForm();
    }

  } catch (error) {

    status.className = "status-error";
    status.textContent =
      "❌ ERROR: No se pudo conectar con el servidor.";

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

app.post("/access", async (req, res) => {

  try {

    const usuario = String(req.body?.usuario || "").trim();
    const clave = String(req.body?.clave || "").trim();

    if (!usuario || !clave) {
      return res.status(400).json({
        success: false,
        message: "Credenciales incompletas."
      });
    }

    // Colocá aquí tu validación real de usuario/clave.
    // No se almacenan ni se envían las contraseñas a terceros.

    res.json({
      success: true,
      message: "Autenticación exitosa."
    });

  } catch (error) {

    console.error("Error en servidor:", error);

    res.status(500).json({
      success: false,
      message: "Error de servidor interno."
    });

  }

});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    \`[S0MBRA 2.4] Gateway ejecutándose en puerto \${PORT}\`
  );
});
