import request from 'supertest';
import createApp from '../app.js'; 

// Simula el chatService 
const mockChatService = {
  chat: async (prompt) => `Respuesta simulada`,
  agent: async (prompt, type) => `Respuesta agente simulada`
};

const app = createApp(mockChatService);


describe('Rutas Públicas de Contenido', () => {

  // --- Pruebas GET (Existentes) ---
  it('debería obtener una lista de consejos (GET /consejos)', async () => {
    const res = await request(app).get('/api/consejos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería obtener una lista de mensajes (GET /mensajes)', async () => {
    const res = await request(app).get('/api/mensajes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it('debería CREAR un nuevo consejo (POST /consejos)', async () => {
    const nuevoConsejo = {
      texto: "Bebe agua (desde el test)",
      categoria: "Hábitos"
    };
    
    const res = await request(app)
      .post('/api/consejos')
      .send(nuevoConsejo);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.texto).toBe(nuevoConsejo.texto);
    expect(res.body.categoria).toBe(nuevoConsejo.categoria);
  });
  
  it('debería CREAR un nuevo mensaje (POST /mensajes)', async () => {
    const nuevoMensaje = {
      mensaje: "Tú puedes (desde el test)",
      autor: "Test Suite",
      categoria: "Motivación"
    };
    
    const res = await request(app)
      .post('/api/mensajes')
      .send(nuevoMensaje);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.mensaje).toBe(nuevoMensaje.mensaje);
    expect(res.body.autor).toBe(nuevoMensaje.autor);
  });

});