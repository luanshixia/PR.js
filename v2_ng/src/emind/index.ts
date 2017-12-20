// emind.js

export const hMargin = 200;
export const vMargin = 50;

export class Node {
  content: string;
  parent: Node;
  children: Node[];

  width: number;
  height: number;
  totalHeight: number;
  left: number;
  top: number;

  constructor(content: string, ...children: Node[]) {
    this.content = content;
    this.children = [];
    children.forEach(node => this.addChild(node));
  }

  toDebugString() {
    return `Content=${this.content}|Width=${this.width}|Height=${this.height}|TotalHeight=${this.totalHeight}|Left=${this.left}|Top=${this.top}`;
  }

  isRoot() {
    return !this.parent;
  }

  isLeaf() {
    return this.children.length === 0;
  }

  addChild(node: Node) {
    node.parent = this;
    this.children.push(node);
  }

  walk(action: (Node) => void) {
    action(this);
    this.children.forEach(node => node.walk(action))
  }

  updateWidth() {
    this.width = 300;
  }

  updateHeight() {
    this.height = 80;
  }

  updateAllRecursively() {
    this.updateSizeRecursively();
    this.updateTotalHeightRecursively();
    this.updateLeftRecursively();
    this.updateTopRecursively();
  }

  updateSizeRecursively() {
    this.walk((node: Node) => {
      node.updateWidth();
      node.updateHeight();
    });
  }

  updateTotalHeightRecursively() {
    this.children.forEach(node => node.updateTotalHeightRecursively());
    if (this.isLeaf()) {
      this.totalHeight = this.height;
    } else {
      this.totalHeight = this.children.map(node => node.totalHeight).reduce((x, y) => x + y, 0) + vMargin * (this.children.length - 1);
    }
  }

  updateLeft() {
    if (this.isRoot()) {
      this.left = -this.width / 2;
    } else {
      this.left = this.parent.left + this.parent.width + hMargin;
    }
  }

  updateLeftRecursively() {
    this.walk((node: Node) => node.updateLeft());
  }

  updateTopRecursively() {
    if (this.isRoot()) {
      this.top = -this.height / 2;
      this.updateChildrenTopsRecursively();
    }
  }

  updateChildrenTopsRecursively() {
    let acumuTop = this.top - this.totalHeight / 2;

    for (const node of this.children) {
      node.top = acumuTop;
      node.updateChildrenTopsRecursively();
      acumuTop += node.totalHeight;
      acumuTop += vMargin;
    }
  }
}
