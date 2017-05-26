// PColor.js

import { extractRgba } from './Internal';

export default class PColor {
  constructor(...args) {
    const [r, g, b, a] = extractRgba(args);

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
}
