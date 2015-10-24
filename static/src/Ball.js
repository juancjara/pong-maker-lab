import Drawer from './Drawer';

class Ball {
  constructor(game) {
    this.game = game;
    this.center = {
      x: 400,
      y: 300
    };
    this.size = {
      x: 10,
      y: 10
    };
    this.speed = {
      x: 1,
      y: 1
    };
  }

  //verificar si la pelota se sale del tablero
  checkOffLimits() {
    let left = this.center.x - this.size.x / 2;
    let right = this.center.x + this.size.x / 2;
    let top = this.center.y - this.size.y / 2;
    let bottom = this.center.y + this.size.y / 2;

    if (left < 0 || right > this.game.size.width) {
      this.game.over();
    } else if (top < 0 || bottom > this.game.size.height) {
      this.verticalBounce();
    }
  }

  //rebote vertical
  verticalBounce() {
    this.speed.y *= -1;
  }

  //rebote horizontal
  horizontalBounce() {
    this.speed.x *= -1;
  }

  //esta funcion se llama en cada frame 
  update() {
    this.checkOffLimits();
    this.center.x += this.speed.x;
    this.center.y += this.speed.y;
  }

  //dibujar esta figura
  draw(screen) {
    Drawer.drawRect(screen, this);
  }

  //hacer cuando exita colision
  collision(obj) {
    this.horizontalBounce();
  }

  serialize() {
    return {
      size: this.size,
      center: this.center,
      speed: this.speed
    }
  }

};

export default Ball;
