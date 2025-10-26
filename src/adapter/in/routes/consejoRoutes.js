import express from "express";
const router = express.Router();

import { crearConsejo, listarConsejos } from "../../../controllers/consejoController.js";

router.post("/", crearConsejo);
router.get("/", listarConsejos);

export default router;