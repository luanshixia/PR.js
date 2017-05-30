// app.js

import Button from './button';
import PColor from '../../PColor';
import PRApp from '../../PRApp';
import { noStroke, clear, fill, text } from '../../PR';

export default class App extends PRApp {

  buttons: Button[];

  setup() {
    noStroke();
    this.buttons = [];
    this.buttons.push(new Button(200, 200, 100, new PColor(255, 0, 0)));
    this.buttons.push(new Button(400, 200, 100, new PColor(255, 255, 0)));
  }

  draw() {
    clear();
    this.buttons.forEach((b) => {
      b.draw();
    });
    fill(0);
    text(this.context.frameCount.toString(), 30, 30);
    this.context.frameCount += 1;
  }

  mouseMove() {
    this.buttons.forEach((b) => {
      b.isMouseOver = b.isPointIn(this.context.mouseX, this.context.mouseY);
    });
    this.draw();
  }
}
