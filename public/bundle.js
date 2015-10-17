(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var Ball = function Ball(game) {
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
  checkOfLimits: function checkOfLimits() {
    var left = this.center.x - this.size.x / 2;
    var right = this.center.x + this.size.x / 2;
    var top = this.center.y - this.size.y / 2;
    var bottom = this.center.y + this.size.y / 2;

    if (left < 0 || right > this.game.size.width) {
      this.horizontalBounce();
    } else if (top < 0 || bottom > this.game.size.height) {
      this.verticalBounce();
    }
  },

  horizontalBounce: function horizontalBounce() {
    this.speed.x *= -1;
  },

  verticalBounce: function verticalBounce() {
    this.speed.y *= -1;
  },

  update: function update() {
    this.checkOfLimits();
    this.center.x += this.speed.x;
    this.center.y += this.speed.y;
  },

  draw: function draw(screen) {
    _Drawer2['default'].drawRect(screen, this);
  },

  collision: function collision() {
    this.bounce();
  }
};

exports['default'] = Ball;
module.exports = exports['default'];

},{"./Drawer":2}],2:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Keyboarder = function Keyboarder() {
  var keyState = {};

  window.addEventListener('keydown', function (e) {
    keyState[e.keyCode] = true;
  });

  window.addEventListener('keyup', function (e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function (keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { UP: 38, DOWN: 40, A: 65, Z: 90 };
};

exports['default'] = Keyboarder;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Keyboarder = require('./Keyboarder');

var _Keyboarder2 = _interopRequireDefault(_Keyboarder);

var Player = function Player(game, center, keys) {
  this.game = game;
  this.center = center;
  this.size = {
    x: 10,
    y: 100
  };
  this.speed = 1;
  this.keys = keys;
  this.keyboarder = new _Keyboarder2['default']();
};

Player.prototype = {

  update: function update() {
    if (this.keyboarder.isDown(this.keys.up)) {
      this.center.y -= this.speed;
    } else if (this.keyboarder.isDown(this.keys.down)) {
      this.center.y += this.speed;
    }
  },

  draw: function draw(screen) {
    _Drawer2['default'].drawRect(screen, this);
  }
};

exports['default'] = Player;
module.exports = exports['default'];

},{"./Drawer":2,"./Keyboarder":3}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Ball = require('./Ball');

var _Ball2 = _interopRequireDefault(_Ball);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var KEYS = { UP: 38, DOWN: 40, A: 65, Z: 90 };

var Game = function Game() {
  var _this = this;

  this.size = {
    width: 800,
    height: 600
  };

  this.bodies = [new _Ball2['default'](this), new _Player2['default'](this, { x: 15, y: this.size.height / 2 }, { up: KEYS.A, down: KEYS.Z }), new _Player2['default'](this, { x: this.size.width - 15, y: this.size.height / 2 }, { up: KEYS.UP, down: KEYS.DOWN })];

  var canvas = document.getElementById('canvas');
  canvas.width = this.size.width;
  canvas.height = this.size.height;

  var screen = canvas.getContext('2d');

  var tick = function tick() {
    _this.update();
    _this.draw(screen);
    requestAnimationFrame(tick);
  };
  tick();
};

Game.prototype = {
  update: function update() {
    reportCollisions(this.bodies);
    for (var i = 0, len = this.bodies.length; i < len; i++) {
      this.bodies[i].update();
    }
  },

  draw: function draw(screen) {
    screen.clearRect(0, 0, this.size.width, this.size.height);
    for (var i = 0, len = this.bodies.length; i < len; i++) {
      this.bodies[i].draw(screen);
    }
  }
};

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

},{"./Ball":1,"./Player":4}]},{},[5]);
