'use strict';

var branches = [];
var maxbranches = 1000;

function setup() {
  createCanvas(800, 800);
  background(0);
  noSmooth();
}

function draw() {
  noStroke();

  var r = max(random(2, 10), 10);

  fill(0, r);
  rect(0, 0, width, height);
  noFill();

  r = 30 + random(1, 10) * 20;
  stroke(255, r);

  for (var i = branches.length - 1; --i >= 0; ) {

    var b = branches[i];

    b.life++;

    var oldx = b.x;
    var oldy = b.y;

    b.vel += random(-5, 5);
    b.x += cos(b.vel) * b.speed;
    b.y += sin(b.vel) * b.speed;

    line(oldx, oldy, b.x, b.y);

    if (!b.alive()) {
      branches.splice(i, 1);
    }

    if (random(1) > 0.75 && branches.length < maxbranches) {
      branches.push(new Branch(b.x, b.y, b.maxlife / 2));
    }

    if (b.target.x || b.target.y) {
      b.x += (b.target.x - b.x) * max(random(0.03, 0.1), 0.08);
      b.y += (b.target.y - b.y) * max(random(0.03, 0.1), 0.08);
    }

  }
}

function mousePressed() {
  for (var i = 0; i < 100; i++) {
    branches.push(new Branch(mouseX, mouseY, 1000));
  }
}

function mouseMoved() {
  for (var i = 0, l = branches.length; i < l; i++) {
    branches[i].target.set(mouseX, mouseY);
  }
}

function Branch(x, y, maxlife) {
  this.x = x;
  this.y = y;
  this.maxlife = maxlife;
  this.life = 0;
  this.speed = max(random(1, 3), 3);
  this.vel = random(-PI * 2, PI * 2);
  this.target = createVector(0, 0);
}

Branch.prototype.alive = function () {
  return this.life < this.maxlife ||
      this.x < 0 || this.y < 0 ||
      this.x > width || this.y > height;
};
