import Mensaje from "../../models/Mensaje.js";

export async function crearMensaje(data) {
  const msg = new Mensaje(data);
  return await msg.save();
}

export async function listarMensajes() {
  return await Mensaje.find();
}
