// Utils.js

import { hex } from './Internal';

export function radians(angle: number) {
  return (angle / 180) * Math.PI;
}

export function random(min: number, max: number) {
  const rand = Math.random();
  return min + (rand * (max - min));
}

export function rgbaToHex(r: number, g: number, b: number, a: number) {
  if (a > 0 && a <= 1) {
    a = parseInt((a * 255).toFixed(0));
  }
  return '#' + hex(a) + hex(r) + hex(g) + hex(b);
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + hex(r) + hex(g) + hex(b);
}

export function rgba(r: number, g: number, b: number, a: number) {
  if (a > 1) {
    a = a / 255;
  }
  return `rgba(${r},${g},${b},${a})`;
}

export function rgb(r: number, g: number, b: number) {
  return `rgba(${r},${g},${b})`;
}
