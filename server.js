
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
    type="password"
    placeholder="Ingresá tu clave"
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
    status.textContent = "⚠️ 
