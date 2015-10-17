//crear eventos para escuchar teclas y verificar si se presiona

var Keyboarder = function() {
  var keyState = {};

  window.addEventListener('keydown', function(e) {
    keyState[e.keyCode] = true;
  });

  window.addEventListener('keyup', function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };
};

export default Keyboarder;
