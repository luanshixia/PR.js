// app.ts

import PRApp from '../../PRApp';
import PImage from '../../PImage';
import { loadImage, size, noStroke, background, map, floor, random, fill, ellipse } from '../../PR';

/**
 * Pointillism.
 *
 * By Dan Shiffman. Mouse horizontal location controls size of dots.
 * Creates a simple pointillist effect using ellipses colored according to pixels in an image.
 */
export default class App extends PRApp {

  img: PImage;
  smallPoint: number;
  largePoint: number;

  setup() {
    loadImage('assets/moonwalk.png').then(pimage => {
      this.img = pimage;
      size(720, 400);
      this.smallPoint = 4;
      this.largePoint = 40;
      noStroke();
      background(255);
      this.img.loadPixels();
    });
  }

  draw() {
    const pointillize = map(this.context.mouseX, 0, this.context.width, this.smallPoint, this.largePoint);
    const x = floor(random(this.img.width));
    const y = floor(random(this.img.height));
    const pix = this.img.get(x, y);
    fill(pix, 128);
    ellipse(x, y, pointillize, pointillize);
  }
}
