// emind.js

export const hMargin = 100;
export const vMargin = 10;
export const cornerRadius = 5;
export const cpOffset = 50;
export const mapPadding = 100;
export const textHeight = 15;
export const nodePadding = 10;

export const nodeClass = 'emind-node';
export const linkClass = 'emind-link';
export const textClass = 'emind-text';

export function getBase62ShortID(length: number) {
  const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const chars = [];
  for (let i = 0; i < length; i += 1) {
    chars.push(base62Chars[Math.floor(Math.random() * 62)]);
  }
  return chars.join('');
}

export class Node {
  content: string;
  parent: Node;
  children: Node[];

  width: number;
  height: number;
  totalHeight: number;
  left: number;
  top: number;

  id: string;
  linkId: string;
  textId: string;

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  static fromSpecObject(specObject: any) {
    const node = new Node(specObject.content, ...(specObject.children || []).map(child => Node.fromSpecObject(child)));
    node.updateAllRecursively();
    return node;
  }

  static fromSpecString(spec: string) {
    const specObject = JSON.parse(spec);
    return Node.fromSpecObject(specObject);
  }

  constructor(content: string, ...children: Node[]) {
    this.content = content;
    this.children = [];
    children.forEach(node => this.addChild(node));

    this.id = getBase62ShortID(8);
    this.linkId = this.id + '-link';
    this.textId = this.id + '-text';
  }

  toSpecObject() {
    return {
      content: this.content,
      children: this.children.length ? this.children.map(node => node.toSpecObject()) : undefined
    }
  }

  toSpecString() {
    return JSON.stringify(this.toSpecObject());
  }

  toDebugString() {
    return `Content=${this.content}|Width=${this.width}|Height=${this.height}|TotalHeight=${this.totalHeight}|Left=${this.left}|Top=${this.top}`;
  }

  toSvgString() {
    let link = '';
    if (!this.isRoot()) {
      const [x0, y0] = [this.left, this.top + this.height / 2];
      const [x, y] = [this.parent.right, this.parent.top + this.parent.height / 2];
      const [x1, y1] = [this.left - cpOffset, this.top + this.height / 2 ];
      const [x2, y2] = [this.parent.right + cpOffset, this.parent.top + this.parent.height / 2];
      link = `<path id="${this.linkId}" class="${linkClass}" d="M${x0} ${y0} C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}" stroke="black" fill="transparent" />`;
    }

    return `<rect id="${this.id}" class="${nodeClass}" x="${this.left}" y="${this.top}" width="${this.width}" height="${this.height}" rx="${cornerRadius}" ry="${cornerRadius}" stroke="black" fill="transparent" /><text id="${this.textId}" class="${textClass}" x="${this.left + nodePadding}" y="${this.top + this.height / 2 + textHeight / 2}" text-anchor="left" font-size="${textHeight}">${this.content}</text>${link}`;
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
    this.width = 100;
  }

  updateHeight() {
    this.height = 30;
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
      this.left = this.parent.right + hMargin;
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
    if (this.children.length > 0) {
      let acumuTop = this.top + this.height / 2 - this.totalHeight / 2 + this.children[0].totalHeight / 2 - this.children[0].height / 2;

      for (let i = 0; i < this.children.length; i++) {
        const node = this.children[i];
        node.top = acumuTop;
        node.updateChildrenTopsRecursively();

        if (i < this.children.length - 1) {
          const next = this.children[i + 1];
          acumuTop += node.totalHeight / 2 + next.totalHeight / 2 + node.height / 2 - next.height / 2;
          acumuTop += vMargin;
        }
      }
    }
  }
}

export class MindMap {
  root: Node;

  static fromSpecString(spec: string) {
    return new MindMap(Node.fromSpecString(spec));
  }

  constructor(root: Node) {
    this.root = root;
  }

  toSpecString() {
    return this.root.toSpecString();
  }

  toSvgString() {
    let content = '';
    this.root.walk((node: Node) => content += node.toSvgString());

    let [left, top, right, bottom] = this.getBoundingBox();
    [left, top, right, bottom] = [left - mapPadding, top - mapPadding, right + mapPadding, bottom + mapPadding];

    return `<svg width="${right - left}" height="${bottom - top}" viewBox="${left} ${top} ${right - left} ${bottom - top}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  getBoundingBox() {
    let [left, top, right, bottom] = [this.root.left, this.root.top, this.root.right, this.root.bottom];
    this.root.walk((node: Node) => {
      left = Math.min(left, node.left);
      top = Math.min(top, node.top);
      right = Math.max(right, node.right);
      bottom = Math.max(bottom, node.bottom);
    });

    return [left, top, right, bottom];
  }
}
