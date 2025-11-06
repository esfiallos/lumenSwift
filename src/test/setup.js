import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env.js'; // Ajusta la ruta a tu archivo env.js

// Hook que se ejecuta UNA VEZ antes de todas las suites de pruebas
beforeAll(async () => {
  if (!MONGO_URI) {
    throw new Error('No se definió MONGO_URI en el archivo .env');
  }
  await mongoose.connect(MONGO_URI);
});

// Hook que se ejecuta UNA VEZ después de todas las suites de pruebas
afterAll(async () => {
  await mongoose.disconnect();
});