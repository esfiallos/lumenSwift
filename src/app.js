// src/app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Rutas
import createEmocionRoutes from "./adapter/in/routes/emocionRoutes.js";
import usuarioRoutes from "./adapter/in/routes/usuarioRoutes.js";
import consejoRoutes from "./adapter/in/routes/consejoRoutes.js";
import mensajeRoutes from "./adapter/in/routes/mensajeRoutes.js";
import createChatRoutes from "./adapter/in/routes/chatRoutes.js";

// Documentacion
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from 'path';
import { fileURLToPath } from 'url';

// Construye una ruta absoluta al archivo swagger.yaml
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, 'docs', 'swagger.yaml'); // __dirname es '.../src', luego 'docs', luego 'swagger.yaml'
const swaggerDocument = YAML.load(swaggerPath);

export default function createApp(chatService) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // Rutas
  console.log("Creando rutas...");

  // Ruta de Documentación (Swagger)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log("Cargando rutas...");
app.use("/api/usuarios", usuarioRoutes);
console.log("Usuarios listo");

app.use("/api/consejos", consejoRoutes);
console.log("Consejos listo");

app.use("/api/mensajes", mensajeRoutes);
console.log("Mensajes listo");

app.use("/api/emociones", createEmocionRoutes(chatService));
console.log("Emociones listo");

app.use("/api/chat", createChatRoutes(chatService));
console.log("Chat listo");

  // 🔹 Default route
  app.get("/", (req, res) => {
    res.send("API de Bienestar Emocional Activa");
  });

  return app;
}
