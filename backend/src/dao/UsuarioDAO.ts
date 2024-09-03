import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";
import UsuarioEsquema from "../esquema/UsuarioEsquema";
import jwt from "jsonwebtoken";
import encriptaloConToda from "bcryptjs";

class UsuarioDAO {
  protected static async VerificarSesion(parametros: any, res: Response) {
    const elCorreo = parametros.correoUsuario;
    const laClave = parametros.claveUsuario;

    UsuarioEsquema.findOne({ correoUsuario: elCorreo })
      .populate("codPerfil")
      .exec((miError, elObjetoBien) => {
        if (elObjetoBien) {
          const claveBien = encriptaloConToda.compareSync(
            laClave,
            elObjetoBien.claveUsuario
          );
          if (claveBien) {
            const miPayload = {
              codUsuario: elObjetoBien._id,
              correo: parametros.correoUsuario,
              perfli: elObjetoBien.codPerfil.nombrePerfil,
            };
            const miLlavecita = String(process.env.CLAVE_ULTRA_SECRETA);
            const miTokencito = jwt.sign(miPayload, miLlavecita, {
              expiresIn: 86400,
            });
            res.status(200).json({ tokenUSTA: miTokencito });
          } else {
            res.status(400).json({ respuesta: "Credenciales no validas" });
          }
        } else {
          res.status(400).json({ respuesta: "Credenciales no validas, CERO" });
        }
      });
  }

  protected static async consultarUsuario(res: Response): Promise<any> {
    const misUsuarios = await UsuarioEsquema.find().sort({ _id: -1 });
    res.status(200).json(misUsuarios);
  }

  protected static async crearUsuario(
    correo: any,
    parametros: any,
    res: Response
  ): Promise<any> {
    const perfilito = String(process.env.PERFIL_POR_DEFECTO);
    const jsonPerfil = { nombrePerfil: perfilito };
    const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
    if (existePerfil) {
      parametros.codPerfil = existePerfil._id;
    } else {
      const crearPerfil = new PerfilEsquema(jsonPerfil);
      crearPerfil.save();
      parametros.codPerfil = crearPerfil._id;
    }

    const existe = await UsuarioEsquema.findOne(correo).exec();
    if (existe) {
      res.status(400).json({ respuesta: "Correo ya existente" });
    } else {
      parametros.claveUsuario = encriptaloConToda.hashSync(
        parametros.claveUsuario,
        10
      );
      const miUsuario = new UsuarioEsquema(parametros);
      miUsuario.save((tuError, elObjetoBien) => {
        if (tuError) {
          console.log(tuError);
          res.status(400).json({ respuesta: "Ayy no se puede grabar" });
        } else {
          const miPayload = {
            codUsuario: elObjetoBien._id,
            correo: parametros.correoUsuario,
          };
          const miLlavecita = String(process.env.CLAVE_ULTRA_SECRETA);
          const miTokencito = jwt.sign(miPayload, miLlavecita, {
            expiresIn: 86400,
          });
          res.status(200).json({ tokenUSTA: miTokencito });
        }
      });
    }
  }

  protected static async eliminarUsuario(
    identificador: any,
    res: Response
  ): Promise<any> {
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndDelete(
        identificador,
        (tuError: any, elObjetoBien: any) => {
          if (tuError) {
            console.log(tuError);
            res.status(400).json({ respuesta: "No se puede borrar" });
          } else {
            res.status(200).json({
              respuesta: "Perfil eliminado",
              id: elObjetoBien,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Usuario NO existe" });
    }
  }

  protected static async actualizarUsuario(
    identificador: any,
    miJson: any,
    res: Response
  ): Promise<any> {
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndUpdate(
        { _id: identificador },
        { $set: miJson },
        (tuError: any, elObjetoBien: any) => {
          if (tuError) {
            console.log(tuError);
            res.status(400).json({ respuesta: "No se puede actualizar" });
          } else {
            res.status(200).json({
              respuesta: "Usuario actualizado",
              antes: elObjetoBien,
              nuevo: miJson,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Usuario NO existe" });
    }
  }
}

export default UsuarioDAO;
