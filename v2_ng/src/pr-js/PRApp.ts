// PRApp.js

import PVector from './PVector';
import * as Utils from './Utils';
import { extractRgba } from './Internal';

export default class PRApp {

  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  frameRate: number;
  frameCount: number;
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
  key: string;

  _translateX: number;
  _translateY: number;
  _rotateAngle: number;
  _scaleX: number;
  _scaleY: number;
  _vertices: PVector[];

  constructor() {
    this.width = 300;
    this.height = 300;
    this.context = null;
    this.frameRate = 30;
    this.frameCount = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.key = null;

    this._translateX = 0;
    this._translateY = 0;
    this._rotateAngle = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._vertices = [];
  }

  size(w, h) {
    this.width = w;
    this.height = h;
  }

  noStroke() {
    this.context.strokeStyle = 'rgba(0,0,0,0)';
  }

  noFill() {
    this.context.fillStyle = 'rgba(0,0,0,0)';
  }

  smooth() {
    this.context.webkitImageSmoothingEnabled = true;
    this.context.mozImageSmoothingEnabled = true;
    this.context.imageSmoothingEnabled = true;
  }

  clear() {
    this.translate(0, 0);
    this.rotate(0);
    this.scale(1, 1);
    this.context.clearRect(0, 0, this.width, this.height);
  }

  background(r, g = r, b = r) {
    this.translate(0, 0);
    this.rotate(0);
    this.scale(1, 1);

    this.context.save();
    this.context.fillStyle = Utils.rgb(r, g, b);
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  fill(...args) {
    const [r, g, b, a] = extractRgba(args);
    this.context.fillStyle = Utils.rgba(r, g, b, a);
  }

  stroke(...args) {
    const [r, g, b, a] = extractRgba(args);
    this.context.strokeStyle = Utils.rgba(r, g, b, a);
  }

  strokeWeight(w) {
    this.context.lineWidth = w;
  }

  textFont(which, size) {
    this.context.font = `${size}px ${which}`;
  }

  translate(x, y) {
    this.context.translate(x - this._translateX, y - this._translateY);
    this._translateX = x;
    this._translateY = y;
  }

  rotate(angle) {
    this.context.rotate(angle - this._rotateAngle);
    this._rotateAngle = angle;
  }

  scale(x, y) {
    this.context.scale(x / this._scaleX, y / this._scaleY);
    this._scaleX = x;
    this._scaleY = y;
  }

  // Draw

  circle(x, y, r) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }

  rect(x, y, w, h) {
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);
  }

  line(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  lines(vs, close) {
    this.context.beginPath();
    this.context.moveTo(vs[0].x, vs[0].y);
    for (let i = 1; i < vs.length; i += 1) {
      this.context.lineTo(vs[i].x, vs[i].y);
    }
    if (close) {
      this.context.closePath();
    }
    this.context.fill();
    this.context.stroke();
  }

  text(str, x, y) {
    this.context.fillText(str, x, y);
    this.context.strokeText(str, x, y);
  }

  beginShape() {
    this._vertices = [];
  }

  vertex(x, y) {
    this._vertices.push(new PVector(x, y));
  }

  endShape() {
    this.lines(this._vertices, true);
  }

  // Image

  loadImage(filename) {

  }

  image(img, x, y, w, h) {

  }

  get(x, y, w, h) {

  }

  set(x, y, c) {

  }

  // Event

  mousePressed() {

  }

  mouseReleased() {

  }

  mouseMove() {

  }

  keyPressed() {

  }

  // Application

  setup() {

  }

  draw() {

  }

  launch(canvasSelector, loop = true) {
    const proj = this;
    const interval = 1000 / proj.frameRate;
    const canvas = document.querySelector(canvasSelector);
    proj.context = canvas.getContext('2d');
    proj.size(canvas.width, canvas.height);

    // register
    canvas.addEventListener('mousemove', (e) => {
      proj.pmouseX = proj.mouseX;
      proj.pmouseY = proj.mouseY;
      if (e.offsetX) {
        proj.mouseX = e.offsetX;
        proj.mouseY = e.offsetY;
      } else if (e.layerX) {
        proj.mouseX = e.layerX;
        proj.mouseY = e.layerY;
      }
    });
    canvas.addEventListener('keydown', (e) => {
      proj.key = e.keyCode;
    });
    canvas.addEventListener('keyup', () => {
      proj.key = null;
    });
    canvas.addEventListener('mousemove', proj.mouseMove); // for non-loop apps
    canvas.addEventListener('mousedown', proj.mousePressed);
    canvas.addEventListener('mouseup', proj.mouseReleased);
    canvas.addEventListener('keypress', proj.keyPressed);

    // loop
    proj.setup();
    function render() {
      proj.draw();
      proj.frameCount += 1;
      setTimeout(render, interval);
    }
    if (loop) {
      render();
    }
  }
}
