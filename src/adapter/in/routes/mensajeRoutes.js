// src/adapter/in/routes/mensajeRoutes.js
import express from "express";
import { registrarMensaje, obtenerMensajes } from "../../../controllers/mensajeController.js";

const router = express.Router();

router.post("/", registrarMensaje);
router.get("/", obtenerMensajes);

export default router;
