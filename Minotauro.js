
class Minotauro {
  constructor(imagen, suelo) {
    this.imagen = imagen;
    this.alto = 110;
    this.ancho = this.alto * imagen.width / imagen.height;
    this.posX = 0;
    this.posY = suelo - this.alto;
    this.vel = 0.08;
  }

  mover() {
    this.posX += this.vel;
  }

  dibujar() {
    image(this.imagen, this.posX, this.posY, this.ancho, this.alto);
    this.mover();
  }
}
