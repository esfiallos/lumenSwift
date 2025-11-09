// GeminiAdapter.js
import AIPort from "../../core/ports/aiPort.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiAdapter extends AIPort {
  constructor(apiKey) {
    super();
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generate(message) {
    console.log("    --> [GeminiAdapter] Intentando generar contenido para:", message.substring(0, 50) + "...");
    try {
      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: message }] }]
      });
      const responseText = result.response.text();
      
      // --- INICIO DE LOGS ---
      console.log("    --> [GeminiAdapter] ÉXITO. Respuesta recibida.");
      // --- FIN DE LOGS ---
      
      return responseText;
    } catch (err) {
      // --- INICIO DE LOGS ---
      console.error("    --> [GeminiAdapter] ¡ERROR AL CONTACTAR A GEMINI!", err.message);
      // --- FIN DE LOGS ---
      throw err; // Re-lanzamos el error
    }
  }
}

export default GeminiAdapter;

