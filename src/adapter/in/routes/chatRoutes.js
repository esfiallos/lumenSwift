// src/adapter/in/routes/chatRoutes.js
import express from "express";
// --- (AÑADIDO) ---
// Importamos el "guardia" de autenticación, igual que en emocionRoutes.js
import { authMiddleware } from '../middleware/authMiddleware.js';

function createChatRoutes(chatService) {
  const router = express.Router();

  // --- (CORREGIDO) ---
  // 1. La ruta ahora es "/" (que se convierte en /api/chat)
  // 2. Se añade "authMiddleware" para proteger la ruta
  // 3. Se lee "req.body.prompt" para coincidir con ChatInput.swift
  router.post("/", authMiddleware, async (req, res) => {
    try {
      // El cliente Swift envía un objeto { "prompt": "..." }
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "El 'prompt' es requerido" });
      }

      // El authMiddleware nos da "req.user"
      const userCorreo = req.user.correo;

      // (Opcional) Puedes pasar el correo al servicio si es necesario
      // const text = await chatService.chat(prompt, userCorreo);
      
      const text = await chatService.chat(prompt);

      // El cliente Swift (ChatViewModel) espera un objeto { "response": "..." }
      res.json({ response: text }); // Cambiado de 'reply' a 'response'

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // (Opcional) También deberías proteger esta ruta si no quieres
  // que cualquiera use tu agente de IA.
  router.post("/agent", authMiddleware, async (req, res) => {
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

export default createChatRoutes;
