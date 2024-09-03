import { Schema, model } from "mongoose";
import PerfilEntidad from "../entity/PerfinEntidad";

const PerfilEsquema = new Schema<PerfilEntidad>(
  {
    nombrePerfil: { type: String, required: true, unique: true },
    estadoPerfil: {type: Number, enum: [1,2,3], default: 1}
  },
  { versionKey: false }
);

export default model("Perfil", PerfilEsquema, "Perfil");