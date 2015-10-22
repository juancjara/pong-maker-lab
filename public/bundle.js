(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var Ball = (function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

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

  _createClass(Ball, [{
    key: 'checkOffLimits',
    value: function checkOffLimits() {
      var left = this.center.x - this.size.x / 2;
      var right = this.center.x + this.size.x / 2;
      var top = this.center.y - this.size.y / 2;
      var bottom = this.center.y + this.size.y / 2;

      if (left < 0 || right > this.game.size.width) {
        this.game.over();
      } else if (top < 0 || bottom > this.game.size.height) {
        this.verticalBounce();
      }
    }

    //rebote vertical
  }, {
    key: 'verticalBounce',
    value: function verticalBounce() {
      this.speed.y *= -1;
    }

    //esta funcion se llama en cada frame
  }, {
    key: 'update',
    value: function update() {
      this.checkOffLimits();
      this.center.x += this.speed.x;
      this.center.y += this.speed.y;
    }

    //dibujar esta figura
  }, {
    key: 'draw',
    value: function draw(screen) {
      _Drawer2['default'].drawRect(screen, this);
    }

    //hacer cuando exita colision
  }, {
    key: 'collision',
    value: function collision() {
      this.bounce();
    }
  }]);

  return Ball;
})();

;

exports['default'] = Ball;
module.exports = exports['default'];

},{"./Drawer":2}],2:[function(require,module,exports){
//dibujar rectangulo en el canvas
"use strict";

Object.defineProperty(exports, "__esModule", {
                value: true
});
var drawRect = function drawRect(screen, body) {
                screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
};

var Drawer = {};
Drawer.drawRect = drawRect;

exports["default"] = Drawer;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
//crear eventos para escuchar teclas y verificar si se presiona

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Keyboarder = {
  keyState: {},

  initEvents: function initEvents() {
    var _this = this;

    window.addEventListener('keydown', function (e) {
      _this.keyState[e.keyCode] = true;
    });

    window.addEventListener('keyup', function (e) {
      console.log('up');
      _this.keyState[e.keyCode] = false;
    });
  },

  isDown: function isDown(keyCode) {
    return this.keyState[keyCode] === true;
  }
};

exports['default'] = Keyboarder;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Keyboarder = require('./Keyboarder');

var _Keyboarder2 = _interopRequireDefault(_Keyboarder);

var Player = (function () {
  function Player(game, center, keys) {
    _classCallCheck(this, Player);

    this.game = game;
    this.center = center;
    this.size = {
      x: 10,
      y: 100
    };
    this.speed = 1;
    this.keys = keys;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      //verificar si se presiono la tecla para subir y subir jugador
      if (_Keyboarder2['default'].isDown(this.keys.up)) {
        this.center.y -= this.speed;
      }
      //verificar si se presiono la tecla para bajar y bajar jugador
      else if (_Keyboarder2['default'].isDown(this.keys.down)) {
          this.center.y += this.speed;
        }
    }
  }, {
    key: 'draw',
    value: function draw(screen) {
      _Drawer2['default'].drawRect(screen, this);
    }
  }]);

  return Player;
})();

;

exports['default'] = Player;
module.exports = exports['default'];

},{"./Drawer":2,"./Keyboarder":3}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Ball = require('./Ball');

var _Ball2 = _interopRequireDefault(_Ball);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Keyboarder = require('./Keyboarder');

var _Keyboarder2 = _interopRequireDefault(_Keyboarder);

//teclas para mover paletas
var KEYS = { UP: 38, DOWN: 40, A: 65, Z: 90 };

var Game = (function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    _Keyboarder2['default'].initEvents();
    //tamanho del tablero
    this.size = {
      width: 800,
      height: 600
    };

    //objetos del juego (jugadores y pelotas)
    this.bodies = [new _Ball2['default'](this), new _Player2['default'](this, { x: 5, y: this.size.height / 2 }, { up: KEYS.A, down: KEYS.Z }), new _Player2['default'](this, { x: this.size.width - 5, y: this.size.height / 2 }, { up: KEYS.UP, down: KEYS.DOWN })];

    //obtener el canvas del DOM
    var canvas = document.getElementById('canvas');
    canvas.width = this.size.width;
    canvas.height = this.size.height;

    //Obtener el contexto para dibujar
    var screen = canvas.getContext('2d');

    this.running = true;
    //bucle infinito para dibujar
    var tick = function tick() {
      if (!_this.running) return;
      _this.update();
      _this.draw(screen);
      //dibujar aprox un frame cada 1/60 sg
      requestAnimationFrame(tick);
    };

    tick();
  }

  _createClass(Game, [{
    key: 'over',
    value: function over() {
      this.running = false;
    }
  }, {
    key: 'update',
    value: function update() {
      reportCollisions(this.bodies);
      //actualizar cada objeto
      for (var i = 0, len = this.bodies.length; i < len; i++) {
        this.bodies[i].update();
      }
    }
  }, {
    key: 'draw',
    value: function draw(screen) {
      //limpiar canvas
      screen.clearRect(0, 0, this.size.width, this.size.height);
      //dibujar cada objeto
      for (var i = 0, len = this.bodies.length; i < len; i++) {
        this.bodies[i].draw(screen);
      }
    }
  }]);

  return Game;
})();

;

var isColliding = function isColliding(b1, b2) {
  return !(b1 === b2 || b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 || b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 || b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 || b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2);
};

var reportCollisions = function reportCollisions(bodies) {
  var bodyPairs = [];
  var len = bodies.lenght;

  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (isColliding(bodies[i], bodies[j])) {
        bodyPairs.push([bodies[i], bodies[j]]);
      }
    }
  }

  for (var i = 0; i < len; i++) {
    if (bodyPairs[i][0].collision !== undefined) {
      bodyPairs[i][0].collision(bodyPairs[i][1]);
    }

    if (bodyPairs[i][1].collision !== undefined) {
      bodyPairs[i][1].collision(bodyPairs[i][0]);
    }
  }
};

new Game();

},{"./Ball":1,"./Keyboarder":3,"./Player":4}]},{},[5]);
