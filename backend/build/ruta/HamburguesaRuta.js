"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HamburguesaControlador_1 = __importDefault(require("../controller/HamburguesaControlador"));
class HamburguesaRuta {
    constructor() {
        this.apiRutaHamburguesa = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaHamburguesa.post("/crear", HamburguesaControlador_1.default.crear);
        this.apiRutaHamburguesa.get("/todos", HamburguesaControlador_1.default.consulta);
        this.apiRutaHamburguesa.get('/uno/:codigo', HamburguesaControlador_1.default.consultarUno);
        this.apiRutaHamburguesa.delete('/eliminar/:codigo', HamburguesaControlador_1.default.eliminar);
        this.apiRutaHamburguesa.put('/actualizar/:codigo', HamburguesaControlador_1.default.actualizar);
    }
}
const hamburguesaRuta = new HamburguesaRuta();
exports.default = hamburguesaRuta.apiRutaHamburguesa;
