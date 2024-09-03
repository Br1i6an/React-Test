class PlatanoEntidad {
    public tipoPlatano: number;
    public precioPlatano: string;
    public disponibilidadPlatano: number;
  
    constructor(tip: number, est : number, pre : string) {
      this.tipoPlatano = tip;
      this.precioPlatano = pre;
      this.disponibilidadPlatano = est;
    }
  }
  
  export default PlatanoEntidad;