// Internal.js

import PRContext from './PRContext';
import PColor from './PColor';

const CURRENT_CONTEXT_KEY = '__pr_current_context__';
const CONTEXT_DICT_KEY = '__pr_context_dict__';

export function extractRgba(args: number[]) {
  let [r, g, b, a] = args;
  if (args.length === 3) {
    a = 1;
  } else if (args.length === 2) {
    a = g; g = r; b = r;
  } else if (args.length === 1) {
    a = 1; g = r; b = r;
  }
  return [r, g, b, a];
}

export function extractRgba2(args: any[]) {
  let [r, g, b, a] = args;
  if (args.length === 3) {
    a = 1;
  } else if (args.length === 2) {
    if (r instanceof PColor) {
      const c = <PColor>r;
      a = g; g = r.green; b = r.blue; r = r.red;
    } else { // number
      a = g; g = r; b = r;
    }
  } else if (args.length === 1) {
    a = 1; g = r; b = r;
  }
  return [r, g, b, a];
}

export function contextDict() {
  if (!window.hasOwnProperty(CONTEXT_DICT_KEY)) {
    window[CONTEXT_DICT_KEY] = {};
  }
  return window[CONTEXT_DICT_KEY];
}

export function currentContext(ctx?: PRContext): PRContext {
  if (ctx) {
    window[CURRENT_CONTEXT_KEY] = ctx;
  }
  return window[CURRENT_CONTEXT_KEY];
}

export function canvasContext() {
  return currentContext().drawingContext;
}

export function getBase62ShortID(length: number) {
  const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const chars = [];
  for (let i = 0; i < length; i += 1) {
    chars.push(base62Chars[Math.floor(Math.random() * 62)]);
  }
  return chars.join('');
}

export function ensureContext(action: () => void, context: PRContext) {
  return () => {
    currentContext(context);
    action();
  };
}
