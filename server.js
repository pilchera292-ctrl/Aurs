import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>S0MBRA // DASHBOARD</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  background-color: #050811;
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 162, 255, 0.08) 0px, transparent 50%),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 25px 25px, 25px 25px;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  display: flex;
}

/* Sidebar Navigation */
.sidebar {
  width: 240px;
  background: rgba(10, 15, 26, 0.9);
  border-right: 1px solid rgba(0, 162, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.brand {
  font-size: 18px;
  font-weight: 600;
  color: #00a2ff;
  letter-spacing: 2px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 13px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item a:hover, .nav-item.active a {
  background: rgba(0, 162, 255, 0.1);
  color: #00a2ff;
  border-left: 3px solid #00a2ff;
}

/* Main Layout */
.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.title-section h1 {
  font-size: 20px;
  font-weight: 600;
}

.title-section p {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* Status Cards Grid */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(0, 162, 255, 0.15);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(8px);
}

.card-title {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: #f8fafc;
}

.card-status {
  font-size: 11px;
  margin-top: 8px;
  color: #22c55e;
}

/* Content Area */
.panel-section {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(0, 162, 255, 0.15);
  border-radius: 8px;
  padding: 24px;
}

.section-title {
  font-size: 14px;
  color: #00a2ff;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.logs-container {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 15px;
  font-size: 12px;
  color: #38bdf8;
  height: 150px;
  overflow-y: auto;
  line-height: 1.6;
}

</style>
</head>
<body>

  <!-- Navigation -->
  <aside class="sidebar">
    <div class="brand">
      <span>⚡</span> S0MBRA OS
    </div>

    <ul class="nav-list">
      <li class="nav-item active"><a href="#">📊 Estado General</a></li>
      <li class="nav-item"><a href="#">⚙️️ Configuración</a></li>
      <li class="nav-item"><a href="#">📝 Registros</a></li>
      <li class="nav-item"><a href="#">🌐 Nodos</a></li>
    </ul>
  </aside>

  <!-- Content -->
  <main class="main-content">
    <header class="header">
      <div class="title-section">
        <h1>PANEL DE CONTROL</h1>
        <p>Métricas del sistema en tiempo real</p>
      </div>
    </header>

    <section class="grid-cards">
      <div class="card">
        <div class="card-title">ESTADO DEL SERVIDOR</div>
        <div class="card-value">ONLINE</div>
        <div class="card-status">● Operativo (99.9%)</div>
      </div>

      <div class="card">
        <div class="card-title">SOLICITUDES / MIN</div>
        <div class="card-value">1,280</div>
        <div class="card-status">+12% vs hora anterior</div>
      </div>

      <div class="card">
        <div class="card-title">USO DE MEMORIA</div>
        <div class="card-value">42.5 MB</div>
        <div class="card-status">Estable</div>
      </div>
    </section>

    <section class="panel-section">
      <h2 class="section-title">> EVENTOS RECIENTES</h2>
      <div class="logs-container">
        [SYS_INIT] Servicio Express iniciado correctamente.<br>
        [NET_OK] Conexión estable en el puerto ${PORT}.<br>
        [INFO] Monitorización de datos activa.<br>
        [READY] Esperando solicitudes de cliente...
      </div>
    </section>
  </main>

</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`[SYS] Servidor corriendo en http://localhost:${PORT}`);
});
