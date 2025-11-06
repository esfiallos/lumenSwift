# lumenSwift

Documentación de la arquitectura de lumen 
Este documento describe la estructura del backend de Lumen, implementada bajo una Arquitectura Hexagonal (Clean Architecture). Esta separación garantiza la escalabilidad y la modularidad, aislando la lógica de negocio de tecnologías externas como MongoDB, Express y Gemini.
1. Archivos Raíz y Estructuras Globales
El backend arranca con servidor.js, que actúa como el punto de entrada principal, inicializando la aplicación. El archivo aplicacion.js configura la instancia de Express, incluyendo middlewares esenciales (como CORS y JSON parsing) y ensamblando todas las rutas definidas en la carpeta /fuente/adaptador/en/rutas. El archivo package.json gestiona las dependencias del proyecto.
Modelos de Datos (modelos/)
Esta carpeta define las entidades clave que se persistirán en MongoDB. Usuario.js gestiona el perfil y la autenticación. Emocion.js es el modelo principal para el registro diario (fecha, nota, ánimo). Mensaje.js almacena el feedback motivacional generado por la IA (texto, sugerencia actionable). Consejo.js define la estructura para consejos y rutinas predefinidas. La carpeta documentos/ contiene la especificación de la API en swagger.yaml.
2. Carpeta Principal: fuente/ (El Núcleo del Backend)
2.1. Adaptadores y Configuración
La carpeta fuente/configuración/ contiene db.js (lógica de conexión al cluster de MongoDB Atlas) y entorno.js (gestión de variables de entorno).
Dentro de fuente/adaptador/afuera/ se encuentran los adaptadores tecnológicos que implementan la comunicación externa: mongoAdapter.js contiene las funciones de bajo nivel del driver de MongoDB (CRUD), y geminiAdapter.js maneja la petición HTTP a la API de Gemini, organizando el formato JSON de salida.
2.2. Capa Externa: Controladores (fuente/controladores/)
Los controladores son los handlers de Express, responsables de recibir las peticiones HTTP y orquestar la respuesta, llamando a la capa de servicios. usuarioController.js maneja el flujo de autenticación (login/registro). controladorDeEmociones.js maneja el registro y consulta del historial del diario. mensajeController.js gestiona las solicitudes de feedback motivacional.
2.3. Capa Central: Lógica de Negocio (fuente/centro/servicios/)
Esta es la capa de lógica pura, desacoplada de la tecnología:
usuarioService.js: Lógica de verificación de credenciales y generación de tokens JWT.
emocionService.js: Implementa la lógica de la Racha de días y orquesta la entrada de datos, llamando al servicio de IA para obtener el feedback.
chatService.js: Orquestador de IA. Contiene la lógica para llamar al puerto de Gemini y dar contexto emocional al prompt antes de generar la respuesta.
mensajeService.js: Lógica para la entrega y gestión de mensajes.
2.4. Capa de Abstracción: Puertos (fuente/centro/puertos/)
Esta carpeta define las interfaces que aísla la lógica central de la tecnología externa:
dbPort.js: El Puerto de Persistencia, define los métodos (Ej. dbPort.guardar(entidad)) que el mongoAdapter debe implementar.
aiPort.js: El Puerto de IA, define la interfaz para interactuar con el modelo de lenguaje (Ej. aiPort.generarFeedback(contexto)).
2.5. Definición de Endpoints (fuente/adaptador/en/rutas/)
Estos archivos definen las rutas finales de la API REST y las conectan con los controladores:
usuarioRoutes.js: Define rutas de autenticación (Ej. POST /api/v1/auth/login).
emocionRoutes.js: Define las rutas del Diario (Ej. POST /api/v1/emociones).
rutasDeChat.js: Define las rutas para la interacción directa con el servicio de IA.
0Routes.js y mensajesRoutes.js: Rutas de utilidad y gestión de mensajes motivacionales.
