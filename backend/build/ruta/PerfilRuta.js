"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PerfilControlador_1 = __importDefault(require("../controller/PerfilControlador"));
class PerfilRuta {
    constructor() {
        this.apiRutaPerfil = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaPerfil.post("/crear", PerfilControlador_1.default.crear);
        this.apiRutaPerfil.get("/todos", PerfilControlador_1.default.consulta);
        this.apiRutaPerfil.delete("/eliminar/:codiguito", PerfilControlador_1.default.eliminar);
        this.apiRutaPerfil.put("/actualizar/:codiguito", PerfilControlador_1.default.actualizar);
        this.apiRutaPerfil.get("/uno/:codiguito", PerfilControlador_1.default.consultarUno);
    }
}
const perfilRuta = new PerfilRuta();
exports.default = perfilRuta.apiRutaPerfil;
