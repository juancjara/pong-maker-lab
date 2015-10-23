let assert = require('assert');

let utils = require('../src/utils');

class A {
  constructor(center, size) {
    this.center = center;
    this.size = size;
  }
};

class B {
  constructor(center, size) {
    this.center = center;
    this.size = size;
  }

  collision() {}
};

let bodies = [
  new A({x: 10, y: 10}, {x: 10, y: 10}),
  new B({x: 15, y: 15}, {x: 8, y: 8})
];


describe('collisions', () => {
  it('report collisions', () => {
    var c = utils.reportCollisions(bodies);
    assert.deepEqual(c, [bodies[1], bodies[0]]);
  });
});

