// src/adapter/in/routes/chatRoutes.js
import express from "express";
// --- (AÑADIDO) ---
// Importamos el "guardia" de autenticación, igual que en emocionRoutes.js
import { authMiddleware } from '../middleware/authMiddleware.js';

function createChatRoutes(chatService) {
  const router = express.Router();

  // 1. La ruta ahora es "/" (que se convierte en /api/chat)
  //  Se añade "authMiddleware" para proteger la ruta
  // 3. Se lee "req.body.prompt" para coincidir con ChatInput.swift
  router.post("/", authMiddleware, async (req, res) => {

    console.log("\n--- INICIO PETICIÓN POST /api/chat ---");
    console.log("  -> Middleware de Auth: ¡ÉXITO! (Token verificado)");
    console.log("  -> Usuario autenticado:", req.user.correo);
    console.log("  -> Header 'Authorization' completo:", req.headers['authorization']);
    console.log("  -> Body (raw) recibido:", JSON.stringify(req.body));

    try {
      const { prompt } = req.body;
      if (!prompt) {
        console.error("  -> ERROR: El 'prompt' es requerido.");
        return res.status(400).json({ error: "El 'prompt' es requerido" });
      }

      // El authMiddleware nos da "req.user"
      // const userCorreo = req.user.correo;

      const promptControlado = `
        Eres 'Lumen', un asistente de bienestar empático.
        El usuario dice: "${prompt}"

        Responde de forma breve y concisa, ideal para un chat móvil. 
        Mantén tu respuesta por debajo de 50 palabras.
      `;
      
      console.log("  -> Llamando a chatService.chat()...");
      const text = await chatService.chat(promptControlado);

      console.log("  -> chatService.chat() respondió.");
      res.json({ response: text });

    } catch (err) {
      console.error("\n*** ¡ERROR EN CHAT! ***");
      console.error("  -> El 'chatService' falló:", err.message);
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
