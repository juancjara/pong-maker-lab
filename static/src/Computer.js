import Drawer from './Drawer';

class Computer {
  constructor(game, center) {
    this.game = game;
    this.center = center;
    this.size = {
      x: 10,
      y: 100
    };
    this.speed = 2;
  }

  update() {
  }

  draw(screen) {
    Drawer.drawRect(screen, this);
  }

  moveUp() {
    this.center.y -= this.speed;
  }

  moveDown() {
    this.center.y += this.speed;
  }

  setCenter(size) {
    this.size = size;
  }
};

export default Computer;

