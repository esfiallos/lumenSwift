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

   // 3. Extraemos los datos para el prompt
    const { sentimiento, descripcion } = req.body;
    let mensajeIA;

    // 4. Creamos el prompt controlado
    // Si el usuario no escribió nota, le damos un mensaje amable por defecto.
    if (!descripcion || descripcion.trim() === "") {
        mensajeIA = `Gracias por registrar que te sientes "${sentimiento}". ¡Es un gran paso para tu bienestar!`;
    } else {
        // Si escribió una nota, generamos el prompt controlado
        const promptControlado = `
          Eres 'Lumen', un asistente de bienestar empático y consejero.
          Un usuario acaba de registrar que se siente "${sentimiento}".
          Su nota personal es: "${descripcion}".

          Por favor, escribe un mensaje de apoyo muy corto (máximo 30 palabras) 
          que reaccione directamente a su nota. Sé alentador y no hagas preguntas.
        `;
        
        // 5. Llamamos a la IA para generar el mensaje dinámico
        // Usamos chatService.chat() que es para generación libre
        mensajeIA = await chatService.chat(promptControlado);
    }
    
    // 6. Responder
    res.status(201).json({
      emocion: emocionGuardada,
      mensajeIA: mensajeIA 
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