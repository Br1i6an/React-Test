import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionBD from "./ConexionBD";

// Acá deberían ir los imports de las rutas
import perfilRuta from "../ruta/PerfilRuta";
import hamburguesaRuta from "../ruta/HamburguesaRuta";
import usuarioRuta from "../ruta/UsuarioRuta";
import seguridad from "../middleware/Seguridad";
import UsuarioPrivadoRuta from "../ruta/UsuarioPrivadoRuta";

class Servidor {

    public app: express.Application;

    constructor() {
        dotenv.config({ path: "variables.env" });
        ConexionBD();
        this.app = express();
        this.cargarConfiguracion();
        this.cargarRutas();
    }

    public cargarConfiguracion() {
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "20mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    public cargarRutas() {
        this.app.use("/api/publico/usuarios", usuarioRuta);
        this.app.use("/api/privado/perfiles", seguridad.verificarToken, perfilRuta);
        this.app.use("/api/privado/usuarios", seguridad.verificarToken, UsuarioPrivadoRuta);
        this.app.use("/api/privado/hamburguesas", seguridad.verificarToken, hamburguesaRuta);
    }

    public iniciarBackend() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Servidor arriba en ", this.app.get("PORT"));
        });
    }

}

export default Servidor;


