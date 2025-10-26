// adapter/in/controllers/consejoController.js
import * as consejoService from "../core/services/consejoService.js";

export async function crearConsejo(req, res) {
  try {
    const consejo = await consejoService.crearConsejo(req.body);
    res.status(201).json(consejo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listarConsejos(req, res) {
  try {
    const consejos = await consejoService.listarConsejos();
    res.json(consejos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
