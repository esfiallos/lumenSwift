import { crearUsuario, listarUsuarios, buscarUsuarioPorCorreo } from "../core/services/usuarioService.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

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

export async function loginUsuario(req, res) {
  try {
    const { correo } = req.body;
    if (!correo) {
      return res.status(400).json({ error: "El correo es requerido" });
    }

    const usuario = await buscarUsuarioPorCorreo(correo);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. Creamos el "carnet" (token)
    const token = jwt.sign(
      { 
        id: usuario._id, 
        correo: usuario.correo 
      }, // Los datos que van DENTRO del carnet
      JWT_SECRET,
      { expiresIn: "30d" } // El carnet caduca en 30 días
    );

    // 4. Se lo devolvemos a la app
    res.json({ usuario, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}