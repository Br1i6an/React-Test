import HamburguesaEntidad from "./HamburguesaEntidad";
import PerfilEntidad from "./PerfinEntidad";

class UsuarioEntidad {
    public nombreUsuario: string;
    public correoUsuario: string;
    public claveUsuario: string;
    public estadoUsuario: number;
    public fechaUsuario: Date;
    public codPerfil: PerfilEntidad;

    public nombreImagenUsuario?: string;
    public avatarUsuario?: string;


    
    constructor(nom: string, corr: string, cla: string, est: number, dat: Date, codP: PerfilEntidad){
        this.nombreUsuario = nom;
        this.correoUsuario = corr;
        this.claveUsuario = cla;
        this.estadoUsuario = est;
        this.fechaUsuario = dat;
        this.codPerfil= codP;    }

}

export default UsuarioEntidad;