// domain/models/Mensaje.js
import mongoose from "mongoose";

const MensajeSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: {
    type: String,
    enum: ["Reflexión", "Inspiración", "Superación", "Anclaje", "Motivación"],
    required: true
  }
});

export default mongoose.model("Mensaje", MensajeSchema);
