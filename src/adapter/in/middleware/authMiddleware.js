import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/env.js'; 

export const authMiddleware = (req, res, next) => {
  //  Busca la cabecera "Authorization"
  const authHeader = req.headers.authorization;

  //  Comprueba si existe y tiene el formato correcto ("Bearer token")
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    //  Extrae el token (quita el "Bearer ")
    const token = authHeader.split(' ')[1];

    //  Verifica si el token es válido usando tu clave secreta
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    //  ¡Éxito! El token es válido.
    // Adjuntamos los datos del usuario (que estaban en el token) al objeto 'req'
    // para que el siguiente controlador pueda usarlos.
    req.user = decodedPayload; // Ahora req.user = { id: '...', correo: '...' }

    //  Deja pasar al usuario al siguiente controlador (registrarEmocion)
    next();

  } catch (error) {
    //  ¡Fallo! El token es inválido (firmado mal, caducado, etc.)
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};