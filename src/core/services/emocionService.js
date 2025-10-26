import Emocion from "../../models/Emocion.js";

export async function crearEmocion(data) {
  const emocion = new Emocion(data);
  return await emocion.save();
}

export async function listarEmociones(correo) {
  return await Emocion.find({ user_correo: correo });
}
