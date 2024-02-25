const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 448;
canvas.height = 400;

//Variables de juego
//===Variables de la pelota===
const ballRadious = 4;
//Posicion de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;
//Velocidad de la pelota
let dx = 4;
let dy = -4;

//===Variables de la paleta===
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

const PADDLESENSITIVITY = 7;

//===Variables de los ladrillos===
const brickRowCount = 6; //Filas
const brickColumnCount = 13; //columnas
const brickWidth = 30;
const bridHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft = 30;
const bricks = [];

//TERMINAR 1:04:00
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []; //Inicializamos con un array vacio
}

//Funsiones de juego
function drawBall() {
  ctx.beginPath(); //Iniciar trasado
  ctx.arc(x, y, ballRadious, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath(); //Terminar trasado
}

function drawPaddle() {
  /*
  ctx.fillStyle = "#09f";

  
  ctx.fillRect(
    paddleX, //Cordenada x
    paddleY, //Cordenada y
    paddleWidth, //Ancho del dibujo
    paddleHeight //Alto del dibujo
  );
  */

  ctx.drawImage(
    $sprite, //Imagen
    29, //clipX: Cordenadas de recorte
    174, //clipY: Cordenadas de recorte
    paddleWidth, //Tamaño de recorte
    paddleHeight, //Tamaño de recorte
    paddleX, //Posicion X
    paddleY, //Posicion Y
    paddleWidth, //Ancho del dibujo
    paddleHeight //Alto del dibujo
  );
}
function drawBricks() {}

function collisionDetection() {}

function ballMovement() {
  //===Colisiones con paredes===
  //Rebota la pelota en los laterales
  if (
    x + dx > canvas.width - ballRadious || //Pared derecha
    x + dx < ballRadious //pared Izquierda
  ) {
    dx = -dx;
  }
  // Rebotar arriba
  if (y + dy < ballRadious) {
    dy = -dy;
  }

  //La pelota toca la pala
  const isBallSmaeXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
  const isBallTouchInPaddle = y + dy > paddleY;

  if (isBallSmaeXAsPaddle && isBallTouchInPaddle) {
    dy = -dy; //cambiamos la direccion de la pelota
  }
  // Toca en el suelo
  else if (y + dy > canvas.height - ballRadious) {
    console.log("Game over");
    document.location.reload();
  }

  //===Mover la pelota===
  x += dx;
  y += dy;
}
function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLESENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLESENSITIVITY;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(e) {
    const { key } = e;
    if (key === "ArrowRight" || key === "Right") {
      rightPressed = true;
    } else if (key === "ArrowLeft" || key === "Left") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    const { key } = e;
    if (key === "ArrowRight" || key === "Right") {
      rightPressed = false;
    } else if (key === "ArrowLeft" || key === "Left") {
      leftPressed = false;
    }
  }
}

function draw() {
  //Limpiar el canvas
  cleanCanvas();

  //Dibujar los elementos
  drawBall();
  drawPaddle();
  drawBricks();
  //drawScore()

  //Colisiones y movimientos
  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}

draw();
initEvents();
