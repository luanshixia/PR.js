// Utils.js

import { hex } from './Internal';

export function radians(angle) {
  return (angle / 180) * Math.PI;
}

export function random(min, max) {
  const rand = Math.random();
  return min + (rand * (max - min));
}

export function rgbaToHex(r, g, b, a) {
  if (a > 0 && a <= 1) {
    a = parseInt((a * 255).toFixed(0));
  }
  return '#' + hex(a) + hex(r) + hex(g) + hex(b);
}

export function rgbToHex(r, g, b) {
  return '#' + hex(r) + hex(g) + hex(b);
}

export function rgba(r, g, b, a) {
  if (a > 1) {
    a = a / 255;
  }
  return `rgba(${r},${g},${b},${a})`;
}

export function rgb(r, g, b) {
  return `rgba(${r},${g},${b})`;
}
