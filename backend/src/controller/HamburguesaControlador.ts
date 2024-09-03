import { Response, Request } from "express";
import HamburguesaDAO from "../dao/HamburguesaDAO";

class HamburguesaControlador extends HamburguesaDAO {

  public consulta(req: Request, res: Response): void {
    HamburguesaControlador.obtenerHamburguesa(res);
  }

  public consultarUno(req: Request, res: Response): void {
    HamburguesaControlador.obtenerUnaHamburguesa(req.params.codigo, res);
  }

  public crear(req: Request, res: Response): void {
  HamburguesaControlador.crearHamburguesa(req.body, res);
  }

  public eliminar(req: Request, res: Response): void {
    HamburguesaControlador.eliminarHamburguesa(req.params.codigo, res);
  }

  public actualizar(req: Request, res: Response): void {
    HamburguesaControlador.actualizarHamburguesa(req.params.codigo, req.body, res);
  }
}

const hamburguesaControlador = new HamburguesaControlador();
export default hamburguesaControlador;
