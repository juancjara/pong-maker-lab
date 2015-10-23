let isColliding = function(b1, b2) {
  return !(
    b1 === b2 ||
      b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
      b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 ||
      b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
      b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2
  );
};

let reportCollisions = function(bodies) {

  let bodyPairs = [];
  let len = bodies.length;
  let collisions = [];

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isColliding(bodies[i], bodies[j])) {
        bodyPairs.push([bodies[i], bodies[j]]);
      }
    }
  }

  len = bodyPairs.length;
  for (let i = 0; i < len; i++) {
    if (bodyPairs[i][0].collision !== undefined) {
      collisions.push([bodyPairs[i][0], bodyPairs[i][1]]);
    }

    if (bodyPairs[i][1].collision !== undefined) {
      collisions.push([bodyPairs[i][1], bodyPairs[i][0]]);
    }
  }

  return collisions;
};

export default {
  reportCollisions
};
