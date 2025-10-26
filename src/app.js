// src/app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Importar rutas en ES Modules
import createChatRoutes from "./adapter/in/routes/chatRoutes.js";
import usuarioRoutes from "./adapter/in/routes/usuarioRoutes.js";
import emocionRoutes from "./adapter/in/routes/emocionRoutes.js";
import mensajeRoutes from "./adapter/in/routes/mensajeRoutes.js";
import consejoRoutes from "./adapter/in/routes/consejoRoutes.js";

function createApp(chatService) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // --- Ruta de prueba ---
  app.get("/", (req, res) => res.json({ message: "Lumen backend running" }));

  // --- Rutas modulares ---
  app.use("/api/chat", createChatRoutes(chatService));
  app.use("/api/usuarios", usuarioRoutes);
  app.use("/api/emociones", emocionRoutes);
  app.use("/api/mensajes", mensajeRoutes);
  app.use("/api/consejos", consejoRoutes);

  return app;
}

export default createApp;
