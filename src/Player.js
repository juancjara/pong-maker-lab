import Drawer from './Drawer';
import Keyboarder from './Keyboarder';

//"clase y constructor" de cada jugador
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

//funciones de la clase
Player.prototype = {

  update() {
    //verificar si se presiono la tecla para subir y subir jugador
    if (this.keyboarder.isDown(this.keys.up)) {
      this.center.y -= this.speed;
    }
    //verificar si se presiono la tecla para bajar y bajar jugador
    else if (this.keyboarder.isDown(this.keys.down)) {
      this.center.y += this.speed;
    }
  },

  draw(screen) {
    Drawer.drawRect(screen, this);
  }
};

export default Player;
