import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

app.get("/", (req, res) => {
  res.send("🇦🇷 S0MBRA ACCESS ONLINE");
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
        content: `🔐 Nuevo acceso a S0MBRA\nCódigo: ${code}`
      })
    });

    res.json({
      success: true,
      message: "Acceso registrado"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error del servidor"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`S0MBRA Access funcionando en puerto ${PORT}`);
});
