import Ball from './Ball';
import Player from './Player';
import Keyboarder from './Keyboarder';
import utils from './utils';
import Computer from './Computer';

let socket = io.connect('http://' + document.domain +
                        ':' + location.port + '/test');

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

    this.computer = new Computer(this, {x: 5, y: this.size.height / 2});

    //objetos del juego (jugadores y pelotas)
    this.bodies = [
      new Ball(this),
      this.computer,
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
    let crashBodies = utils.reportCollisions(this.bodies);
    for (let i = 0, len = crashBodies.length; i < len; i++) {
      crashBodies[i][0].collision(crashBodies[i][1]);
    }
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

let game = new Game();

socket.on('connect', () => {
  console.log('connected');
});

socket.on('moveUp', () => {
  game.computer.moveUp();
});

socket.on('moveDown', () => {
  game.computer.moveDown();
});

socket.on('setCenter', (newCenter) => {
  game.computer.setCenter(newCenter);
});


