// core/services/consejoService.js
import Consejo from "../../models/Consejo.js";

export async function crearConsejo(data) {
  const consejo = new Consejo(data);
  return await consejo.save();
}

export async function listarConsejos() {
  return await Consejo.find();
}
