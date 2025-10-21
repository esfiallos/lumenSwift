const express = require("express");

function createChatRoutes(chatService) {
  const router = express.Router();

  router.post("/chat", async (req, res) => {
    try {
      const text = await chatService.chat(req.body.message);
      res.json({ reply: text });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post("/agent", async (req, res) => {
    try {
      const { prompt, type } = req.body;
      const result = await chatService.agent(prompt, type);
      res.json({ result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createChatRoutes;
