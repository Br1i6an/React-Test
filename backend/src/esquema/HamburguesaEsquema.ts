import { Schema, model } from "mongoose";
import HamburguesaEntidad from "../entity/HamburguesaEntidad";

const HamburguesaEsquema = new Schema<HamburguesaEntidad>(
  {
    tipoHamburguesa: { type: Number, enum: [1,2,3,4,5], default: 1 },
    precioHamburguesa: { type: String, required: true, unique: true },
    dimensionHamburguesa: {type: Number, enum: [1,2,3,4,5], default: 1}
  },
  { versionKey: false }
);

export default model("Hamburguesa", HamburguesaEsquema, "Hamburguesa");