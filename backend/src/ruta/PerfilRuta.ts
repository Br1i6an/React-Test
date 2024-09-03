import { Router } from "express";
import perfilControlador from "../controller/PerfilControlador";

class PerfilRuta {
  public apiRutaPerfil: Router;

  constructor() {
    this.apiRutaPerfil = Router();
    this.cargarRutas();
  }

  public cargarRutas(): void {
    this.apiRutaPerfil.post("/crear", perfilControlador.crear);
    this.apiRutaPerfil.get("/todos", perfilControlador.consulta);
    this.apiRutaPerfil.delete("/eliminar/:codiguito", perfilControlador.eliminar);
    this.apiRutaPerfil.put("/actualizar/:codiguito", perfilControlador.actualizar);
    this.apiRutaPerfil.get("/uno/:codiguito", perfilControlador.consultarUno);
  }
}

const perfilRuta = new PerfilRuta();
export default perfilRuta.apiRutaPerfil;
