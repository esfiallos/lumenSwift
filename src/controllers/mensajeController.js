// src/controllers/mensajeController.js
import { crearMensaje, listarMensajes } from "../core/services/mensajeService.js";

export async function registrarMensaje(req, res) {
  try {
    const msg = await crearMensaje(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function obtenerMensajes(req, res) {
  try {
    const msgs = await listarMensajes();
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
