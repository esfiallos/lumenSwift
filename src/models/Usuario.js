// domain/models/Usuario.js
import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  racha: {
    actual: { type: Number, default: 0 },
    mejor: { type: Number, default: 0 },
    ultima_actividad: { type: Date, default: Date.now }
  },
  fecha_creacion: { type: Date, default: Date.now }
});

export default mongoose.model("Usuario", UsuarioSchema);
