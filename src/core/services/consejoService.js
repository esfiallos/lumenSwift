// src/core/services/consejoService.js
import Consejo from "../../models/Consejo.js";

export async function crearConsejo(data) {
  const nuevo = new Consejo(data);
  return await nuevo.save();
}

export async function listarConsejos() {
  return await Consejo.find();
}
