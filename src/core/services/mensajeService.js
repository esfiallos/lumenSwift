// src/core/services/mensajeService.js
import Mensaje from "../../models/Mensaje.js";

export async function crearMensaje(data) {
  const nuevoMensaje = new Mensaje(data);
  return await nuevoMensaje.save();
}

export async function listarMensajes() {
  return await Mensaje.find();
}
