// PR.js

import PVector from './PVector';
import PColor from './PColor';
import PImage from './PImage';
import * as Utils from './Utils';
import { extractRGBA2, extractXYWH, currentContext, canvasContext, ensureContext } from './Internal';

// Constants

export enum BoundingMode {
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

export enum StrokeMode {
  Round,
  Square,
  Project,
  Miter,
  Bevel
}

export enum TextStyle {
  Normal,
  Italic,
  Bold,
  ItalicBold
}

export const RADIUS = BoundingMode.Radius;
export const CENTER = BoundingMode.Center;
export const CORNER = BoundingMode.Corner;
export const CORNERS = BoundingMode.Corners;

export const OPEN = ArcMode.Open;
export const CHORD = ArcMode.Chord;
export const PIE = ArcMode.Pie;

export const ROUND = StrokeMode.Round;
export const SQUARE = StrokeMode.Square;
export const PROJECT = StrokeMode.Project;
export const MITER = StrokeMode.Miter;
export const BEVEL = StrokeMode.Bevel;

export const NORMAL = TextStyle.Normal;
export const ITALIC = TextStyle.Italic;
export const BOLD = TextStyle.Bold;
export const ITALICBOLD = TextStyle.ItalicBold;

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

export function noSmooth() {
  canvasContext().webkitImageSmoothingEnabled = false;
  canvasContext().mozImageSmoothingEnabled = false;
  canvasContext().imageSmoothingEnabled = false;
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

export function fill(...args: any[]) {
  const [r, g, b, a] = extractRGBA2(args);
  canvasContext().fillStyle = Utils.rgba(r, g, b, a);
}

export function stroke(...args: any[]) {
  const [r, g, b, a] = extractRGBA2(args);
  canvasContext().strokeStyle = Utils.rgba(r, g, b, a);
}

export function strokeWeight(w: number) {
  canvasContext().lineWidth = w;
}

export function strokeCap(cap: StrokeMode) {
  canvasContext().lineCap = cap === StrokeMode.Round ? 'round' :
                            cap === StrokeMode.Square ? 'butt' :
                            cap === StrokeMode.Project ? 'square' : null;
}

export function strokeJoin(join: StrokeMode) {
  canvasContext().lineJoin = join === StrokeMode.Miter ? 'miter' :
                             join === StrokeMode.Bevel ? 'bevel' :
                             join === StrokeMode.Round ? 'round' : null;
}

export function textFont(which: string, size: number, style?: string) {
  currentContext()._fontFamily = which;
  currentContext()._fontSize = size;
  currentContext()._fontStyle = style;
  canvasContext().font = style ? `${style} ${size}px ${which}` : `${size}px ${which}`;
}

export function textSize(size: number) {
  currentContext()._fontSize = size;
  textFont(currentContext()._fontFamily, currentContext()._fontSize, currentContext()._fontStyle);
}

export function textStyle(style: TextStyle) {
  currentContext()._fontStyle = style === TextStyle.Italic ? 'italic' :
                                style === TextStyle.Bold ? 'bold' :
                                style === TextStyle.ItalicBold ? 'italic bold' : null;
  textFont(currentContext()._fontFamily, currentContext()._fontSize, currentContext()._fontStyle);
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

export function ellipseMode(mode: BoundingMode) {
  currentContext()._ellipseMode = mode;
}

export function rectMode(mode: BoundingMode) {
  currentContext()._rectMode = mode;
}

export function imageMode(mode: BoundingMode) {
  currentContext()._imageMode = mode;
}

// Draw

export function arc(x: number, y: number, w: number, h: number, start: number, end: number, mode = OPEN) {
  canvasContext().beginPath();
  canvasContext().ellipse(x, y, w / 2, h / 2, 0, start, end, false);
  if (mode === CHORD) {
    canvasContext().closePath();
  } else if (mode === PIE) {
    canvasContext().lineTo(x, y);
    canvasContext().closePath();
  }
  canvasContext().fill();
  canvasContext().stroke();
}

export function ellipse(...args: number[]) {
  const b = extractXYWH(args, currentContext()._ellipseMode);
  canvasContext().beginPath();
  canvasContext().ellipse(b.center.x, b.center.y, b.radiusX, b.radiusY, 0, 0, TWO_PI);
  canvasContext().fill();
  canvasContext().stroke();
}

export function circle(x: number, y: number, r: number) {
  canvasContext().beginPath();
  canvasContext().arc(x, y, r, 0, TWO_PI);
  canvasContext().fill();
  canvasContext().stroke();
}

export function point(x: number, y: number) {
  canvasContext().strokeRect(x, y, 1, 1);
}

export function rect(...args: number[]) {
  const b = extractXYWH(args, currentContext()._rectMode);
  canvasContext().fillRect(b.topLeft.x, b.topLeft.y, b.width, b.height);
  canvasContext().strokeRect(b.topLeft.x, b.topLeft.y, b.width, b.height);
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

export function quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  endShape();
}

export function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
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
  const prContext = currentContext();
  prContext._pauseDraw = true;

  const pimage = new PImage();
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const promise = new Promise<PImage>((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      pimage._imageData = context.getImageData(0, 0, img.width, img.height);
      ensureContext(() => resolve(pimage), prContext)();
      prContext._pauseDraw = false; // NOTE: currentContext() will return wrong result here
    };
  });

  img.src = filename;
  return promise;
}

export function createImage(width: number, height: number) {
  const pimage = new PImage();
  pimage._imageData = canvasContext().createImageData(width, height);
  return pimage;
}

export function image(img: PImage, x: number, y: number, w?: number, h?: number) {
  const w1 = w || img.width;
  const h1 = h || img.height;
  const b = extractXYWH([x, y, w1, h1], currentContext()._imageMode);
  canvasContext().putImageData(img._imageData, 0, 0, b.topLeft.x, b.topLeft.y, b.width, b.height);
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

export const abs = Math.abs;
export const floor = Math.floor;
export const ceil = Math.ceil;
export const round = Math.round;
export const pow = Math.pow;
export const sqrt = Math.sqrt;
export const log = Math.log;
export const exp = Math.exp;
export const min = Math.min;
export const max = Math.max;
export const sq = (x: number) => x * x;

export function radians(angle: number) {
  return (angle / 180) * PI;
}

export function random(a?: number | number[], b?: number) {
  const rand = Math.random();
  if (a === undefined && b === undefined) {
    return rand;
  } else if (a instanceof Array && b === undefined) {
    const arr = <number[]>a;
    const i = floor(rand * arr.length);
    return arr[i];
  }
  const min = b === undefined ? 0 : <number>a;
  const max = b === undefined ? <number>a : b;
  return min + (rand * (max - min));
}

export function lerp(start: number, stop: number, amt: number) {
  return start + amt * (stop - start);
}

export function map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
  return lerp(start2, stop2, (value - start1) / (stop1 - start1));
}

export function norm(value: number, start: number, stop: number) {
  return map(value, start, stop, 0, 1);
}

export function dist(...args: number[]) {
  if (args.length < 6) {
    args[5] = 0;
    args[4] = args[3];
    args[3] = args[2];
    args[2] = 0;
  }
  const [x1, y1, z1] = args.slice(0, 3);
  const v1 = new PVector(x1, y1, z1);
  const [x2, y2, z2] = args.slice(3, 6);
  const v2 = new PVector(x2, y2, z2);
  return v1.dist(v2);
}

export function mag(x: number, y: number, z = 0) {
  return dist(x, y, z, 0, 0, 0);
}

export function constrain(n: number, low: number, high: number) {
  return n > high ? high : n < low ? low : n;
}

export function color(...args: number[]) {
  return new PColor(args);
}

export function vector(x?: number, y?: number, z?: number) {
  return new PVector(x, y, z);
}

export function print(msg: any) {
  console.log(msg);
}
