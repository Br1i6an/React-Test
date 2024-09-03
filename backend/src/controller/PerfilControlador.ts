import { Response, Request } from "express";
import PerfilDAO from "../dao/PerfilDAO";

class PerfilControlador extends PerfilDAO {

  public consulta(req: Request, res: Response): void {
    PerfilControlador.consultarPerfil(res);
  }

  public consultarUno(req: Request, res: Response): void {
    PerfilControlador.consultarUnPerfil(req.params.codiguito, res);
  }

  public crear(req: Request, res: Response): void {
    PerfilControlador.crearPerfil(req.body, res);
  }

  public eliminar(req: Request, res: Response): void {
    PerfilControlador.eliminarPerfil(req.params.codiguito, res);
  }

  public actualizar(req: Request, res: Response): void {
    PerfilControlador.actualizarPerfil(req.params.codiguito, req.body, res);
  }

}

const perfilControlador = new PerfilControlador();
export default perfilControlador;
