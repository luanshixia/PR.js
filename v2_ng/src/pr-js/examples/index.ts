// index.js

import ButtonApp from './basic_nonloop/app';
import BubblesApp from './bubbles/app';
import ChainApp from './chain/app';

export default class Examples {
  button = new ButtonApp();
  bubbles = new BubblesApp();
  chain = new ChainApp();
}
