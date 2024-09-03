import { Router } from "express";
import hamburguesaControlador from "../controller/HamburguesaControlador";

class HamburguesaRuta {
  public apiRutaHamburguesa: Router;

  constructor() {
    this.apiRutaHamburguesa = Router();
    this.cargarRutas();
  }

  public cargarRutas(): void {
    this.apiRutaHamburguesa.post("/crear", hamburguesaControlador.crear);
    this.apiRutaHamburguesa.get("/todos", hamburguesaControlador.consulta);
    this.apiRutaHamburguesa.get('/uno/:codigo', hamburguesaControlador.consultarUno);
    this.apiRutaHamburguesa.delete('/eliminar/:codigo', hamburguesaControlador.eliminar);
    this.apiRutaHamburguesa.put('/actualizar/:codigo', hamburguesaControlador.actualizar);
  }
}

const hamburguesaRuta = new HamburguesaRuta();
export default hamburguesaRuta.apiRutaHamburguesa;


