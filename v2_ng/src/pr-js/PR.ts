// PR.js

import PVector from './PVector';
import * as Utils from './Utils';
import { extractRgba, currentContext, canvasContext } from './Internal';

export function size(w, h) {
  currentContext().width = w;
  currentContext().height = h;
}

export function noStroke() {
  canvasContext().strokeStyle = 'rgba(0,0,0,0)';
}

export function noFill() {
  canvasContext().fillStyle = 'rgba(0,0,0,0)';
}

export function smooth() {
  canvasContext().webkitImageSmoothingEnabled = true;
  canvasContext().mozImageSmoothingEnabled = true;
  canvasContext().imageSmoothingEnabled = true;
}

export function clear() {
  translate(0, 0);
  rotate(0);
  scale(1, 1);
  canvasContext().clearRect(0, 0, currentContext().width, currentContext().height);
}

export function background(r, g = r, b = r) {
  translate(0, 0);
  rotate(0);
  scale(1, 1);

  canvasContext().save();
  canvasContext().fillStyle = Utils.rgb(r, g, b);
  canvasContext().fillRect(0, 0, currentContext().width, currentContext().height);
  canvasContext().restore();
}

export function fill(...args) {
  const [r, g, b, a] = extractRgba(args);
  canvasContext().fillStyle = Utils.rgba(r, g, b, a);
}

export function stroke(...args) {
  const [r, g, b, a] = extractRgba(args);
  canvasContext().strokeStyle = Utils.rgba(r, g, b, a);
}

export function strokeWeight(w) {
  canvasContext().lineWidth = w;
}

export function textFont(which, size) {
  canvasContext().font = `${size}px ${which}`;
}

export function translate(x, y) {
  canvasContext().translate(x - currentContext()._translateX, y - currentContext()._translateY);
  currentContext()._translateX = x;
  currentContext()._translateY = y;
}

export function rotate(angle) {
  canvasContext().rotate(angle - currentContext()._rotateAngle);
  currentContext()._rotateAngle = angle;
}

export function scale(x, y) {
  canvasContext().scale(x / currentContext()._scaleX, y / currentContext()._scaleY);
  currentContext()._scaleX = x;
  currentContext()._scaleY = y;
}

// Draw

export function circle(x, y, r) {
  canvasContext().beginPath();
  canvasContext().arc(x, y, r, 0, 2 * Math.PI, false);
  canvasContext().closePath();
  canvasContext().fill();
  canvasContext().stroke();
}

export function rect(x, y, w, h) {
  canvasContext().fillRect(x, y, w, h);
  canvasContext().strokeRect(x, y, w, h);
}

export function line(x1, y1, x2, y2) {
  canvasContext().beginPath();
  canvasContext().moveTo(x1, y1);
  canvasContext().lineTo(x2, y2);
  canvasContext().stroke();
}

export function lines(vs, close) {
  canvasContext().beginPath();
  canvasContext().moveTo(vs[0].x, vs[0].y);
  for (let i = 1; i < vs.length; i += 1) {
    canvasContext().lineTo(vs[i].x, vs[i].y);
  }
  if (close) {
    canvasContext().closePath();
  }
  canvasContext().fill();
  canvasContext().stroke();
}

export function text(str, x, y) {
  canvasContext().fillText(str, x, y);
  canvasContext().strokeText(str, x, y);
}

export function beginShape() {
  currentContext()._vertices = [];
}

export function vertex(x, y) {
  currentContext()._vertices.push(new PVector(x, y));
}

export function endShape() {
  lines(this._vertices, true);
}

// Image

export function loadImage(filename) {

}

export function image(img, x, y, w, h) {

}

export function get(x, y, w, h) {

}

export function set(x, y, c) {

}
