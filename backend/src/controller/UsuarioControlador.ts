import { Response, Request } from "express";
import UsuarioDAO from "../dao/UsuarioDAO";

class UsuarioControlador extends UsuarioDAO {
  public logIn(req: Request, res: Response): void {
    UsuarioControlador.VerificarSesion(req.body, res);
  }

  public consulta(req: Request, res: Response): void {
    UsuarioControlador.consultarUsuario(res);
  }

  public crear(req: Request, res: Response): void {
    const correito = { correoUsuario: req.body.correoUsuario };
    UsuarioControlador.crearUsuario(correito, req.body, res);
  }

  public eliminar(req: Request, res: Response): void {
    UsuarioControlador.eliminarUsuario(req.params.codiguito, res);
  }

  public actualizar(req: Request, res: Response): void {
    UsuarioControlador.actualizarUsuario(req.params.codiguito, req.body, res);
  }
}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
