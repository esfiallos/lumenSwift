// adapter/in/routes/emocionRoutes.js
import express from "express";
import * as emocionController from "../../../controllers/emocionController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

export default function createEmocionRoutes(chatService) {

  const router = express.Router();
 // 1.  (authMiddleware) AQUÍ
  // Ahora, para crear una emoción, el usuario debe presentar un token válido.
  router.post(
    "/",
    authMiddleware, // <-- El guardia revisa el token primero
    (req, res) => emocionController.crearEmocionConIA(req, res, chatService) 
  );

  // 2. AÑADIMOS EL "GUARDIA" 
  // Para listar sus emociones, también debe estar autenticado.
  router.get(
    "/",
    authMiddleware, // <-- El guardia revisa el token
    emocionController.listarEmociones // <-- Si es válido, pasa al controlador
  );

  return router;
}