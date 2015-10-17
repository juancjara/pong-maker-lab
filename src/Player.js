import Drawer from './Drawer';
import Keyboarder from './Keyboarder';

let Player = function(game, center, keys) {
  this.game = game;
  this.center = center;
  this.size = {
    x: 10,
    y: 100
  };
  this.speed = 1;
  this.keys = keys;
  this.keyboarder = new Keyboarder();
}

Player.prototype = {

  update() {
    if (this.keyboarder.isDown(this.keys.up)) {
      this.center.y -= this.speed;
    } else if (this.keyboarder.isDown(this.keys.down)) {
      this.center.y += this.speed;
    }
  },

  draw(screen) {
    Drawer.drawRect(screen, this);
  }
};

export default Player;
