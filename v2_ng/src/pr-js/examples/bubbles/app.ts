// app.js

import PRApp from '../../PRApp';
import { size, noStroke, smooth, random, background, fill, circle, text } from '../../PR';

const Bubbles = {
  width: 640,
  height: 360,
  numBalls: 20,
  spring: 0.05,
  gravity: 0.15,
  modular: 80,
}

export default class App extends PRApp {

  time: Date;
  balls: Ball[];

  constructor() {
    super();
    this.balls = [];
  }

  setup() {
    size(Bubbles.width, Bubbles.height);
    noStroke();
    smooth();
    for (let i = 0; i < Bubbles.numBalls; i++) {
      this.balls[i] = new Ball(random(0, Bubbles.width), random(0, Bubbles.height), random(Bubbles.modular / 2, Bubbles.modular), i, this.balls);
    }
    this.time = new Date();
  }

  draw() {
    background(255, 255, 0);
    fill(0, 0, 0, 0.8);
    for (let i = 0; i < Bubbles.numBalls; i++) {
      const ball = this.balls[i];
      ball.collide();
      ball.move();
      circle(ball.x, ball.y, ball.diameter / 2);
    }
    const time = new Date();
    const elapsed = time.valueOf() - this.time.valueOf();
    var fps = 1000 / elapsed;
    text("FPS: " + fps.toFixed(2), 20, 20);
    this.time = time;
  }
}

class Ball {

  vx: number;
  vy: number;
  x: number;
  y: number;
  diameter: number;
  id: number;
  others: Ball[];

  constructor(x, y, diameter, id, others) {
    this.vx = 0;
    this.vy = 0;
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.id = id;
    this.others = others;
  }

  collide() {
    const others = this.others;
    for (let i = this.id + 1; i < Bubbles.numBalls; i++) {
      const dx = others[i].x - this.x;
      const dy = others[i].y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const targetX = this.x + Math.cos(angle) * minDist;
        const targetY = this.y + Math.sin(angle) * minDist;
        const ax = (targetX - others[i].x) * Bubbles.spring;
        const ay = (targetY - others[i].y) * Bubbles.spring;
        this.vx -= ax;
        this.vy -= ay;
        others[i].vx += ax;
        others[i].vy += ay;
      }
    }
  }

  move() {
    const width = Bubbles.width;
    const height = Bubbles.height;
    const diameter = this.diameter;

    this.vy += Bubbles.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + diameter / 2 > width) {
      this.x = width - diameter / 2;
      this.vx *= -0.9;
    } else if (this.x - diameter / 2 < 0) {
      this.x = diameter / 2;
      this.vx *= -0.9;
    }
    if (this.y + diameter / 2 > height) {
      this.y = height - diameter / 2;
      this.vy *= -0.9;
    } else if (this.y - diameter / 2 < 0) {
      this.y = diameter / 2;
      this.vy *= -0.9;
    }
  }
}
