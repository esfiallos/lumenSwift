# Lumen Swift

# Documentación de Arquitectura: Lumen (Backend)

> Este documento describe la estructura del backend de Lumen, implementada bajo una **Arquitectura Hexagonal (Clean Architecture)**. Esta separación garantiza la escalabilidad y la modularidad, aislando la lógica de negocio de tecnologías externas como MongoDB, Express y Gemini.

## 🚀 Archivos Raíz y Estructuras Globales

La estructura base del proyecto define el punto de entrada, la configuración de la aplicación y las dependencias.

* `servidor.js`: Actúa como el punto de entrada principal. Es responsable de inicializar y arrancar el servidor.
* `aplicacion.js`: Configura la instancia de Express. Aquí se incluyen middlewares esenciales (como CORS y `json-parser`) y se ensamblan todas las rutas definidas en la carpeta `/fuente/adaptador/en/rutas`.
* `package.json`: Gestiona todas las dependencias del proyecto y los scripts de ejecución.
* `documentos/swagger.yaml`: Contiene la especificación formal de la API (OpenAPI) para documentación y pruebas.

---

## 📦 Modelos de Datos (`modelos/`)

Esta carpeta define las entidades clave (esquemas de Mongoose) que se persistirán en MongoDB.

* `Usuario.js`: Gestiona el perfil del usuario, credenciales y autenticación.
* `Emocion.js`: Es el modelo principal para el registro diario del diario (incluye fecha, nota y estado de ánimo).
* `Mensaje.js`: Almacena el feedback motivacional generado por la IA (incluye el texto y cualquier sugerencia accionable).
* `Consejo.js`: Define la estructura para consejos y rutinas predefinidas que se ofrecen al usuario.

---

## 📁 Carpeta Principal: `fuente/` (El Núcleo del Backend)

Esta carpeta contiene toda la lógica de la aplicación, separada por capas siguiendo los principios de la Arquitectura Hexagonal.

### ⚙️ 2.1. Adaptadores y Configuración

* `fuente/configuracion/`
    * `db.js`: Contiene toda la lógica de conexión al clúster de MongoDB Atlas.
    * `entorno.js`: Gestiona la carga y el acceso a las variables de entorno (`.env`).
* `fuente/adaptador/afuera/`
    * Estos son los adaptadores de "salida" (lado derecho de la arquitectura) que implementan la comunicación con tecnologías externas.
    * `mongoAdapter.js`: Contiene las funciones de bajo nivel del driver de MongoDB (CRUD) que implementan el `dbPort`.
    * `geminiAdapter.js`: Maneja la petición HTTP a la API de Gemini, organizando el formato JSON de salida e implementando el `aiPort`.

### 🔌 2.2. Capa Externa: Controladores (`fuente/controladores/`)

Los controladores son los *handlers* de Express. Su única responsabilidad es recibir las peticiones HTTP, validar (a menudo con middleware) y orquestar la respuesta llamando a la capa de servicios.

* `usuarioController.js`: Maneja el flujo de autenticación (login/registro).
* `controladorDeEmociones.js`: Maneja el registro (creación) y consulta del historial del diario.
* `mensajeController.js`: Gestiona las solicitudes de feedback motivacional.

### 🧠 2.3. Capa Central: Lógica de Negocio (`fuente/centro/servicios/`)

Esta es la capa de lógica pura, el corazón de la aplicación. Está completamente desacoplada de la tecnología (Express, MongoDB) y no sabe nada de HTTP.

* `usuarioService.js`: Lógica de negocio para la verificación de credenciales y generación de tokens JWT.
* `emocionService.js`: Implementa la lógica de la "Racha" de días consecutivos y orquesta la entrada de datos. Llama al servicio de IA para obtener feedback después de un registro.
* `chatService.js`: Es el orquestador principal de la IA. Contiene la lógica para llamar al puerto de Gemini (`aiPort`) y dar contexto emocional al *prompt* antes de generar la respuesta.
* `mensajeService.js`: Lógica para la entrega y gestión de mensajes (ej. marcar como leído).

### 🚢 2.4. Capa de Abstracción: Puertos (`fuente/centro/puertos/`)

Esta carpeta define las "interfaces" (contratos) que aíslan la lógica central de la tecnología externa. Los servicios dependen de estos puertos, no de los adaptadores.

* `dbPort.js`: El Puerto de Persistencia. Define los métodos (Ej. `dbPort.guardar(entidad)`) que el `mongoAdapter` debe implementar.
* `aiPort.js`: El Puerto de IA. Define la interfaz para interactuar con el modelo de lenguaje (Ej. `aiPort.generarFeedback(contexto)`).

### 📡 2.5. Definición de Endpoints (`fuente/adaptador/en/rutas/`)

Estos son adaptadores de "entrada" (lado izquierdo de la arquitectura). Definen las rutas finales de la API REST y las conectan con los métodos de los controladores.

* `usuarioRoutes.js`: Define rutas de autenticación (Ej. `POST /api/v1/auth/login`).
* `emocionRoutes.js`: Define las rutas del Diario (Ej. `POST /api/v1/emociones`).
* `rutasDeChat.js`: Define las rutas para la interacción directa con el servicio de IA.
* `0Routes.js` y `mensajesRoutes.js`: Rutas de utilidad y gestión de mensajes motivacionales.
