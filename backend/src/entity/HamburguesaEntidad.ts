class HamburguesaEntidad {
  public tipoHamburguesa: number;
  public precioHamburguesa: string;
  public dimensionHamburguesa: number;

  constructor(tip: number, dim : number, pre : string) {
    this.tipoHamburguesa = tip;
    this.precioHamburguesa = pre;
    this.dimensionHamburguesa = dim;
  }
}

export default HamburguesaEntidad;