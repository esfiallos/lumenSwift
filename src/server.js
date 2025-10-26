import { PORT, MONGO_URI, GEMINI_API_KEY } from "./config/env.js";
import connectMongo from "./adapter/out/mongoAdapter.js";
import createApp from "./app.js";

import ChatService from "./core/services/chatService.js";
import GeminiAdapter from "./adapter/out/geminiAdapter.js";

async function startServer() {
  try {
    if (!MONGO_URI) throw new Error("Falta MONGO_URI");
    await connectMongo(MONGO_URI);
    console.log("Conectado a MongoDB");

    if (!GEMINI_API_KEY) throw new Error("Falta GEMINI_API_KEY");
    const gemini = new GeminiAdapter(GEMINI_API_KEY);
    const chatService = new ChatService(gemini);

    const app = createApp(chatService);

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (err) {
    console.error("Error al iniciar el servidor:", err.message);
    process.exit(1);
  }
}

startServer();
