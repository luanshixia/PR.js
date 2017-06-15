// PRContext.js

import PVector from './PVector';

export default class PRContext {
  width: number;
  height: number;
  drawingContext: CanvasRenderingContext2D;
  frameRate: number;
  frameCount: number;
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
  key: string;

  _translateX: number;
  _translateY: number;
  _rotateAngle: number;
  _scaleX: number;
  _scaleY: number;
  _vertices: PVector[];
  _pauseDraw: boolean;
  _ellipseMode: string;
  _imageMode: string;

  constructor() {
    this.width = 300;
    this.height = 300;
    this.drawingContext = null;
    this.frameRate = 30;
    this.frameCount = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.key = null;

    this._translateX = 0;
    this._translateY = 0;
    this._rotateAngle = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._vertices = [];
  }
}
