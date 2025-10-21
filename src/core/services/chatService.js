class ChatService {
  constructor(aiPort) {
    this.aiPort = aiPort;
  }

  async chat(message) {
    if (!message) throw new Error("Falta el mensaje");
    return await this.aiPort.generate(message);
  }

  async agent(prompt, type) {
    if (!prompt || !type) throw new Error("Falta prompt o type");
    let instruction;

    switch (type) {
      case "int":
        instruction = `Responde con un número entero: ${prompt}`;
        break;
      case "bool":
        instruction = `Responde con true o false: ${prompt}`;
        break;
      case "string":
        instruction = `Responde solo con texto: ${prompt}`;
        break;
      default:
        instruction = prompt;
    }

    const response = await this.aiPort.generate(instruction);
    if (type === "int") return parseInt(response, 10);
    if (type === "bool") return response.toLowerCase() === "true";
    return response;
  }
}

module.exports = ChatService;
