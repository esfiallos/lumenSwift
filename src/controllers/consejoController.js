// src/controllers/consejoController.js
import { crearConsejo, listarConsejos } from "../core/services/consejoService.js";

export async function registrarConsejo(req, res) {
  try {
    const consejo = await crearConsejo(req.body);
    res.status(201).json(consejo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function obtenerConsejos(req, res) {
  try {
    const consejos = await listarConsejos();
    res.json(consejos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
