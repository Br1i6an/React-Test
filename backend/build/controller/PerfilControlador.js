"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PerfilDAO_1 = __importDefault(require("../dao/PerfilDAO"));
class PerfilControlador extends PerfilDAO_1.default {
    consulta(req, res) {
        PerfilControlador.consultarPerfil(res);
    }
    consultarUno(req, res) {
        PerfilControlador.consultarUnPerfil(req.params.codiguito, res);
    }
    crear(req, res) {
        PerfilControlador.crearPerfil(req.body, res);
    }
    eliminar(req, res) {
        PerfilControlador.eliminarPerfil(req.params.codiguito, res);
    }
    actualizar(req, res) {
        PerfilControlador.actualizarPerfil(req.params.codiguito, req.body, res);
    }
}
const perfilControlador = new PerfilControlador();
exports.default = perfilControlador;
