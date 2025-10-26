import Usuario from "../../models/usuario.js";

export async function crearUsuario(data) {
  const existing = await Usuario.findOne({ correo: data.correo });
  if (existing) throw new Error("Usuario ya existe");
  const user = new Usuario(data);
  return await user.save();
}

export async function listarUsuarios() {
  return await Usuario.find();
}

export async function buscarUsuarioPorCorreo(correo) {
  return await Usuario.findOne({ correo });
}
