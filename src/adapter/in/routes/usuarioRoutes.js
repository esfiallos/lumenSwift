// src/adapter/in/routes/usuarioRoutes.js
import express from "express";
import {crearUsuario, listarUsuarios} from "../../../controllers/usuarioController.js";

const router = express.Router();

router.post("/", crearUsuario);
router.get("/", listarUsuarios);

export default router;
