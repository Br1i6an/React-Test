"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("../controller/UsuarioControlador"));
class UsuarioRuta {
    constructor() {
        this.apiRutaUsuario = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaUsuario.post("/crear", UsuarioControlador_1.default.crear);
        this.apiRutaUsuario.get("/todos", UsuarioControlador_1.default.consulta);
        this.apiRutaUsuario.post("/iniciar", UsuarioControlador_1.default.logIn);
        this.apiRutaUsuario.delete("/eliminar/:codiguito", UsuarioControlador_1.default.eliminar);
        this.apiRutaUsuario.put("/actualizar/:codiguito", UsuarioControlador_1.default.actualizar);
    }
}
const usuarioRuta = new UsuarioRuta();
exports.default = usuarioRuta.apiRutaUsuario;
