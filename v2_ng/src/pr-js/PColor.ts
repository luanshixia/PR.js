// PColor.js

import { extractRGBA } from './Internal';

export default class PColor {

  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(args: number[]) {
    const [r, g, b, a] = extractRGBA(args);

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
}
