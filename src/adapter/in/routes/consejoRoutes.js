// src/adapter/in/routes/consejoRoutes.js
import express from "express";
import { registrarConsejo, obtenerConsejos } from "../../../controllers/consejoController.js";

const router = express.Router();

router.post("/", registrarConsejo);
router.get("/", obtenerConsejos);

export default router;
