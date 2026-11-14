// Link video de youtube: https://youtu.be/oj4btahBV1o?si=sV_PSrPIBJla065J 
 
let juego;
let imgTeseo, imgMinotauro, imgHueso, imgFondo;
let imgInicio, imgPresentacion, imgInstrucciones;
let musica;

function preload() {
  imgTeseo = loadImage("data/teseo.png");
  imgMinotauro = loadImage("data/minotauro.png");
  imgHueso = loadImage("data/hueso.png");
  imgFondo = loadImage("data/fondo.png");
  imgInicio = loadImage("data/pantallaunojuego.jpeg");
  imgPresentacion = loadImage("data/pantalladosjuego.jpeg");
  imgInstrucciones = loadImage("data/pantallatresjuego.jpeg");
  musica = loadSound("data/musica.mp3");
}

function setup() {
  createCanvas(800, 400);
  noStroke();
  juego = new Juego(imgTeseo, imgMinotauro, imgHueso, imgFondo, imgInicio, imgPresentacion, imgInstrucciones, musica);
}

function draw() {
  juego.dibujar();
}

function mousePressed() {
  juego.mousePressed();
}

function keyPressed() {
  juego.teclaPresionada();
}
