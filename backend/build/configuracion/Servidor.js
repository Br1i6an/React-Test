"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ConexionBD_1 = __importDefault(require("./ConexionBD"));
// Acá deberían ir los imports de las rutas
const PerfilRuta_1 = __importDefault(require("../ruta/PerfilRuta"));
const HamburguesaRuta_1 = __importDefault(require("../ruta/HamburguesaRuta"));
const UsuarioRuta_1 = __importDefault(require("../ruta/UsuarioRuta"));
const Seguridad_1 = __importDefault(require("../middleware/Seguridad"));
const UsuarioPrivadoRuta_1 = __importDefault(require("../ruta/UsuarioPrivadoRuta"));
class Servidor {
    constructor() {
        dotenv_1.default.config({ path: "variables.env" });
        (0, ConexionBD_1.default)();
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.cargarRutas();
    }
    cargarConfiguracion() {
        this.app.set("PORT", process.env.PORT);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "20mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    cargarRutas() {
        this.app.use("/api/publico/usuarios", UsuarioRuta_1.default);
        this.app.use("/api/privado/perfiles", Seguridad_1.default.verificarToken, PerfilRuta_1.default);
        this.app.use("/api/privado/usuarios", Seguridad_1.default.verificarToken, UsuarioPrivadoRuta_1.default);
        this.app.use("/api/privado/hamburguesas", Seguridad_1.default.verificarToken, HamburguesaRuta_1.default);
    }
    iniciarBackend() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Servidor arriba en ", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
