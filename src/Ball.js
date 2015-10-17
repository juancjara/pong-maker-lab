import Drawer from './Drawer';

let Ball = function(game) {
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
};

Ball.prototype = {
  checkOfLimits() {
    let left = this.center.x - this.size.x / 2;
    let right = this.center.x + this.size.x / 2;
    let top = this.center.y - this.size.y / 2;
    let bottom = this.center.y + this.size.y / 2;

    if (left < 0 || right > this.game.size.width) {
      this.horizontalBounce();
    } else if (top < 0 || bottom > this.game.size.height) {
      this.verticalBounce();
    }
  },

  horizontalBounce() {
    this.speed.x *= -1;
  },

  verticalBounce() {
    this.speed.y *= -1;
  },

  update() {
    this.checkOfLimits();
    this.center.x += this.speed.x;
    this.center.y += this.speed.y;
  },

  draw(screen) {
    Drawer.drawRect(screen, this);
  },

  collision() {
    this.bounce();
  }
};

export default Ball;
