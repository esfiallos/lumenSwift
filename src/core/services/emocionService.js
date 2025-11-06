import Emocion from "../../models/Emocion.js";
import Usuario from "../../models/Usuario.js";

// --- Funciones de ayuda para fechas ---

// Función para limpiar la hora de una fecha (comparar solo día, mes y año)
function limpiarFecha(fecha) {
  const f = new Date(fecha);
  f.setHours(0, 0, 0, 0);
  return f;
}

// Función para saber si dos fechas son días consecutivos
function sonDiasConsecutivos(fecha1, fecha2) {
  const f1 = limpiarFecha(fecha1);
  const f2 = limpiarFecha(fecha2);
  const diferencia = f2.getTime() - f1.getTime(); // Diferencia en milisegundos
  const unDia = 1000 * 60 * 60 * 24;
  return diferencia === unDia;
}
// -------------------------------------


/**
 * (Tu controlador lo llama 'crearEmocionDB')
 * Crea una emoción, calcula la racha del usuario y guarda ambos.
 */
export async function crearEmocion(userCorreo, dataEmocion) {
  
  // 1. Buscar al usuario por su correo
  const usuario = await Usuario.findOne({ correo: userCorreo });
  if (!usuario) {
    throw new Error("Usuario no encontrado al crear emoción");
  }

  const hoy = new Date();
  // Asegúrate de que 'racha' y 'ultima_actividad' existan,
  // si no, inicialízalos (importante para usuarios nuevos)
  if (!usuario.racha) {
    usuario.racha = { actual: 0, mejor: 0, ultima_actividad: new Date(0) }; // Fecha muy antigua
  }

  const ultimaActividad = usuario.racha.ultima_actividad;
  const fechaHoy = limpiarFecha(hoy);
  const fechaUltima = limpiarFecha(ultimaActividad);

  // 2. Lógica de Racha
  // Solo actualiza la racha si es un día nuevo
  if (fechaHoy.getTime() > fechaUltima.getTime()) { 
    
    if (sonDiasConsecutivos(fechaUltima, fechaHoy)) {
      // ¡Racha continúa!
      usuario.racha.actual += 1;
      if (usuario.racha.actual > usuario.racha.mejor) {
        usuario.racha.mejor = usuario.racha.actual;
      }
    } else {
      // Se rompió la racha (pasó más de 1 día)
      usuario.racha.actual = 1; // Reinicia a 1 por la actividad de hoy
    }
    
    // Actualiza la última actividad a HOY
    usuario.racha.ultima_actividad = hoy;
  }
  // Si es el mismo día (fechaHoy.getTime() === fechaUltima.getTime()), no hacemos nada.

  // 3. Crear la nueva emoción
  const nuevaEmocion = new Emocion({
    ...dataEmocion,          // { sentimiento, descripcion }
    user_correo: userCorreo, // Asigna el correo del usuario
    fecha: hoy
  });

  // 4. Guardar AMBOS (el usuario actualizado y la nueva emoción)
  await usuario.save();
  await nuevaEmocion.save();

  return nuevaEmocion;
}

/**
 * (Tu controlador lo llama 'listarEmocionesDB')
 * Lista las emociones de un usuario específico.
 */
export async function listarEmociones(correo) {
  return await Emocion.find({ user_correo: correo });
}