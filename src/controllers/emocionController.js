// adapter/in/controllers/emocionController.js
import * as emocionService from "../core/services/emocionService.js";

export async function crearEmocion(req, res) {
  try {
    const emocion = await emocionService.crearEmocion(req.body);
    res.status(201).json(emocion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listarEmociones(req, res) {
  try {
    const correo = req.query.user_correo;
    if (!correo) return res.status(400).json({ error: "Falta user_correo" });
    const emociones = await emocionService.listarEmociones(correo);
    res.json(emociones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
