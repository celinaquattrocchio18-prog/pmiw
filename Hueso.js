
class Hueso {
  constructor(imagen, posX, suelo) {
    this.imagen = imagen;
    this.alto = 40;
    this.ancho = this.alto * imagen.width / imagen.height;
    this.posX = posX;
    this.posY = suelo - this.alto;
    this.vel = 5;
  }

  mover() {
    this.posX -= this.vel;
  }

  salioDePantalla() {
    return this.posX < -this.ancho;
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
