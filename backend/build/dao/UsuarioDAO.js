"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PerfilEsquema_1 = __importDefault(require("../esquema/PerfilEsquema"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioDAO {
    static VerificarSesion(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const elCorreo = parametros.correoUsuario;
            const laClave = parametros.claveUsuario;
            UsuarioEsquema_1.default.findOne({ correoUsuario: elCorreo })
                .populate("codPerfil")
                .exec((miError, elObjetoBien) => {
                if (elObjetoBien) {
                    const claveBien = bcryptjs_1.default.compareSync(laClave, elObjetoBien.claveUsuario);
                    if (claveBien) {
                        const miPayload = {
                            codUsuario: elObjetoBien._id,
                            correo: parametros.correoUsuario,
                            perfli: elObjetoBien.codPerfil.nombrePerfil,
                        };
                        const miLlavecita = String(process.env.CLAVE_ULTRA_SECRETA);
                        const miTokencito = jsonwebtoken_1.default.sign(miPayload, miLlavecita, {
                            expiresIn: 86400,
                        });
                        res.status(200).json({ tokenUSTA: miTokencito });
                    }
                    else {
                        res.status(400).json({ respuesta: "Credenciales no validas" });
                    }
                }
                else {
                    res.status(400).json({ respuesta: "Credenciales no validas, CERO" });
                }
            });
        });
    }
    static consultarUsuario(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const misUsuarios = yield UsuarioEsquema_1.default.find().sort({ _id: -1 });
            res.status(200).json(misUsuarios);
        });
    }
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const perfilito = String(process.env.PERFIL_POR_DEFECTO);
            const jsonPerfil = { nombrePerfil: perfilito };
            const existePerfil = yield PerfilEsquema_1.default.findOne(jsonPerfil).exec();
            if (existePerfil) {
                parametros.codPerfil = existePerfil._id;
            }
            else {
                const crearPerfil = new PerfilEsquema_1.default(jsonPerfil);
                crearPerfil.save();
                parametros.codPerfil = crearPerfil._id;
            }
            const existe = yield UsuarioEsquema_1.default.findOne(correo).exec();
            if (existe) {
                res.status(400).json({ respuesta: "Correo ya existente" });
            }
            else {
                parametros.claveUsuario = bcryptjs_1.default.hashSync(parametros.claveUsuario, 10);
                const miUsuario = new UsuarioEsquema_1.default(parametros);
                miUsuario.save((tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "Ayy no se puede grabar" });
                    }
                    else {
                        const miPayload = {
                            codUsuario: elObjetoBien._id,
                            correo: parametros.correoUsuario,
                        };
                        const miLlavecita = String(process.env.CLAVE_ULTRA_SECRETA);
                        const miTokencito = jsonwebtoken_1.default.sign(miPayload, miLlavecita, {
                            expiresIn: 86400,
                        });
                        res.status(200).json({ tokenUSTA: miTokencito });
                    }
                });
            }
        });
    }
    static eliminarUsuario(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndDelete(identificador, (tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "No se puede borrar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Perfil eliminado",
                            id: elObjetoBien,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Usuario NO existe" });
            }
        });
    }
    static actualizarUsuario(identificador, miJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: miJson }, (tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "No se puede actualizar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Usuario actualizado",
                            antes: elObjetoBien,
                            nuevo: miJson,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Usuario NO existe" });
            }
        });
    }
}
exports.default = UsuarioDAO;
