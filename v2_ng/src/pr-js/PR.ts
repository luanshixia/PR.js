// PR.js

import PVector from './PVector';
import PColor from './PColor';
import PImage from './PImage';
import * as Utils from './Utils';
import { extractRgba, currentContext, canvasContext } from './Internal';

// Constants

export enum EllipseRectMode {
  Radius,
  Center,
  Corner,
  Corners
}

export enum ArcMode {
  Open,
  Chord,
  Pie
}

export const RADIUS = EllipseRectMode.Radius;
export const CENTER = EllipseRectMode.Center;
export const CORNER = EllipseRectMode.Corner;
export const CORNERS = EllipseRectMode.Corners;

export const OPEN = ArcMode.Open;
export const CHORD = ArcMode.Chord;
export const PIE = ArcMode.Pie;

export const PI = Math.PI;
export const HALF_PI = Math.PI / 2;
export const QUARTER_PI = Math.PI / 4;
export const TWO_PI = Math.PI * 2;
export const TAU = TWO_PI;

// Setup

export function size(w: number, h: number) {
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

export function background(r: number, g = r, b = r) {
  translate(0, 0);
  rotate(0);
  scale(1, 1);

  canvasContext().save();
  canvasContext().fillStyle = Utils.rgb(r, g, b);
  canvasContext().fillRect(0, 0, currentContext().width, currentContext().height);
  canvasContext().restore();
}

export function fill(...args: number[]) {
  const [r, g, b, a] = extractRgba(args);
  canvasContext().fillStyle = Utils.rgba(r, g, b, a);
}

export function stroke(...args: number[]) {
  const [r, g, b, a] = extractRgba(args);
  canvasContext().strokeStyle = Utils.rgba(r, g, b, a);
}

export function strokeWeight(w: number) {
  canvasContext().lineWidth = w;
}

export function textFont(which: string, size: number) {
  canvasContext().font = `${size}px ${which}`;
}

export function translate(x: number, y: number) {
  canvasContext().translate(x - currentContext()._translateX, y - currentContext()._translateY);
  currentContext()._translateX = x;
  currentContext()._translateY = y;
}

export function rotate(angle: number) {
  canvasContext().rotate(angle - currentContext()._rotateAngle);
  currentContext()._rotateAngle = angle;
}

export function scale(x: number, y: number) {
  canvasContext().scale(x / currentContext()._scaleX, y / currentContext()._scaleY);
  currentContext()._scaleX = x;
  currentContext()._scaleY = y;
}

// Draw

export function arc(x: number, y: number, w: number, h: number, start: number, end: number, mode = OPEN) {
  canvasContext().beginPath();
  canvasContext().ellipse(x, y, w, h, 0, start, end, false);
  if (mode === CHORD) {
    canvasContext().closePath();
  } else if (mode === PIE) {
    canvasContext().lineTo(x, y);
    canvasContext().closePath();
  }
  canvasContext().fill();
  canvasContext().stroke();
}

export function ellipse(x: number, y: number, w: number, h: number) {
  canvasContext().beginPath();
  canvasContext().ellipse(x, y, w, h, 0, 0, TWO_PI);
  canvasContext().fill();
  canvasContext().stroke();
}

export function circle(x: number, y: number, r: number) {
  canvasContext().beginPath();
  canvasContext().arc(x, y, r, 0, TWO_PI, false);
  canvasContext().closePath();
  canvasContext().fill();
  canvasContext().stroke();
}

export function point(x: number, y: number) {
  canvasContext().strokeRect(x, y, 1, 1);
}

export function rect(x: number, y: number, w: number, h: number) {
  canvasContext().fillRect(x, y, w, h);
  canvasContext().strokeRect(x, y, w, h);
}

export function line(x1: number, y1: number, x2: number, y2: number) {
  canvasContext().beginPath();
  canvasContext().moveTo(x1, y1);
  canvasContext().lineTo(x2, y2);
  canvasContext().stroke();
}

export function lines(vs: PVector[], close: boolean) {
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

export function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  endShape();
}

export function triangle(x1, y1, x2, y2, x3, y3) {
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  endShape();
}

export function text(str: string, x: number, y: number) {
  canvasContext().fillText(str, x, y);
  canvasContext().strokeText(str, x, y);
}

export function beginShape() {
  currentContext()._vertices.length = 0;
}

export function vertex(x: number, y: number) {
  currentContext()._vertices.push(new PVector(x, y));
}

export function endShape() {
  lines(currentContext()._vertices, true);
}

// Image

export function loadImage(filename: string) {
  const img = document.createElement('img');
  img.src = filename;
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  const pimage = new PImage();
  pimage._imageData = context.getImageData(0, 0, img.width, img.height);
  return pimage;
}

export function createImage(width: number, height: number) {
  const pimage = new PImage();
  pimage._imageData = canvasContext().createImageData(width, height);
  return pimage;
}

export function image(img: PImage, x: number, y: number, w?: number, h?: number) {
  const w1 = w || img._imageData.width;
  const h1 = h || img._imageData.height;
  canvasContext().putImageData(img._imageData, 0, 0, x, y, w1, h1);
}

export function get(x: number, y: number, w?: number, h?: number) {
  const pimage = new PImage();
  const w1 = w || 1;
  const h1 = h || 1;
  pimage._imageData = canvasContext().getImageData(x, y, w1, h1);
  if (!w || !h) {
    return pimage.get(0, 0);
  }
  return pimage;
}

export function set(x: number, y: number, c: PColor | PImage) {
  if (c instanceof PImage) {
    image(c, x, y);
  } else if (c instanceof PColor) {
    canvasContext().save();
    canvasContext().fillStyle = Utils.rgba(c.red, c.green, c.blue, c.alpha);
    canvasContext().fillRect(x, y, 1, 1);
    canvasContext().restore();
  }
}

// Utils

export function radians(angle: number) {
  return (angle / 180) * PI;
}

export function random(min: number, max: number) {
  const rand = Math.random();
  return min + (rand * (max - min));
}

export function color(...args: number[]) {
  return new PColor(args);
}
