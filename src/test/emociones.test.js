import request from 'supertest';
import createApp from '../app.js'; 

// Simula el chatService
const mockChatService = {
  chat: async (prompt) => {
    return "Mensaje de IA simulado"; // Devuelve un string
  },
  // (Añadimos 'agent' también para que el mock sea completo por si se usa en otro lado)
  agent: async (prompt, type) => {
    return "Respuesta de agente simulada"; 
  }
};
const app = createApp(mockChatService);

let token; // Variable para guardar nuestro "carnet" (token)

// ANTES DE TODAS LAS PRUEBAS: Hacemos login para obtener el token
beforeAll(async () => {
  const res = await request(app)
    .post('/api/usuarios/login')
    .send({
      correo: 'usuario@ejemplo.com' // El mismo usuario de la prueba de auth
    });
  
  token = res.body.token; // Guardamos el token
  
  if (!token) {
    throw new Error('No se pudo obtener el token. Asegúrate que el usuario de prueba exista.');
  }
});


describe('Rutas Protegidas de /api/emociones', () => {

  it('debería fallar (401) al intentar obtener emociones SIN token', async () => {
    const res = await request(app).get('/api/emociones');

    expect(res.statusCode).toBe(401); // 401 Unauthorized
    expect(res.body.error).toContain('No se proporcionó un token');
  });

  it('debería OBTENER las emociones CON un token válido', async () => {
    const res = await request(app)
      .get('/api/emociones')
      .set('Authorization', `Bearer ${token}`); // <-- Usamos el token

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería CREAR una emoción CON un token válido', async () => {
    const nuevaEmocion = {
      sentimiento: 'Feliz (desde el test)',
      descripcion: '¡La prueba está pasando!'
    };
    
    const res = await request(app)
      .post('/api/emociones')
      .set('Authorization', `Bearer ${token}`) // <-- Usamos el token
      .send(nuevaEmocion);

    expect(res.statusCode).toBe(201); // 201 Created
    expect(res.body.emocion.sentimiento).toBe(nuevaEmocion.sentimiento);
    // Verificamos que la IA (simulada) respondió
    expect(res.body.mensajeIA).toBe("Mensaje de IA simulado");
  });

});