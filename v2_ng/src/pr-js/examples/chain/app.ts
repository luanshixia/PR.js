// app.ts

import PRApp from '../../PRApp';
import { size, noStroke, background, fill, stroke, circle, line } from '../../PR';

const ChainDemo = {
  gravity: 9.0,
  mass: 2.0,
  width: 640,
  height: 360
};

/**
 * Chain.
 *
 * One mass is attached to the mouse position and the other
 * is attached the position of the other mass. The gravity
 * in the environment pulls down on both.
 */
export default class App extends PRApp {

  s1: Spring2D;
  s2: Spring2D;

  setup() {
    size(ChainDemo.width, ChainDemo.height);
    fill(255, 0.5);
    // Inputs: x, y, mass, gravity
    this.s1 = new Spring2D(ChainDemo.width / 2, ChainDemo.height / 2, ChainDemo.mass, ChainDemo.gravity);
    this.s2 = new Spring2D(ChainDemo.width / 2, ChainDemo.height / 2, ChainDemo.mass, ChainDemo.gravity);
  }

  draw() {
    background(0, 0, 0);
    this.s1.update(this.context.mouseX, this.context.mouseY);
    this.s1.display(this.context.mouseX, this.context.mouseY);
    this.s2.update(this.s1.x, this.s1.y);
    this.s2.display(this.s1.x, this.s1.y);
  }
}

class Spring2D {

  x: number;
  y: number;
  mass: number;
  gravity: number;

  vx = 0;
  vy = 0;
  radius = 30;
  stiffness = 0.2;
  damping = 0.7;

  constructor(x: number, y: number, mass: number, gravity: number) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.gravity = gravity;
  }

  update(targetX: number, targetY: number) {
    const forceX = (targetX - this.x) * this.stiffness;
    const ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;

    const forceY = (targetY - this.y) * this.stiffness + this.gravity;
    const ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  display(nx: number, ny: number) {
    noStroke();
    circle(this.x, this.y, this.radius);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }
}
