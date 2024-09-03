import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";

class PerfilDAO {

    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    protected static async consultarUnPerfil(identificador: any, res: Response): Promise<any> {
      const jsonPerfil = { _id: identificador };
      const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
      if (existePerfil) {
          res.status(200).json(existePerfil);
      } else {
          res.status(400).json({ respuesta: "El perfil NO existe con ese identificador" });
      }
  }
  // ************************************************************************************


  // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
  // ************************************************************************************
  protected static async consultarPerfil(res: Response): Promise<any> {
      const datos = await PerfilEsquema.aggregate([
          { $lookup: { from: "Usuario", localField: "_id", foreignField: "codPerfil", as: "cantidadUsuarios" } },
          { $addFields: { cantidadUsuarios: { $size: "$cantidadUsuarios" } } }
      ]).sort({ _id: 1 });
      res.status(200).json(datos);
  }
  // ************************************************************************************

  protected static async crearPerfil(parametros: any, res: Response): Promise<any> {
    delete parametros.datos;
    delete parametros._id;
    const existe = await PerfilEsquema.findOne(parametros).exec();
    if (existe) {
      res.status(400).json({ respuesta: "Nombre del perfil ya existe" });
    } else {
      const miPerfil = new PerfilEsquema(parametros);
      miPerfil.save((tuError, elObjetoBien) => {
        if (tuError) {
          console.log(tuError);
          res.status(400).json({ respuesta: "Ayy no se puede grabar" });
        } else {
          res.status(200).json({
            respuesta: "Perfil grabado", id: elObjetoBien._id
          });
        }
      });
    }
  }

  protected static async eliminarPerfil(identificador: any, res: Response): Promise<any> {
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndDelete(identificador, (tuError:any, elObjetoBien:any) => {
        if (tuError) {
          console.log(tuError);
          res.status(400).json({ respuesta: "No se puede borrar" });
        } else {
          res.status(200).json({
            respuesta: "Perfil eliminado", id: elObjetoBien
          });
        }
      });
    } else {
      res.status(400).json({ respuesta: "Perfil NO existe" });      
    }
  }

  protected static async actualizarPerfil(identificador: any, miJson: any ,res: Response): Promise<any> {
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndUpdate(
        {_id: identificador}, 
        {$set: miJson},
        (tuError:any, elObjetoBien:any) => {
        if (tuError) {
          console.log(tuError);
          res.status(400).json({ respuesta: "No se puede actualizar" });
        } else {
          res.status(200).json({
            respuesta: "Perfil actualizado", antes: elObjetoBien, nuevo: miJson
          });
        }
      });
    } else {
      res.status(400).json({ respuesta: "Perfil NO existe" });      
    }
  }

}

export default PerfilDAO;
