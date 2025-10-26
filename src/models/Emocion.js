// domain/models/Emocion.js
import mongoose from "mongoose";

const EmocionSchema = new mongoose.Schema({
  user_correo: { type: String, required: true }, // Relación con usuario
  sentimiento: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Emocion", EmocionSchema);
