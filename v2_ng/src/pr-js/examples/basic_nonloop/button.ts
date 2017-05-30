// button.js

import PColor from '../../PColor';
import PVector from '../../PVector';
import { fill, circle } from '../../PR';

export default class Button {

  x: number;
  y: number;
  r: number;
  c: PColor;
  c0: PColor
  isMouseOver: boolean;

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

  draw() {
    const c = this.isMouseOver ? this.c : this.c0;
    fill(c.red, c.green, c.blue, c.alpha);
    circle(this.x, this.y, this.r);
  }
}
