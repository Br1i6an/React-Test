"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioEsquema = new mongoose_1.Schema({
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
    codPerfil: { type: mongoose_1.Types.ObjectId, ref: "Perfil", required: true },
    nombreImagenUsuario: { type: String, default: "noAvatar.png" },
    avatarUsuario: { type: String, default: "noAvatar" }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Usuario", UsuarioEsquema, "Usuario");
