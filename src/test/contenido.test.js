import request from 'supertest';
import createApp from '../app.js'; // Ajusta la ruta si es necesario

// Simula el chatService
const mockChatService = {
  getChatResponse: async (prompt) => `Respuesta simulada`
};

const app = createApp(mockChatService);


describe('Rutas Públicas de Contenido', () => {

  it('debería obtener una lista de consejos', async () => {
    const res = await request(app).get('/api/consejos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Esperamos que sea un array
  });

  it('debería obtener una lista de mensajes', async () => {
    const res = await request(app).get('/api/mensajes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Esperamos que sea un array
  });

});