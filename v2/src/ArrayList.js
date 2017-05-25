// ArrayList.js

/**
 * The ArrayList class
 */
export default class ArrayList extends Array {
  /**
   * The constructor of ArrayList
   */
  constructor(...args) {
    super();

    args.forEach(arg => this.push(arg));
  }

  add(item) {
    this.push(item);
  }

  clear() {
    this.length = 0;
  }

  removeAt(i) {
    this.splice(i, 1);
  }

  remove(item) {
    const i = this.indexOf(item);
    this.splice(i, 1);
  }

  size() {
    return this.length;
  }

  get(i) {
    return this[i];
  }

  set(i, item) {
    this[i] = item;
  }
}
