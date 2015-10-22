import Ball from './Ball';
import Player from './Player';
import Keyboarder from './Keyboarder';

//teclas para mover paletas
const KEYS = {UP: 38, DOWN: 40, A: 65, Z: 90};

class Game {
  constructor() {
    Keyboarder.initEvents();
    //tamanho del tablero
    this.size = {
      width: 800,
      height: 600
    };

    //objetos del juego (jugadores y pelotas)
    this.bodies = [
      new Ball(this),
      new Player(this, {x: 5, y: this.size.height / 2},
                 {up: KEYS.A, down: KEYS.Z}),
      new Player(this, {x: this.size.width - 5, y: this.size.height / 2},
                 {up: KEYS.UP, down: KEYS.DOWN})
    ];

    //obtener el canvas del DOM
    let canvas = document.getElementById('canvas');
    canvas.width = this.size.width;
    canvas.height = this.size.height;

    //Obtener el contexto para dibujar
    let screen = canvas.getContext('2d');

    this.running = true;
    //bucle infinito para dibujar
    let tick = () => {
      if (!this.running) return;
      this.update();
      this.draw(screen);
      //dibujar aprox un frame cada 1/60 sg
      requestAnimationFrame(tick);
    };

    tick();
  }

  over() {
    this.running = false;
  }

  update() {
    reportCollisions(this.bodies);
    //actualizar cada objeto
    for (let i = 0, len = this.bodies.length; i < len; i++) {
      this.bodies[i].update();
    }
  }

  draw(screen) {
    //limpiar canvas
    screen.clearRect(0, 0, this.size.width, this.size.height);
    //dibujar cada objeto
    for (let i = 0, len = this.bodies.length; i < len; i++) {
      this.bodies[i].draw(screen);
    }
  }
};

let isColliding = function(b1, b2) {
  return !(
    b1 === b2 ||
      b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
      b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 ||
      b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
      b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2
  );
};

let reportCollisions = function(bodies) {
  let bodyPairs = [];
  let len = bodies.lenght;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isColliding(bodies[i], bodies[j])) {
        bodyPairs.push([bodies[i], bodies[j]]);
      }
    }
  }

  for (let i = 0; i < len; i++) {
    if (bodyPairs[i][0].collision !== undefined) {
      bodyPairs[i][0].collision(bodyPairs[i][1]);
    }

    if (bodyPairs[i][1].collision !== undefined) {
      bodyPairs[i][1].collision(bodyPairs[i][0]);
    }
  }
};

new Game();
