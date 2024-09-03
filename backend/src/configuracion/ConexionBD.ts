import { connect } from "mongoose";

const ConexionDB = () => {
  const URL = String(process.env.URL_MONGO);
  connect(URL)
    .then(()=>{
      console.log("Conectados a mongo: ", URL)
    })
    .catch((suError) => {
      console.log(suError);
    });
};

export default ConexionDB;
