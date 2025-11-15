import request from 'supertest';
import createApp from '../app.js'; 

//  'chatService' falso (un "mock") para que la app inicie
const mockChatService = {
  chat: async (prompt) => "Respuesta simulada",
  agent: async (prompt, type) => "Categoria Simulada"
};

//  Crea la app de Express en modo de prueba
const app = createApp(mockChatService);

describe('Rutas de Autenticación (/api/usuarios)', () => {

  it('debería REGISTRAR un nuevo usuario', async () => {
    // Usamos un correo único para evitar conflictos con la BD
    const correoUnico = `testuser_${Date.now()}@ejemplo.com`;
    
    const res = await request(app)
      .post('/api/usuarios/registrar')
      .send({
        correo: correoUnico,
        nombre: 'Usuario de Prueba'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.correo).toBe(correoUnico);
    expect(res.body).toHaveProperty('_id');
  });
  
  it('debería fallar (400) al registrar un usuario que ya existe', async () => {
     const res = await request(app)
      .post('/api/usuarios/registrar')
      .send({
        correo: 'usuario@ejemplo.com', // Usuario que sabemos que existe
        nombre: 'Usuario Repetido'
      });
      
     expect(res.statusCode).toBe(400);
     expect(res.body.error).toBe("Usuario ya existe");
  });


  it('debería hacer login y devolver un token para un usuario existente', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        correo: 'usuario@ejemplo.com' 
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.usuario.correo).toBe('usuario@ejemplo.com');
  });

  it('debería fallar (404) al intentar loguear un usuario que no existe', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        correo: 'noexiste@ejemplo.com'
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('debería obtener la lista de usuarios (GET /usuarios)', async () => {
     const res = await request(app).get('/api/usuarios');
     
     expect(res.statusCode).toBe(200);
     expect(Array.isArray(res.body)).toBe(true);
     const usuarios = res.body;
     expect(usuarios.some(u => u.correo === 'usuario@ejemplo.com')).toBe(true);
  });

});