// Utils.js

export function hex(c: number) {
  const h = c.toString(16);
  return h.length === 1 ? `0${h}` : h;
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
  return `rgb(${r},${g},${b})`;
}
