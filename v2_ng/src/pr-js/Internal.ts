// Internal.js

import PRContext from './PRContext';
import PColor from './PColor';
import PVector from './PVector';
import { BoundingMode } from './PR';

const CURRENT_CONTEXT_KEY = '__pr_current_context__';
const CONTEXT_DICT_KEY = '__pr_context_dict__';

export class BoundingBox {
  center: PVector;
  radiusX: number;
  radiusY: number;

  constructor(cx: number, cy: number, rx: number, ry: number) {
    this.center = new PVector(cx, cy);
    this.radiusX = rx;
    this.radiusY = ry;
  }

  get topLeft() {
    return this.center.sub(new PVector(this.radiusX, this.radiusY));
  }

  get width() {
    return 2 * this.radiusX;
  }

  get height() {
    return 2 * this.radiusY;
  }
}

export function extractRGBA(args: number[]) {
  let [r, g, b, a] = args;
  if (args.length === 3) {
    a = 1;
  } else if (args.length === 2) {
    a = g; g = r; b = r;
  } else if (args.length === 1) {
    a = 1; g = r; b = r;
  }
  return [r, g, b, a];
}

export function extractRGBA2(args: any[]) {
  let [r, g, b, a] = args;
  if (args.length === 3) {
    a = 1;
  } else if (args.length === 2) {
    if (r instanceof PColor) {
      const c = <PColor>r;
      a = g; g = r.green; b = r.blue; r = r.red;
    } else { // number
      a = g; g = r; b = r;
    }
  } else if (args.length === 1) {
    a = 1; g = r; b = r;
  }
  return [r, g, b, a];
}

export function extractXYWH(args: number[], mode: BoundingMode): BoundingBox {
  let [x, y, w, h] = args;
  if (args.length === 3) {
    h = w;
  }
  let cx, cy, rx, ry: number;
  if (mode === BoundingMode.Radius) {
    cx = x;
    cy = y;
    rx = w;
    ry = h;
  } else if (mode === BoundingMode.Center) {
    cx = x;
    cy = y;
    rx = w / 2;
    ry = h / 2;
  } else if (mode === BoundingMode.Corner) {
    cx = x + w / 2;
    cy = y + h / 2;
    rx = w / 2;
    ry = h / 2;
  } else if (mode === BoundingMode.Corners) {
    cx = (x + w) / 2;
    cy = (y + h) / 2;
    rx = Math.abs(x - w) / 2;
    ry = Math.abs(y - h) / 2;
  }
  return new BoundingBox(cx, cy, rx, ry);
}

export function contextDict() {
  if (!window.hasOwnProperty(CONTEXT_DICT_KEY)) {
    window[CONTEXT_DICT_KEY] = {};
  }
  return window[CONTEXT_DICT_KEY];
}

export function currentContext(ctx?: PRContext): PRContext {
  if (ctx) {
    window[CURRENT_CONTEXT_KEY] = ctx;
  }
  return window[CURRENT_CONTEXT_KEY];
}

export function canvasContext() {
  return currentContext().drawingContext;
}

export function getBase62ShortID(length: number) {
  const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const chars = [];
  for (let i = 0; i < length; i += 1) {
    chars.push(base62Chars[Math.floor(Math.random() * 62)]);
  }
  return chars.join('');
}

export function ensureContext(action: () => void, context: PRContext) {
  return () => {
    currentContext(context);
    action();
  };
}
