import Drawer from './Drawer';
import Keyboarder from './Keyboarder';

class Player {
  constructor(game, center, keys) {
    this.game = game;
    this.center = center;
    this.size = {
      x: 10,
      y: 100
    };
    this.speed = 1;
    this.keys = keys;
  }

  update() {
    //verificar si se presiono la tecla para subir y subir jugador
    if (Keyboarder.isDown(this.keys.up)) {
      this.center.y -= this.speed;
    }
    //verificar si se presiono la tecla para bajar y bajar jugador
    else if (Keyboarder.isDown(this.keys.down)) {
      this.center.y += this.speed;
    }
  }

  draw(screen) {
    Drawer.drawRect(screen, this);
  }

  serialize() {
    return {
      size: this.size,
      speed: this.speed,
      center: this.center
    }
  }

};

export default Player;
