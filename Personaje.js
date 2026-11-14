
class Personaje {
  constructor(imagen, suelo) {
    this.imagen = imagen;
    this.alto = 90;
    this.ancho = this.alto * imagen.width / imagen.height;
    this.suelo = suelo;
    this.posX = 350;
    this.posY = suelo - this.alto;
    this.velY = 0;
    this.gravedad = 0.7;
    this.enSuelo = true;
    this.vivo = true;
  }

  mover() {
    this.velY += this.gravedad;
    this.posY += this.velY;
    if (this.posY >= this.suelo - this.alto) {
      this.posY = this.suelo - this.alto;
      this.velY = 0;
      this.enSuelo = true;
    }
  }

  saltar() {
    if (this.enSuelo) {
      this.velY = -15;
      this.enSuelo = false;
    }
  }

  morir() {
    this.vivo = false;
  }

  estaVivo() {
    return this.vivo;
  }

  centroX() {
    return this.posX + this.ancho / 2;
  }

  centroY() {
    return this.posY + this.alto / 2;
  }

  dibujar() {
    image(this.imagen, this.posX, this.posY, this.ancho, this.alto);
    this.mover();
  }
}
