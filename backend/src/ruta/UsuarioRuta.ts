import { Router } from "express";
import usuarioControlador from "../controller/UsuarioControlador";

class UsuarioRuta {
  public apiRutaUsuario: Router;

  constructor() {
    this.apiRutaUsuario = Router();
    this.cargarRutas();
  }

  public cargarRutas(): void {
    this.apiRutaUsuario.post("/crear", usuarioControlador.crear);
    this.apiRutaUsuario.get("/todos", usuarioControlador.consulta);
    this.apiRutaUsuario.post("/iniciar", usuarioControlador.logIn);
    this.apiRutaUsuario.delete("/eliminar/:codiguito", usuarioControlador.eliminar);
    this.apiRutaUsuario.put("/actualizar/:codiguito", usuarioControlador.actualizar);
  }
}

const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.apiRutaUsuario;
