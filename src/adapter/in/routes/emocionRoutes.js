import express from "express";
const router = express.Router();

import { crearEmocion, listarEmociones} from "../../../controllers/emocionController.js";

router.post("/", crearEmocion);
router.get("/", listarEmociones);

export default router;
