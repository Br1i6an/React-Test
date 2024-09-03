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
class PerfilDAO {
    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    static consultarUnPerfil(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonPerfil = { _id: identificador };
            const existePerfil = yield PerfilEsquema_1.default.findOne(jsonPerfil).exec();
            if (existePerfil) {
                res.status(200).json(existePerfil);
            }
            else {
                res.status(400).json({ respuesta: "El perfil NO existe con ese identificador" });
            }
        });
    }
    // ************************************************************************************
    // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
    // ************************************************************************************
    static consultarPerfil(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield PerfilEsquema_1.default.aggregate([
                { $lookup: { from: "Usuario", localField: "_id", foreignField: "codPerfil", as: "cantidadUsuarios" } },
                { $addFields: { cantidadUsuarios: { $size: "$cantidadUsuarios" } } }
            ]).sort({ _id: 1 });
            res.status(200).json(datos);
        });
    }
    // ************************************************************************************
    static crearPerfil(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros.datos;
            delete parametros._id;
            const existe = yield PerfilEsquema_1.default.findOne(parametros).exec();
            if (existe) {
                res.status(400).json({ respuesta: "Nombre del perfil ya existe" });
            }
            else {
                const miPerfil = new PerfilEsquema_1.default(parametros);
                miPerfil.save((tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "Ayy no se puede grabar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Perfil grabado", id: elObjetoBien._id
                        });
                    }
                });
            }
        });
    }
    static eliminarPerfil(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield PerfilEsquema_1.default.findById(identificador).exec();
            if (existe) {
                PerfilEsquema_1.default.findByIdAndDelete(identificador, (tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "No se puede borrar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Perfil eliminado", id: elObjetoBien
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Perfil NO existe" });
            }
        });
    }
    static actualizarPerfil(identificador, miJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield PerfilEsquema_1.default.findById(identificador).exec();
            if (existe) {
                PerfilEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: miJson }, (tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "No se puede actualizar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Perfil actualizado", antes: elObjetoBien, nuevo: miJson
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Perfil NO existe" });
            }
        });
    }
}
exports.default = PerfilDAO;
