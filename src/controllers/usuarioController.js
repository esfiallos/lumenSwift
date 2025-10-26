import { crearUsuario, listarUsuarios, buscarUsuarioPorCorreo } from "../core/services/usuarioService.js";

export async function registrarUsuario(req, res) {
  try {
    const usuario = await crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
