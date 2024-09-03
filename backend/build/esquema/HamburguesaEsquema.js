"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HamburguesaEsquema = new mongoose_1.Schema({
    tipoHamburguesa: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
    precioHamburguesa: { type: String, required: true, unique: true },
    dimensionHamburguesa: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Hamburguesa", HamburguesaEsquema, "Hamburguesa");
