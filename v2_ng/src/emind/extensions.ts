// extensions.js

Object.assign(Array.prototype, {
  sum() {
    const self: any[] = this;
    return self.reduce((x, y) => x + y, 0);
  },

  pair(action: (x, y) => void) {
    const self: any[] = this;
    for (let i = 0; i < self.length - 1; i++) {
      action(self[i], self[i + 1]);
    }
  }
});
