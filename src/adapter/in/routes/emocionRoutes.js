// adapter/in/routes/emocionRoutes.js
import express from "express";
import * as emocionController from "../../../controllers/emocionController.js";

export default function createEmocionRoutes(chatService) {
  const router = express.Router();

  router.post("/", (req, res) => emocionController.crearEmocionConIA(req, res, chatService));
  router.get("/", emocionController.listarEmociones);

  return router;
}
