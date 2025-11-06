// usuarioRoutes.js
import express from "express";
import { registrarUsuario, obtenerUsuarios, loginUsuario } from "../../../controllers/usuarioController.js";

const router = express.Router();

router.post("/", registrarUsuario);
router.get("/", obtenerUsuarios);
router.post("/login", loginUsuario);

export default router;
