import { Schema, model, Types } from "mongoose";
import UsuarioEntidad from "../entity/UsuarioEntidad";

const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario: { type: String, required: true, trim: true },
    correoUsuario: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
},
    claveUsuario: { type: String, required: true },
    estadoUsuario: { type: Number, enum: [1, 2, 3], default: 1 },
    fechaUsuario: { type: Date, default: Date.now() },
    codPerfil: { type: Types.ObjectId, ref: "Perfil", required: true },
    nombreImagenUsuario: { type: String, default: "noAvatar.png" },
    avatarUsuario: { type: String, default: "noAvatar" }
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
