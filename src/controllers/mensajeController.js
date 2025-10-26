// adapter/in/controllers/mensajeController.js
import * as mensajeService from "../core/services/mensajeService.js";

export async function crearMensaje(req, res) {
  try {
    const msg = await mensajeService.crearMensaje(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listarMensajes(req, res) {
  try {
    const msgs = await mensajeService.listarMensajes();
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
