import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🇦🇷 S0MBRA ACCESS ONLINE");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`S0MBRA Access funcionando en puerto ${PORT}`);
});
