// PColor.js

import { extractRgba } from './Internal';

export default class PColor {

  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(args: number[]) {
    const [r, g, b, a] = extractRgba(args);

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
}
