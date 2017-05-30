// PRApp.js

import PRContext from './PRContext';
import * as Internal from './Internal';
import { size } from './PR';

export default class PRApp {

  id: string;
  metadata: PRAppMetadata;
  context: PRContext;

  constructor() {
    this.id = Internal.getBase62ShortID(10);
    this.metadata = new PRAppMetadata();
    this.context = new PRContext();
  }

  // Event

  mousePressed() {

  }

  mouseReleased() {

  }

  mouseMove() {

  }

  keyPressed() {

  }

  // Application

  setup() {

  }

  draw() {

  }

  launch(canvasSelector, loop = true) {
    const proj = this;
    const context = proj.context;
    const interval = 1000 / context.frameRate;
    const canvas = document.querySelector(canvasSelector);
    context.drawingContext = canvas.getContext('2d');
    Internal.contextDict()[proj.id] = context;
    Internal.currentContext(context);
    size(canvas.width, canvas.height);

    // register
    canvas.addEventListener('mousemove', (e) => {
      context.pmouseX = context.mouseX;
      context.pmouseY = context.mouseY;
      if (e.offsetX) {
        context.mouseX = e.offsetX;
        context.mouseY = e.offsetY;
      } else if (e.layerX) {
        context.mouseX = e.layerX;
        context.mouseY = e.layerY;
      }
    });
    canvas.addEventListener('keydown', (e) => {
      context.key = e.keyCode;
    });
    canvas.addEventListener('keyup', () => {
      context.key = null;
    });
    canvas.addEventListener('mousemove', proj.mouseMove.bind(proj)); // for non-loop apps
    canvas.addEventListener('mousedown', proj.mousePressed.bind(proj));
    canvas.addEventListener('mouseup', proj.mouseReleased.bind(proj));
    canvas.addEventListener('keypress', proj.keyPressed.bind(proj));

    // loop
    proj.setup();
    function render() {
      Internal.currentContext(context);
      proj.draw();
      context.frameCount += 1;
      setTimeout(render, interval);
    }
    if (loop) {
      render();
    } else {
      proj.draw();
    }
  }
}

class PRAppMetadata {
  name: string;
  description: string;
  author: string;
}
