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

  // --- Prueba de vida para Render ---
  app.get("/", (req, res) => res.json({ message: "Lumen backend running 🚀" }));

  try {
    // --- Conexión a Mongo ---
    if (!MONGO_URI) throw new Error("Falta MONGO_URI en variables de entorno");
    await connectMongo(MONGO_URI);
    console.log("Conectado a MongoDB");

    // --- Gemini ---
    if (!GEMINI_API_KEY) throw new Error("Falta GEMINI_API_KEY en .env o Render");
    const gemini = new GeminiAdapter(GEMINI_API_KEY);
    const chatService = new ChatService(gemini);

    // --- Rutas principales ---
    app.use("/api", createChatRoutes(chatService));

    // --- Escuchar puerto ---
    const port = PORT || process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor Lumen corriendo en puerto ${port}`);
    });
  } catch (err) {
    console.error("Error al iniciar el servidor:", err.message);
    process.exit(1); // termina proceso con error explícito
  }
}

// Inicia el servidor
startServer();
