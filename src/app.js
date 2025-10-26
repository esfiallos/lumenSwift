// src/app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import createEmocionRoutes from "./adapter/in/routes/emocionRoutes.js";
import usuarioRoutes from "./adapter/in/routes/usuarioRoutes.js";
import consejoRoutes from "./adapter/in/routes/consejoRoutes.js";
import mensajeRoutes from "./adapter/in/routes/mensajeRoutes.js";

export default function createApp(chatService) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // 🔹 Rutas

  console.log("🧩 Creando rutas...");

console.log("🧩 Cargando rutas...");
app.use("/api/usuarios", usuarioRoutes);
console.log("✅ Usuarios listo");

app.use("/api/consejos", consejoRoutes);
console.log("✅ Consejos listo");

app.use("/api/mensajes", mensajeRoutes);
console.log("✅ Mensajes listo");

app.use("/api/emociones", createEmocionRoutes(chatService));
console.log("✅ Emociones listo");

  // 🔹 Default route
  app.get("/", (req, res) => {
    res.send("API de Bienestar Emocional Activa");
  });

  return app;
}
