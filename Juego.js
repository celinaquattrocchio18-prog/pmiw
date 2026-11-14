
class Juego {
  constructor(imgTeseo, imgMinotauro, imgHueso, imgFondo, imgInicio, imgPresentacion, imgInstrucciones, musica) {
    this.imgTeseo = imgTeseo;
    this.imgMinotauro = imgMinotauro;
    this.imgHueso = imgHueso;
    this.imgInicio = imgInicio;
    this.imgPresentacion = imgPresentacion;
    this.imgInstrucciones = imgInstrucciones;
    this.fondo = new Fondo(imgFondo);
    this.musica = musica;
    this.meta = 15;

    this.botonX = 650;
    this.botonY = 340;
    this.botonAncho = 120;
    this.botonAlto = 40;

    this.nombres = ["Celina Quattrocchio", "Ángeles Pereyra"];
    this.textoPresentacion = "Bienvenido a la huida del laberinto!\n\nInspirado en el mito griego del Minotauro y Teseo, te invitamos a adentrarte en un misterioso laberinto donde el peligro está siempre detrás de vos. Sos Teseo y tu objetivo es avanzar por los oscuros pasillos mientras intentás escapar del Minotauro, una criatura que te persigue sin descanso. Cada obstáculo será un nuevo desafío en tu camino hacia la libertad.\n\n¿Lograrás escapar antes de que te alcance?";
    this.textoInstrucciones = "¡Tu aventura comienza ahora!\n\nPara saltar, presioná la flecha hacia arriba o la barra espaciadora. A medida que recorras el pasillo, deberás saltar los huesos que aparezcan en tu camino: si chocás con uno, perdés. ¡Mantenete alerta! El Minotauro viene detrás de vos. Si lográs pasar 15 huesos, escapás del laberinto. Para volver a empezar, presioná la tecla R.";

    this.reiniciar();
    this.estado = "inicio";
  }

  reiniciar() {
    this.personaje = new Personaje(this.imgTeseo, this.fondo.suelo);
    this.minotauro = new Minotauro(this.imgMinotauro, this.fondo.suelo);
    this.huesos = [];
    this.agregarHuesos();
    this.saltados = 0;
    this.estado = "jugando";
  }

  agregarHuesos() {
    for (let i = 0; i < 3; i++) {
      this.huesos.push(new Hueso(this.imgHueso, width + 300 + i * 350, this.fondo.suelo));
    }
  }

  dibujar() {
    if (this.estado === "inicio") {
      this.dibujarInicio();
    } else if (this.estado === "presentacion") {
      this.dibujarPresentacion();
    } else if (this.estado === "instrucciones") {
      this.dibujarInstrucciones();
    } else if (this.estado === "jugando") {
      this.jugar();
    } else if (this.estado === "ganaste") {
      this.dibujarFinal("¡Escapaste!");
    } else {
      this.dibujarFinal("PERDISTE");
    }
  }

  // ---------- pantallas del principio ----------
  dibujarInicio() {
    image(this.imgInicio, 0, 0, width, height);
    fill(150, 10, 40);
    textAlign(LEFT, CENTER);
    textSize(14);
    for (let i = 0; i < this.nombres.length; i++) {
      text(this.nombres[i], 20, 345 + i * 26);
    }
    this.dibujarBoton("Siguiente");
  }

  dibujarPresentacion() {
    image(this.imgPresentacion, 0, 0, width, height);
    this.dibujarPanel();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(this.textoPresentacion, 80, 35, 640, 290);
    this.dibujarBoton("Siguiente");
  }

  dibujarInstrucciones() {
    image(this.imgInstrucciones, 0, 0, width, height);
    this.dibujarPanel();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("INSTRUCCIONES PARA JUGAR", width / 2, 55);
    textSize(14);
    text(this.textoInstrucciones, 80, 95, 640, 230);
    this.dibujarBoton("Jugar");
  }

  dibujarPanel() {
    fill(0, 150);
    rect(60, 25, 680, 310, 10);
  }

  dibujarBoton(texto) {
    if (this.mouseSobreBoton()) {
      fill(230, 180, 90);
    } else {
      fill(200, 150, 60);
    }
    rect(this.botonX, this.botonY, this.botonAncho, this.botonAlto, 8);
    fill(25, 20, 30);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(texto, this.botonX + this.botonAncho / 2, this.botonY + this.botonAlto / 2);
  }

  mouseSobreBoton() {
    return mouseX > this.botonX && mouseX < this.botonX + this.botonAncho &&
           mouseY > this.botonY && mouseY < this.botonY + this.botonAlto;
  }

  // ---------- juego ----------
  jugar() {
    this.dibujarFondo();
    this.dibujarHuesos();
    this.dibujarMinotauro();
    this.dibujarPersonaje();
    this.detectarColisionPersonaje();
    this.verificarFinal();
  }

  dibujarFondo() {
    this.fondo.dibujar();
  }

  dibujarHuesos() {
    for (let i = 0; i < this.huesos.length; i++) {
      this.huesos[i].dibujar();
      if (this.huesos[i].salioDePantalla()) {
        this.saltados++;
        this.reubicarHueso(this.huesos[i]);
      }
    }
  }

  dibujarMinotauro() {
    this.minotauro.dibujar();
  }

  dibujarPersonaje() {
    this.personaje.dibujar();
  }

  reubicarHueso(hueso) {
    let masLejano = width;
    for (let i = 0; i < this.huesos.length; i++) {
      if (this.huesos[i].posX > masLejano) {
        masLejano = this.huesos[i].posX;
      }
    }
    hueso.posX = masLejano + random(250, 450);
  }

  detectarColisionPersonaje() {
    for (let i = 0; i < this.huesos.length; i++) {
      if (dist(
        this.personaje.centroX(),
        this.personaje.centroY(),
        this.huesos[i].centroX(),
        this.huesos[i].centroY()
      ) < 50) {
        this.personaje.morir();
      }
    }
  }

  verificarFinal() {
    if (!this.personaje.estaVivo()) {
      this.estado = "perdiste";
      this.musica.stop();
    } else if (this.saltados >= this.meta) {
      this.estado = "ganaste";
      this.musica.stop();
    }
  }

  dibujarFinal(mensaje) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text(mensaje, width / 2, height / 2);
    textSize(18);
    text("Presioná R para reiniciar", width / 2, height / 2 + 40);
  }

  // ---------- mouse y teclado ----------
  mousePressed() {
    if (this.mouseSobreBoton()) {
      if (this.estado === "inicio") {
        this.estado = "presentacion";
      } else if (this.estado === "presentacion") {
        this.estado = "instrucciones";
      } else if (this.estado === "instrucciones") {
        this.estado = "jugando";
        this.musica.loop();
      }
    }
  }

  teclaPresionada() {
    if (this.estado === "jugando") {
      if (keyCode === UP_ARROW || keyCode === 32) {
        this.personaje.saltar();
      }
    } else if (this.estado === "ganaste" || this.estado === "perdiste") {
      if (keyCode === 82) {
        this.reiniciar();
        this.musica.loop();
      }
    }
  }
}
