import request from 'supertest';
import createApp from '../app.js'; // Ajusta la ruta si es necesario

// Simula el chatService
const mockChatService = {
  // Cambia 'getChatResponse' por 'agent', que es lo que usa tu controlador
  agent: async (prompt, type) => {
    return "Categoria Simulada"; // Devuelve una categoría de string
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
  });

});