import { Response } from "express";
import HamburguesaEsquema from "../esquema/HamburguesaEsquema";

class HamburguesaDAO {

    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    protected static async obtenerUnaHamburguesa(identificador: any, res: Response): Promise<any> {
      const jsonPerfil = { _id: identificador };
      const existeHamburguesa = await HamburguesaEsquema.findOne(jsonPerfil).exec();
      if (existeHamburguesa) {
          res.status(200).json(existeHamburguesa);
      } else {
          res.status(400).json({ respuesta: "La hamburguesa NO existe con ese identificador" });
      }
  }
  // ************************************************************************************


  // Obtener perfiles con orden y contando la cantidas de Hamburguesa que tiene el perfil
  // ************************************************************************************
  protected static async obtenerHamburguesa(res: Response): Promise<any> {
      const datos = await HamburguesaEsquema.aggregate([
          { $lookup: { from: "Hamburguesa", localField: "_id", foreignField: "codHamburguesa", as: "cantidadHamburguesas" } },
          { $addFields: { cantidadHamburguesas: { $size: "$cantidadHamburguesas" } } }
      ]).sort({ _id: 1 });
      res.status(200).json(datos);
  }
  // ************************************************************************************

  protected static async crearHamburguesa(parametros: any, res: Response): Promise<any> {
    delete parametros._id;
    delete parametros.datosHamburguesa;
    const existe = await HamburguesaEsquema.findOne(parametros).exec();
    if (existe) {
      res.status(400).json({ respuesta: "Nombre de Hamburguesa ya existe" });
    } else {
      const objHamburguesa = new HamburguesaEsquema(parametros);
      objHamburguesa.save((tuError, elObjetoBien) => {
        if (tuError) {
          console.log(tuError);
          res.status(400).json({ respuesta: "Ayy no se puede grabar" });
        } else {
          res.status(200).json({
            respuesta: "Hamburguesa grabada", id: elObjetoBien._id
          });
        }
      });
    }
  }

    // Eliminar Hamburguesa por identificador
  // ************************************************************************************
  protected static async eliminarHamburguesa(
    identificador: any,
    res: Response
  ): Promise<any> {
    const existe = await HamburguesaEsquema.findById(identificador).exec();
    if (existe) {
      HamburguesaEsquema.findByIdAndDelete(
        identificador,
        (miError: any, objeto: any) => {
          // HamburguesaEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
          if (miError) {
            res.status(400).json({ respuesta: "Error al eliminar la Hamburguesa" });
          } else {
            res.status(200).json({ eliminado: objeto });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "La hamburguesa NO existe" });
    }
  }
  // ************************************************************************************

    // actualizar Hamburguesa por _id
  // ************************************************************************************
  protected static async actualizarHamburguesa(
    identificador: string,
    jsonExterno: any,
    res: Response
  ): Promise<any> {
    delete jsonExterno._id;
    delete jsonExterno.datosHamburguesa;
    delete jsonExterno.precioHamburguesa;

    const existe = await HamburguesaEsquema.findById(identificador).exec();
    if (existe) {
      HamburguesaEsquema.findByIdAndUpdate(
        { _id: identificador },
        { $set: jsonExterno },
        (miError: any, objeto: any) => {
          if (miError) {
            console.log(miError);
            res
              .status(400)
              .json({
                respuesta:
                  "Error al actualizar la Hamburguesa",
              });
          } else {
            res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "La Hamburguesa NO existe" });
    }
  }
  // ************************************************************************************

}

export default HamburguesaDAO;
