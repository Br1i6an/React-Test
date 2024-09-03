"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuarioEntidad {
    constructor(nom, corr, cla, est, dat, codP) {
        this.nombreUsuario = nom;
        this.correoUsuario = corr;
        this.claveUsuario = cla;
        this.estadoUsuario = est;
        this.fechaUsuario = dat;
        this.codPerfil = codP;
    }
}
exports.default = UsuarioEntidad;
