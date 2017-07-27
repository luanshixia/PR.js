// comp.js

export enum TagRenderMode {
  normal,
  selfClosing
}

export interface IComp {
  parent: IComp;
  toHtml();
}

export interface IHtmlOptions {
  tagName: string;
  attributes: any;
  classNames: string[];
  children: any[];
  renderMode?: TagRenderMode;
}

export class Comp<T> implements IComp {
  id: string;
  options: T;

  tagName: string;
  attributes: any;
  classNames: string[];
  children: IComp[];
  content: string;
  parent: IComp;
  renderMode: TagRenderMode;

  constructor(options: T) {
    this.id = this._generateId(8);
    this.options = options;
    this.init();
  }

  _generateId(length: number) {
    const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const chars = [];
    for (let i = 0; i < length; i += 1) {
      chars.push(base62Chars[Math.floor(Math.random() * 62)]);
    }
    return chars.join('');
  }

  appendChild(child: IComp) {
    child.parent = this;
    if (!this.children) {
      this.children = [];
    }
    this.children.push(child);
  }

  compose(tagName: string, attributes: any, classNames: string[], ...children: any[]) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.classNames = classNames;
    if (children.length === 1 && typeof children[0] === 'string') {
      this.content = children[0];
    } else {
      this.children = children;
      this.children.forEach(child => child.parent = this);
    }
  }

  init() {
    this.tagName = 'div';
    this.attributes = {}
    this.classNames = [];
    this.children = [];
  }

  toHtml() {
    if (this.renderMode === TagRenderMode.selfClosing) {
      return `<${this.tagName} comp-id="${this.id}" class="${this.classNames.join(' ')}" ${Object.keys(this.attributes).map(key => key + '="' + this.attributes[key] + '"').join(' ')} />`;
    }

    const content = this.content || this.children.map(child => child.toHtml()).join('');

    return `<${this.tagName} comp-id="${this.id}" class="${this.classNames.join(' ')}" ${Object.keys(this.attributes).map(key => key + '="' + this.attributes[key] + '"').join(' ')}>${content}</${this.tagName}>`;
  }

  update(options: any) {
    Object.assign(this.options, options);
    this.init();

    const old = document.querySelector(`[comp-id=${this.id}]`);
    old.insertAdjacentHTML('beforebegin', this.toHtml());
    old.remove();
  }
}

export class SystemComp extends Comp<IHtmlOptions> {
  init() {
    super.init();
    this.compose(
      this.options.tagName,
      this.options.attributes,
      this.options.classNames,
      this.options.children
    );
    this.options.renderMode && (this.renderMode = this.options.renderMode);
  }
}

export function element(tagName: string, attributes: any, classNames: string[], ...children: any[]) {
  return new SystemComp({
    tagName,
    attributes,
    classNames,
    children,
    renderMode: TagRenderMode.normal
  });
}

export function selfClosingElement(tagName: string, attributes: any, classNames: string[]) {
  return new SystemComp({
    tagName,
    attributes,
    classNames,
    children: [],
    renderMode: TagRenderMode.selfClosing
  });
}

function generateContainerFactory(tagName: string) {
  return (attributes: any, classNames: string[], ...children: any[]) =>
    element(tagName, attributes, classNames, children);
}

export const div = generateContainerFactory('div');
export const span = generateContainerFactory('span');
export const ul = generateContainerFactory('ul');
export const ol = generateContainerFactory('ol');
export const li = generateContainerFactory('li');
export const section = generateContainerFactory('section');
export const article = generateContainerFactory('article');
export const header = generateContainerFactory('header');
export const footer = generateContainerFactory('footer');
export const aside = generateContainerFactory('aside');
export const h1 = generateContainerFactory('h1');
export const h2 = generateContainerFactory('h2');
export const h3 = generateContainerFactory('h3');
export const h4 = generateContainerFactory('h4');
export const h5 = generateContainerFactory('h5');
export const h6 = generateContainerFactory('h6');

export class UserComp<T> extends Comp<T> {
  init() {
    super.init();
    this.tagName = "div";
    this.renderMode = TagRenderMode.normal;
  }
}

export class Test extends UserComp<any> {
  init() {
    this.compose('div', {}, [],
      span({}, [], this.options.title),
      span({}, [], this.options.description)
    );
  }
}
