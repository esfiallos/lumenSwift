import request from 'supertest';
import createApp from '../app.js'; // 1. Importa tu creador de app

// (Ajusta la ruta '../src/app.js' si es necesario)

// 2. Necesitamos un 'chatService' falso (un "mock") para que la app inicie
// ... (tu mockChatService) ...
const mockChatService = {
  agent: async (prompt, type) => {
    return "Categoria Simulada"; 
  }
};
//  Crea la app de Express en modo de prueba
const app = createApp(mockChatService);

//  describe() agrupa un conjunto de pruebas
describe('Rutas de Autenticación (/api/usuarios)', () => {

  // 5. it() es una prueba individual
  // (Debes tener 'test@ejemplo.com' en tu BD de prueba para que esto funcione)
  it('debería hacer login y devolver un token para un usuario existente', async () => {
    const res = await request(app) // <-- Aquí actúa Supertest
      .post('/api/usuarios/login')
      .send({
        correo: 'usuario@ejemplo.com' // Asegúrate que este usuario exista en tu BD de Atlas
      });

    // 6. expect() es la comprobación (la "aserción")
    expect(res.statusCode).toBe(200); // Esperamos un status 200
    expect(res.body).toHaveProperty('token'); // Esperamos que la respuesta tenga un 'token'
    expect(res.body.usuario.correo).toBe('usuario@ejemplo.com'); // Y que sea del usuario correcto
  });

  it('debería fallar (404) al intentar loguear un usuario que no existe', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        correo: 'noexiste@ejemplo.com'
      });

    expect(res.statusCode).toBe(404); // Esperamos un "No Encontrado"
    expect(res.body).toHaveProperty('error'); // Esperamos un mensaje de error
  });

});