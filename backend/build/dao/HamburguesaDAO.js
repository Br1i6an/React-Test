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
const HamburguesaEsquema_1 = __importDefault(require("../esquema/HamburguesaEsquema"));
class HamburguesaDAO {
    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    static obtenerUnaHamburguesa(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonPerfil = { _id: identificador };
            const existeHamburguesa = yield HamburguesaEsquema_1.default.findOne(jsonPerfil).exec();
            if (existeHamburguesa) {
                res.status(200).json(existeHamburguesa);
            }
            else {
                res.status(400).json({ respuesta: "La hamburguesa NO existe con ese identificador" });
            }
        });
    }
    // ************************************************************************************
    // Obtener perfiles con orden y contando la cantidas de Hamburguesa que tiene el perfil
    // ************************************************************************************
    static obtenerHamburguesa(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield HamburguesaEsquema_1.default.aggregate([
                { $lookup: { from: "Hamburguesa", localField: "_id", foreignField: "codHamburguesa", as: "cantidadHamburguesas" } },
                { $addFields: { cantidadHamburguesas: { $size: "$cantidadHamburguesas" } } }
            ]).sort({ _id: 1 });
            res.status(200).json(datos);
        });
    }
    // ************************************************************************************
    static crearHamburguesa(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosHamburguesa;
            const existe = yield HamburguesaEsquema_1.default.findOne(parametros).exec();
            if (existe) {
                res.status(400).json({ respuesta: "Nombre de Hamburguesa ya existe" });
            }
            else {
                const objHamburguesa = new HamburguesaEsquema_1.default(parametros);
                objHamburguesa.save((tuError, elObjetoBien) => {
                    if (tuError) {
                        console.log(tuError);
                        res.status(400).json({ respuesta: "Ayy no se puede grabar" });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Hamburguesa grabada", id: elObjetoBien._id
                        });
                    }
                });
            }
        });
    }
    // Eliminar Hamburguesa por identificador
    // ************************************************************************************
    static eliminarHamburguesa(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield HamburguesaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                HamburguesaEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // HamburguesaEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar la Hamburguesa" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La hamburguesa NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar Hamburguesa por _id
    // ************************************************************************************
    static actualizarHamburguesa(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete jsonExterno._id;
            delete jsonExterno.datosHamburguesa;
            delete jsonExterno.precioHamburguesa;
            const existe = yield HamburguesaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                HamburguesaEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res
                            .status(400)
                            .json({
                            respuesta: "Error al actualizar la Hamburguesa",
                        });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La Hamburguesa NO existe" });
            }
        });
    }
}
exports.default = HamburguesaDAO;
