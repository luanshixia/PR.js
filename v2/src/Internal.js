// Internal.js

export function hex(c) {
  const h = c.toString(16);
  return h.length === 1 ? `0${h}` : h;
}

export function extractRgba(args) {
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
