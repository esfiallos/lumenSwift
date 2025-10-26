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
    const result = await this.model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }]
    });
    return result.response.text();
  }
}

export default GeminiAdapter;

