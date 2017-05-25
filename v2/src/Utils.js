// Utils.js

export function radians(angle) {
  return (angle / 180) * Math.PI;
}

export function random(min, max) {
  const rand = Math.random();
  return min + (rand * (max - min));
}

function _hex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? ('0' + hex) : hex;
}

export function rgbaToHex(r, g, b, a) {
  if (a > 0 && a <= 1) {
    a = parseInt((a * 255).toFixed(0));
  }
  return '#' + _hex(a) + _hex(r) + _hex(g) + _hex(b);
}

export function rgbToHex(r, g, b) {
  return '#' + _hex(r) + _hex(g) + _hex(b);
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
