"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioDAO_1 = __importDefault(require("../dao/UsuarioDAO"));
class UsuarioControlador extends UsuarioDAO_1.default {
    logIn(req, res) {
        UsuarioControlador.VerificarSesion(req.body, res);
    }
    consulta(req, res) {
        UsuarioControlador.consultarUsuario(res);
    }
    crear(req, res) {
        const correito = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(correito, req.body, res);
    }
    eliminar(req, res) {
        UsuarioControlador.eliminarUsuario(req.params.codiguito, res);
    }
    actualizar(req, res) {
        UsuarioControlador.actualizarUsuario(req.params.codiguito, req.body, res);
    }
}
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;
