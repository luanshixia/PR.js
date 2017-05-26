// app.js

import Button from './button';
import PColor from '../../PColor';
import PRApp from '../../PRApp';

export default class App extends PRApp {
  setup() {
    this.noStroke();
    this.buttons = [];
    this.buttons.push(new Button(200, 200, 100, new PColor(255, 0, 0)));
    this.buttons.push(new Button(400, 200, 100, new PColor(255, 255, 0)));
  }

  draw() {
    this.clear();
    this.buttons.forEach((b) => {
      const c = b.isMouseOver ? b.c : b.c0;
      this.fill(c.red, c.green, c.blue, c.alpha);
      this.circle(b.x, b.y, b.r);
    });
    this.fill(0);
    this.text(this.frameCount.toString(), 30, 30);
    this.frameCount += 1;
  }

  mouseMove() {
    this.buttons.forEach((b) => {
      b.isMouseOver = b.isPointIn(this.mouseX, this.mouseY);
    });
    this.draw();
  }
}
