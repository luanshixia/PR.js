// index.js

import ButtonApp from './basic_nonloop/app';
import BubblesApp from './bubbles/app';
import ChainApp from './chain/app';
import MorphApp from './morph/app';
import PointillismApp from './pointillism/app';
import ShapeApp from './basic_shape/app';

export default class Examples {
  button = new ButtonApp();
  bubbles = new BubblesApp();
  chain = new ChainApp();
  morph = new MorphApp();
  pointillism = new PointillismApp();
  shape = new ShapeApp();
}
