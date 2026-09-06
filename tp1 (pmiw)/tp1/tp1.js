let fondo;
let letras;
let llegada = [];
let balanceo = [];
let indiceFrame = 0;       
let velocidadAnimacion = 100; 
let tiempoUltimoFrame = 0;   
let posX = 0;            
let velocidadMovimiento = 3; 
let escalaPersonaje = 2;    
let posYLlegada = 450;
let posYBalanceo = 0;
let estadoActual = "LLEGADA"; 
let llegadaTerminada = false;
let tiempoFinLlegada = 0; 
let balanceoTerminado = false;
let tiempoFinBalanceo = 0;

function preload() {
  fondo = loadImage("/assets/fondo.jpeg");
  letras = loadImage("/assets/letras.png"); 
  llegada = construirArrayDeFrames("/assets/llegada_", 8);
  balanceo = construirArrayDeFrames("/assets/balanceo_", 14);
}
function setup() {
  createCanvas(800, 600);
}
function draw() {
  image(fondo, 0, 0, width, height);

  actualizarEstado();

  if (estadoActual === "TITULO") {
    dibujarTitulo(letras); 
  } else {
    actualizarAnimacion(obtenerArrayActual(), velocidadAnimacion);
    moverPersonaje(velocidadMovimiento);
    let posY = (estadoActual === "LLEGADA") ? posYLlegada : posYBalanceo;
    dibujarPersonaje(obtenerArrayActual(), posX, posY, escalaPersonaje);
  }
}
function construirArrayDeFrames(prefijoArchivo, cantidadFrames) {
  let frames = [];
  for (let i = 1; i <= cantidadFrames; i++) {
    frames.push(loadImage(prefijoArchivo + i + ".png"));
  }
  return frames;
}
function obtenerArrayActual() {
  if (estadoActual === "LLEGADA") {
    return llegada;
  } else {
    return balanceo;
  }
}
function dibujarPersonaje(arrayFrames, x, y, escala) {
  let frameActual = arrayFrames[indiceFrame];
  let anchoDibujo = frameActual.width * escala;
  let altoDibujo = frameActual.height * escala;
  image(frameActual, x, y, anchoDibujo, altoDibujo);
}
function dibujarTitulo(imagenTitulo) {
  let w = imagenTitulo.width;
  let h = imagenTitulo.height;
  image(imagenTitulo, width / 2 - w / 2, height / 2 - h / 2);
}
function moverPersonaje(velocidad) {
  if (estadoActual === "LLEGADA" && !llegadaTerminada) {
    posX += velocidad;
  } else if (estadoActual === "BALANCEO" && !balanceoTerminado) {
    posX += velocidad;
  }
}
function actualizarEstado() {
  if (estadoActual === "LLEGADA" && !llegadaTerminada && posX > width) {
    llegadaTerminada = true;
    tiempoFinLlegada = millis();
  }
  if (estadoActual === "LLEGADA" && llegadaTerminada) {
    if (millis() - tiempoFinLlegada > 4000) {
      estadoActual = "BALANCEO";
      posX = 0;
      indiceFrame = 0;
    }
  }

  if (estadoActual === "BALANCEO" && !balanceoTerminado && posX > width) {
    balanceoTerminado = true;
    tiempoFinBalanceo = millis();
    estadoActual = "TITULO";
  }
}
function actualizarAnimacion(arrayFrames, velocidad) {
  if (millis() - tiempoUltimoFrame > velocidad) {
    tiempoUltimoFrame = millis();
    indiceFrame = (indiceFrame + 1) % arrayFrames.length;
  }
}
function reiniciarEscena() {
  estadoActual = "LLEGADA";
  llegadaTerminada = false;
  balanceoTerminado = false;
  posX = 0;
  indiceFrame = 0;
  tiempoUltimoFrame = millis();
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarEscena();
  }
}
