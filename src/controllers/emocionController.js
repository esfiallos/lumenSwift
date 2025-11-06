import { 
  crearEmocion as crearEmocionDB, 
  listarEmociones as listarEmocionesDB 
} from "../core/services/emocionService.js";
import { listarMensajes } from "../core/services/mensajeService.js";

/**
 * (POST) Registra una nueva emoción, calcula la racha y devuelve un mensaje de IA.
 * Ruta protegida por authMiddleware.
 */
export async function crearEmocionConIA(req, res, chatService) {
  try {
    // 1. OBTENEMOS EL CORREO (gracias al authMiddleware)
    // El "guardia" (authMiddleware) puso al usuario en req.user
    const userCorreo = req.user.correo;
    if (!userCorreo) {
      return res.status(401).json({ error: "Token inválido, no se encontró el correo del usuario." });
    }

    // 2. Llamamos al servicio (emocionService) CON el correo y los datos
    // Ahora el servicio sabrá QUIÉN guarda la emoción y podrá calcular la racha.
    const emocionGuardada = await crearEmocionDB(userCorreo, req.body);

    // 3. (Tu lógica de IA está perfecta)
    const categorias = ["Reflexión", "Inspiración", "Superación", "Anclaje", "Motivación"];
    const categoriaElegida = await chatService.agent(
      `Analiza este sentimiento: "${req.body.descripcion}". Elige una categoría de: ${categorias.join(", ")}`,
      "string"
    );

    const mensajes = await listarMensajes();
    const mensajesFiltrados = mensajes.filter(m => m.categoria === categoriaElegida);
    const mensajeIA = mensajesFiltrados[Math.floor(Math.random() * mensajesFiltrados.length)];

    // 5. Responder
    res.status(201).json({
      emocion: emocionGuardada,
      mensajeIA: mensajeIA ? mensajeIA.mensaje : "¡Sigue adelante!"
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


/**
 * (GET) Lista todas las emociones del usuario autenticado.
 * Ruta protegida por authMiddleware.
 */
export async function listarEmociones(req, res) {
  try {
    // 1. OBTENEMOS EL CORREO (gracias al authMiddleware)
    const userCorreo = req.user.correo;
    if (!userCorreo) {
      return res.status(401).json({ error: "Token inválido, no se encontró el correo del usuario." });
    }

    // 2. Buscamos las emociones SÓLO de ese correo
    const emociones = await listarEmocionesDB(userCorreo);
    res.json(emociones);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}