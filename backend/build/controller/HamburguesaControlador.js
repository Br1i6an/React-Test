"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HamburguesaDAO_1 = __importDefault(require("../dao/HamburguesaDAO"));
class HamburguesaControlador extends HamburguesaDAO_1.default {
    consulta(req, res) {
        HamburguesaControlador.obtenerHamburguesa(res);
    }
    consultarUno(req, res) {
        HamburguesaControlador.obtenerUnaHamburguesa(req.params.codigo, res);
    }
    crear(req, res) {
        HamburguesaControlador.crearHamburguesa(req.body, res);
    }
    eliminar(req, res) {
        HamburguesaControlador.eliminarHamburguesa(req.params.codigo, res);
    }
    actualizar(req, res) {
        HamburguesaControlador.actualizarHamburguesa(req.params.codigo, req.body, res);
    }
}
const hamburguesaControlador = new HamburguesaControlador();
exports.default = hamburguesaControlador;
