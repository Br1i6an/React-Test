"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConexionDB = () => {
    const URL = String(process.env.URL_MONGO);
    (0, mongoose_1.connect)(URL)
        .then(() => {
        console.log("Conectados a mongo: ", URL);
    })
        .catch((suError) => {
        console.log(suError);
    });
};
exports.default = ConexionDB;
