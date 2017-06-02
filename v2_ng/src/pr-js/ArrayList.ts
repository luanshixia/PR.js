// ArrayList.js

/**
 * The ArrayList class
 */
export default class ArrayList {

  private _array = [];

  /**
   * The constructor of ArrayList
   */
  constructor(...args) {
    args.forEach(arg => this._array.push(arg));
  }

  add(item) {
    this._array.push(item);
  }

  clear() {
    this._array.length = 0;
  }

  removeAt(i: number) {
    this._array.splice(i, 1);
  }

  remove(item) {
    const i = this._array.indexOf(item);
    this._array.splice(i, 1);
  }

  size() {
    return this._array.length;
  }

  get(i: number) {
    return this._array[i];
  }

  set(i: number, item) {
    this._array[i] = item;
  }
}
