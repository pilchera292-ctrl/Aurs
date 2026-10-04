<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA 2.4 // SECURE GATEWAY</title>

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
  background-color: #030712;
  background-image:
    radial-gradient(at 50% 0%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 100% 100%, 20px 20px, 20px 20px;
  color: #f3f4f6;
  font-family: 'Fira Code', monospace;
}

.container {
  width: 90%;
  max-width: 420px;
  padding: 32px;
  background: rgba(15,23,42,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: 12px;
  box-shadow:
    0 0 40px rgba(0,0,0,0.8),
    0 0 15px rgba(16,185,129,0.1);
  position: relative;
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
  color: #10b981;
  text-shadow: 0 0 8px rgba(16,185,129,0.4);
}

.subtitle {
  font-size: 11px;
  color: #6b7280;
  margin-top: 6px;
  letter-spacing: 1px;
}

.system-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  color: #10b981;
  margin-top: 10px;
}

.dot {
  width: 7px;
  height: 7px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%,100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.input-group {
  margin-bottom: 18px;
  text-align: left;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #9ca3af;
  font-size: 12px;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #1e293b;
  background: #090d16;
  color: #f3f4f6;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
}

button {
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 6px;
  background: #10b981;
  color: #030712;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background: #34d399;
  box-shadow: 0 0 15px rgba(16,185,129,0.4);
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

.status-info { color: #3b82f6; }
.status-success { color: #10b981; }
.status-error { color: #ef4444; }
</style>
</head>

<body>

<div class="container">

  <div class="header">

    <!-- CAMBIO: S0MBRA 2.4 -->
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

    <!-- CAMBIO: USUARIO -->
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
        location.reload();
      }, 1500);

    } else {

      status.className = "status-error";
      status.textContent =
        "❌ " + (data.message || "Credenciales rechazadas.");

      resetForm();
    }

  } catch (error) {

    status.className = "status-error";
    status.textContent =
      "❌ ERROR: No se pudo conectar con el servidor de licencias.";

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
