// PImage.js

import PColor from './PColor';

export default class PImage {

  _imageData: ImageData;
  _canAccessPixels: boolean;

  get width() {
    return this._imageData.width;
  }

  get height() {
    return this._imageData.height;
  }

  loadPixels() {
    this._canAccessPixels = true;
  }

  updatePixels() {
    this._canAccessPixels = false;
  }

  resize(w, h) {

  }

  get(x: number, y: number) {
    const width = this._imageData.width;
    const height = this._imageData.height;
    const pos = 4 * (y * width + x);
    return new PColor(Array.from(this._imageData.data.slice(pos, pos + 4)));
  }

  set(x: number, y: number, c: PColor) {
    const width = this._imageData.width;
    const height = this._imageData.height;
    const pos = 4 * (y * width + x);
    this._imageData.data[pos] = c.red;
    this._imageData.data[pos + 1] = c.green;
    this._imageData.data[pos + 2] = c.blue;
    this._imageData.data[pos + 3] = c.alpha;
  }

  mask(img) {

  }

  filter() {

  }

  copy() {

  }

  blend() {

  }

  save() {

  }
}
