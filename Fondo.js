
class Fondo {
  constructor(imagen) {
    this.imagen = imagen;
    this.suelo = 400;
    this.desplazamiento = 0;
    this.vel = 5;
  }

  mover() {
    this.desplazamiento += this.vel;
    if (this.desplazamiento >= width) {
      this.desplazamiento = 0;
    }
  }

  dibujar() {
    image(this.imagen, -this.desplazamiento, 0, width, height);
    image(this.imagen, width - this.desplazamiento, 0, width, height);
    this.mover();
  }
}
