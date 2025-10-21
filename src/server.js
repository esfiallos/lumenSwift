const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ChatService = require("./core/services/chatService");
const GeminiAdapter = require("./adapter/out/geminiAdapter");
const connectMongo = require("./adapter/out/mongoAdapter");
const createChatRoutes = require("./adapter/in/routes/chatRoutes");
const { PORT, GEMINI_API_KEY, MONGO_URI } = require("./config/env");

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Conectar Mongo Atlas
  await connectMongo(MONGO_URI);

  // Instanciar IA y servicio principal
  const gemini = new GeminiAdapter(GEMINI_API_KEY);
  const chatService = new ChatService(gemini);

  // Registrar rutas
  app.use("/api", createChatRoutes(chatService));

  app.listen(PORT, () => {
    console.log(`Servidor Lumen corriendo en http://localhost:${PORT}`);
  });
}

startServer();
