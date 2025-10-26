import { crearEmocion as crearEmocionDB } from "../core/services/emocionService.js";
import { listarMensajes } from "../core/services/mensajeService.js";

export async function crearEmocion(req, res, chatService) {
  try {
    const emocionGuardada = await crearEmocionDB(req.body);

    const categorias = ["Reflexión", "Inspiración", "Superación", "Anclaje", "Motivación"];

    const categoriaElegida = await chatService.agent(
      `Analiza este sentimiento: "${req.body.descripcion}". Elige una categoría de: ${categorias.join(", ")}`,
      "categoria"
    );

    const mensajes = await listarMensajes();
    const mensajesFiltrados = mensajes.filter(m => m.categoria === categoriaElegida);
    const mensajeIA = mensajesFiltrados[Math.floor(Math.random() * mensajesFiltrados.length)];

    res.status(201).json({
      emocion: emocionGuardada,
      mensajeIA: mensajeIA ? mensajeIA.mensaje : "¡Sigue adelante!"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listarEmociones(req, res) {
  try {
    const correo = req.query.user_correo;
    if (!correo) return res.status(400).json({ error: "Falta user_correo" });
    const emociones = await listarEmociones(correo);
    res.json(emociones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearEmocionConIA(req, res, chatService) {
  try {
    // 1. Guardar la emoción
    const emocionGuardada = await crearEmocionDB(req.body);

    // 2. Definir categorías posibles
    const categorias = ["Reflexión","Inspiración","Superación","Anclaje","Motivación"];

    // 3. Preguntamos a la IA cuál es la categoría más adecuada
    const categoriaElegida = await chatService.agent(
      `Analiza este sentimiento: "${req.body.descripcion}". Elige una categoría de: ${categorias.join(", ")}`,
      "string"
    );

    // 4. Mensaje aleatorio de esa categoría
    const mensajes = await listarMensajes();
    const mensajesFiltrados = mensajes.filter(m => m.categoria === categoriaElegida);
    const mensajeIA = mensajesFiltrados[Math.floor(Math.random() * mensajesFiltrados.length)];

    // 5. Responder con emoción + mensaje IA
    res.status(201).json({
      emocion: emocionGuardada,
      mensajeIA: mensajeIA ? mensajeIA.mensaje : "¡Sigue adelante!"
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
