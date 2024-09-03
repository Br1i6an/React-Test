"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioPrivadoConrolador_1 = __importDefault(require("../controller/UsuarioPrivadoConrolador"));
class UsuarioPrivadoRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', UsuarioPrivadoConrolador_1.default.crear);
        this.rutaAPI.get('/todos', UsuarioPrivadoConrolador_1.default.consulta);
        this.rutaAPI.get('/uno/:codigo', UsuarioPrivadoConrolador_1.default.consultaUno);
        this.rutaAPI.get('/todos/:codPerfil', UsuarioPrivadoConrolador_1.default.consultaXPerfil);
        this.rutaAPI.get('/cantxperfil/:codPerfil', UsuarioPrivadoConrolador_1.default.cantidadEnPerfil);
        this.rutaAPI.delete('/eliminar/:codUsuario', UsuarioPrivadoConrolador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codUsuario', UsuarioPrivadoConrolador_1.default.actualizar);
    }
}
;
const usuarioPrivadoRuta = new UsuarioPrivadoRuta();
exports.default = usuarioPrivadoRuta.rutaAPI;
