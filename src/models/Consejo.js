// domain/models/Consejo.js
import mongoose from "mongoose";

const ConsejoSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  categoria: {
    type: String,
    enum: ["Hábitos", "Autoestima", "Descanso", "Relaciones", "Foco"],
    required: true
  }
});

export default mongoose.model("Consejo", ConsejoSchema);
