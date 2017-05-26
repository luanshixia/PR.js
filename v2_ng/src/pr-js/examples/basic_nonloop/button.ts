// button.js

import PColor from '../../PColor';
import PVector from '../../PVector';

export default class Button {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.c0 = new PColor(200);
    this.isMouseOver = false;
  }

  isPointIn(x, y) {
    const x0 = this.x;
    const y0 = this.y;
    const v = new PVector(x - x0, y - y0);
    return v.mag() <= this.r;
  }
}
