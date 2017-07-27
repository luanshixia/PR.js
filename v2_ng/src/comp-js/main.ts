// comp.js

export function _(tagName: string, attributes: any, classNames: string[], ...children: any[]) {
  return `<${tagName} comp-id="" class="${classNames.join(' ')}" ${Object.keys(attributes).map(key => key + '="' + attributes[key] + '"').join(' ')}>${children.join('')}</${tagName}>`;
}

export function __(tagName: string, attributes: any, classNames: string[]) {
  return `<${tagName} comp-id="" class="${classNames.join(' ')}" ${Object.keys(attributes).map(key => key + '="' + attributes[key] + '"').join(' ')} />`;
}

export function input(type: string, attributes: any, classNames: string[], value: any) {
  attributes.type = type;
  attributes.value = value;
  return __('input', attributes, classNames);
}

export enum TagRenderMode {
  normal,
  selfClosing
}

export interface IComp {
  parent: IComp;
  toHtml();
}

export interface IHtmlState {
  tagName: string;
  attributes?: any;
  classNames?: string[];
  children?: IComp[];
  content?: string;
  renderMode?: TagRenderMode;
}

export class Comp<T> implements IComp {
  id: string;
  state: T;

  tagName: string;
  attributes: any;
  classNames: string[];
  children: IComp[];
  content: string;
  parent: IComp;
  renderMode: TagRenderMode;

  constructor(state: any) {
    this.id = this.generateId(8);
    this.state = state;
    this.init();
  }

  generateId(length: number) {
    const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const chars = [];
    for (let i = 0; i < length; i += 1) {
      chars.push(base62Chars[Math.floor(Math.random() * 62)]);
    }
    return chars.join('');
  }

  appendChild(child: IComp) {
    child.parent = this;
    this.children.push(child);
  }

  init() {
    // empty
  }

  toHtml() {
    if (this.renderMode === TagRenderMode.selfClosing) {
      return `<${this.tagName} comp-id="${this.id}" class="${this.classNames.join(' ')}" ${Object.keys(this.attributes).map(key => key + '="' + this.attributes[key] + '"').join(' ')} />`;
    }

    const content = this.content || this.children.map(child => child.toHtml()).join('');

    return `<${this.tagName} comp-id="${this.id}" class="${this.classNames.join(' ')}" ${Object.keys(this.attributes).map(key => key + '="' + this.attributes[key] + '"').join(' ')}>${content}</${this.tagName}>`;
  }

  update(state: any) {
    Object.assign(this.state, state);
    this.init();

    const old = document.querySelector(`[comp-id=${this.id}]`);
    old.insertAdjacentHTML('beforebegin', this.toHtml());
    old.remove();
  }
}

export class GenericElement extends Comp<IHtmlState> {
  init() {
    super.init();
    this.tagName = this.state.tagName;
    this.attributes = this.state.attributes;
    this.classNames = this.state.classNames;
    this.children = this.state.children;
    this.children.forEach(child => child.parent = this);
    this.content = this.state.content;
    this.renderMode = this.state.renderMode;
  }
}

export function element(tagName: string, attributes: any, classNames: string[], ...children: any[]) {
  if (children.length === 1 && typeof children[0] === 'string') {
    return new GenericElement({
      tagName,
      attributes,
      classNames,
      content: children[0],
      renderMode: TagRenderMode.normal
    });
  }
  return new GenericElement({
    tagName,
    attributes,
    classNames,
    children,
    renderMode: TagRenderMode.normal
  });
}

export function selfClosingElement(tagName: string, attributes: any, classNames: string[]) {
  return new GenericElement({
    tagName,
    attributes,
    classNames,
    renderMode: TagRenderMode.selfClosing
  });
}

export class Div extends GenericElement {
  init() {
    super.init();
    this.tagName = 'div';
    this.renderMode = TagRenderMode.normal;
  }
}

export class Span extends GenericElement {
  init() {
    super.init();
    this.tagName = 'span';
    this.renderMode = TagRenderMode.normal;
  }
}

export class Input extends GenericElement {
  init() {
    super.init();
    this.tagName = 'input';
    this.renderMode = TagRenderMode.selfClosing;
  }
}

function generateContainerElementFactory(constructor: typeof GenericElement) {
  return (attributes: any, classNames: string[], ...children: any[]) => {
    if (children.length === 1 && typeof children[0] === 'string') {
      return new constructor({
        attributes,
        classNames,
        content: children[0],
        renderMode: TagRenderMode.normal
      });
    }
    return new constructor({
      attributes,
      classNames,
      children,
      renderMode: TagRenderMode.normal
    });
  }
}

export const div = generateContainerElementFactory(Div);
export const span = generateContainerElementFactory(Span);

export class Test extends Comp<any> {
  init() {

  }
}
