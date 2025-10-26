import Usuario from "../models/usuario.js"; // apunta a src/models/usuario.js

// Crear usuario
export async function crearUsuario(req, res) {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Listar todos los usuarios
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
