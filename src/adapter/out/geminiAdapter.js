const { GoogleGenerativeAI } = require("@google/generative-ai");
const AIPort = require("../../core/ports/aiPort");

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

module.exports = GeminiAdapter;
