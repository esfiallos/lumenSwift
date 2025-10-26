// usuarioRoutes.js
import express from "express";
import { registrarUsuario, obtenerUsuarios } from "../../../controllers/usuarioController.js";

const router = express.Router();

router.post("/", registrarUsuario);
router.get("/", obtenerUsuarios);

export default router;
