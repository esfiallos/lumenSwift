// adapter/in/routes/mensajeRoutes.js
import express from "express";
const router = express.Router();

import { crearMensaje, listarMensajes } from "../../../controllers/mensajeController.js";

router.post("/", crearMensaje);
router.get("/", listarMensajes);

export default router;
