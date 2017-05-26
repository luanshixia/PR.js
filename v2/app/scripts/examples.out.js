"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // ArrayList.js

/**
 * The ArrayList class
 */var
ArrayList = function (_Array) {_inherits(ArrayList, _Array);
  /**
                                                              * The constructor of ArrayList
                                                              */
  function ArrayList() {_classCallCheck(this, ArrayList);var _this = _possibleConstructorReturn(this, (ArrayList.__proto__ || Object.getPrototypeOf(ArrayList)).call(this));for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


    args.forEach(function (arg) {return _this.push(arg);});return _this;
  }_createClass(ArrayList, [{ key: "add", value: function add(

    item) {
      this.push(item);
    } }, { key: "clear", value: function clear()

    {
      this.length = 0;
    } }, { key: "removeAt", value: function removeAt(

    i) {
      this.splice(i, 1);
    } }, { key: "remove", value: function remove(

    item) {
      var i = this.indexOf(item);
      this.splice(i, 1);
    } }, { key: "size", value: function size()

    {
      return this.length;
    } }, { key: "get", value: function get(

    i) {
      return this[i];
    } }, { key: "set", value: function set(

    i, item) {
      this[i] = item;
    } }]);return ArrayList;}(Array);exports.default = ArrayList;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _button = require('./button');var _button2 = _interopRequireDefault(_button);
var _PColor = require('../../PColor');var _PColor2 = _interopRequireDefault(_PColor);
var _PRApp2 = require('../../PRApp');var _PRApp3 = _interopRequireDefault(_PRApp2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // app.js
var
App = function (_PRApp) {_inherits(App, _PRApp);function App() {_classCallCheck(this, App);return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));}_createClass(App, [{ key: 'setup', value: function setup()
    {
      this.noStroke();
      this.buttons = [];
      this.buttons.push(new _button2.default(200, 200, 100, new _PColor2.default(255, 0, 0)));
      this.buttons.push(new _button2.default(400, 200, 100, new _PColor2.default(255, 255, 0)));
    } }, { key: 'draw', value: function draw()

    {var _this2 = this;
      this.clear();
      this.buttons.forEach(function (b) {
        var c = b.isMouseOver ? b.c : b.c0;
        _this2.fill(c.red, c.green, c.blue, c.alpha);
        _this2.circle(b.x, b.y, b.r);
      });
      this.fill(0);
      this.text(this.frameCount.toString(), 30, 30);
      this.frameCount += 1;
    } }, { key: 'mouseMove', value: function mouseMove()

    {var _this3 = this;
      this.buttons.forEach(function (b) {
        b.isMouseOver = b.isPointIn(_this3.mouseX, _this3.mouseY);
      });
      this.draw();
    } }]);return App;}(_PRApp3.default);exports.default = App;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); // button.js

var _PColor = require('../../PColor');var _PColor2 = _interopRequireDefault(_PColor);
var _PVector = require('../../PVector');var _PVector2 = _interopRequireDefault(_PVector);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Button = function () {
  function Button(x, y, r, c) {_classCallCheck(this, Button);
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.c0 = new _PColor2.default(200);
    this.isMouseOver = false;
  }_createClass(Button, [{ key: 'isPointIn', value: function isPointIn(

    x, y) {
      var x0 = this.x;
      var y0 = this.y;
      var v = new _PVector2.default(x - x0, y - y0);
      return v.mag() <= this.r;
    } }]);return Button;}();exports.default = Button;
'use strict';var _app = require('./basic_nonloop/app');var _app2 = _interopRequireDefault(_app);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = new _app2.default();
app.launch('#lorem1-canvas', false);
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();exports.

hex = hex;exports.




extractRgba = extractRgba; // Internal.js
function hex(c) {var h = c.toString(16);return h.length === 1 ? "0" + h : h;}function extractRgba(args) {var _args = _slicedToArray(args, 4),r = _args[0],g = _args[1],b = _args[2],a = _args[3];
  if (args.length === 3) {
    a = 1;
  } else if (args.length === 2) {
    a = g;g = r;b = r;
  } else if (args.length === 1) {
    a = 1;g = r;b = r;
  }
  return [r, g, b, a];
}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

var _Internal = require('./Internal');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // PColor.js
var
PColor =
function PColor() {_classCallCheck(this, PColor);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}var _extractRgba =
  (0, _Internal.extractRgba)(args),_extractRgba2 = _slicedToArray(_extractRgba, 4),r = _extractRgba2[0],g = _extractRgba2[1],b = _extractRgba2[2],a = _extractRgba2[3];

  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
};exports.default = PColor;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); // PRApp.js

var _PVector = require('./PVector');var _PVector2 = _interopRequireDefault(_PVector);
var _Utils = require('./Utils');var Utils = _interopRequireWildcard(_Utils);
var _Internal = require('./Internal');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

PRApp = function () {

  function PRApp() {_classCallCheck(this, PRApp);
    this.width = 300;
    this.height = 300;
    this.context = null;
    this.frameRate = 30;
    this.frameCount = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.key = null;

    this._translateX = 0;
    this._translateY = 0;
    this._rotateAngle = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._vertices = [];
  }_createClass(PRApp, [{ key: 'size', value: function size(

    w, h) {
      this.width = w;
      this.height = h;
    } }, { key: 'noStroke', value: function noStroke()

    {
      this.context.strokeStyle = 'rgba(0,0,0,0)';
    } }, { key: 'noFill', value: function noFill()

    {
      this.context.fillStyle = 'rgba(0,0,0,0)';
    } }, { key: 'smooth', value: function smooth()

    {
      this.context.webkitImageSmoothingEnabled = true;
      this.context.mozImageSmoothingEnabled = true;
      this.context.msImageSmoothingEnabled = true;
    } }, { key: 'clear', value: function clear()

    {
      this.translate(0, 0);
      this.rotate(0);
      this.scale(1, 1);
      this.context.clearRect(0, 0, this.width, this.height);
    } }, { key: 'background', value: function background(

    r) {var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : r;var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : r;
      this.translate(0, 0);
      this.rotate(0);
      this.scale(1, 1);

      this.context.save();
      this.context.fillStyle = Utils.rgb(r, g, b);
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.restore();
    } }, { key: 'fill', value: function fill()

    {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}var _extractRgba =
      (0, _Internal.extractRgba)(args),_extractRgba2 = _slicedToArray(_extractRgba, 4),r = _extractRgba2[0],g = _extractRgba2[1],b = _extractRgba2[2],a = _extractRgba2[3];
      this.context.fillStyle = Utils.rgba(r, g, b, a);
    } }, { key: 'stroke', value: function stroke()

    {for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}var _extractRgba3 =
      (0, _Internal.extractRgba)(args),_extractRgba4 = _slicedToArray(_extractRgba3, 4),r = _extractRgba4[0],g = _extractRgba4[1],b = _extractRgba4[2],a = _extractRgba4[3];
      this.context.strokeStyle = Utils.rgba(r, g, b, a);
    } }, { key: 'strokeWeight', value: function strokeWeight(

    w) {
      this.context.lineWidth = w;
    } }, { key: 'textFont', value: function textFont(

    which, size) {
      this.context.font = size + 'px ' + which;
    } }, { key: 'translate', value: function translate(

    x, y) {
      this.context.translate(x - this._translateX, y - this._translateY);
      this._translateX = x;
      this._translateY = y;
    } }, { key: 'rotate', value: function rotate(

    angle) {
      this.context.rotate(angle - this._rotateAngle);
      this._rotateAngle = angle;
    } }, { key: 'scale', value: function scale(

    x, y) {
      this.context.scale(x / this._scaleX, y / this._scaleY);
      this._scaleX = x;
      this._scaleY = y;
    }

    // Draw
  }, { key: 'circle', value: function circle(
    x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2 * Math.PI, false);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    } }, { key: 'rect', value: function rect(

    x, y, w, h) {
      this.context.fillRect(x, y, w, h);
      this.context.strokeRect(x, y, w, h);
    } }, { key: 'line', value: function line(

    x1, y1, x2, y2) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    } }, { key: 'lines', value: function lines(

    vs, close) {
      this.context.beginPath();
      this.context.moveTo(vs[0].x, vs[0].y);
      for (var i = 1; i < vs.length; i += 1) {
        this.context.lineTo(vs[i].x, vs[i].y);
      }
      if (close) {
        this.context.closePath();
      }
      this.context.fill();
      this.context.stroke();
    } }, { key: 'text', value: function text(

    str, x, y) {
      this.context.fillText(str, x, y);
      this.context.strokeText(str, x, y);
    } }, { key: 'beginShape', value: function beginShape()

    {
      this._vertices = [];
    } }, { key: 'vertex', value: function vertex(

    x, y) {
      this._vertices.push(new _PVector2.default(x, y));
    } }, { key: 'endShape', value: function endShape()

    {
      this.lines(this._vertices, true);
    }

    // Image
  }, { key: 'loadImage', value: function loadImage(
    filename) {

    } }, { key: 'image', value: function image(

    img, x, y, w, h) {

    } }, { key: 'get', value: function get(

    x, y, w, h) {

    } }, { key: 'set', value: function set(

    x, y, c) {

    }

    // Event
  }, { key: 'mousePressed', value: function mousePressed()
    {

    } }, { key: 'mouseReleased', value: function mouseReleased()

    {

    } }, { key: 'keyPressed', value: function keyPressed()

    {

    }

    // Application
  }, { key: 'setup', value: function setup()
    {

    } }, { key: 'draw', value: function draw()

    {

    } }, { key: 'launch', value: function launch(

    canvasSelector) {var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var proj = this;
      var interval = 1000 / proj.frameRate;
      var canvas = document.querySelector(canvasSelector);
      proj.context = canvas.getContext('2d');
      proj.size(canvas.width, canvas.height);

      // register
      canvas.addEventListener('mousemove', function (e) {
        proj.pmouseX = proj.mouseX;
        proj.pmouseY = proj.mouseY;
        if (e.offsetX) {
          proj.mouseX = e.offsetX;
          proj.mouseY = e.offsetY;
        } else if (e.layerX) {
          proj.mouseX = e.layerX;
          proj.mouseY = e.layerY;
        }
      });
      canvas.addEventListener('keydown', function (e) {
        proj.key = e.keyCode;
      });
      canvas.addEventListener('keyup', function () {
        proj.key = null;
      });
      canvas.addEventListener('mousemove', proj.mouseMove); // for non-loop apps
      canvas.addEventListener('mousedown', proj.mousePressed);
      canvas.addEventListener('mouseup', proj.mouseReleased);
      canvas.addEventListener('keypress', proj.keyPressed);

      // loop
      proj.setup();
      function render() {
        proj.draw();
        proj.frameCount += 1;
        setTimeout(render, interval);
      }
      if (loop) {
        render();
      }
    } }]);return PRApp;}();exports.default = PRApp;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); // PVector.js

var _Utils = require('./Utils');var Utils = _interopRequireWildcard(_Utils);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

PVector = function () {
  function PVector() {var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;_classCallCheck(this, PVector);
    this.set(x, y, z);
  }_createClass(PVector, [{ key: 'set', value: function set(

    x, y) {var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.x = x;
      this.y = y;
      this.z = z;
    } }, { key: 'get', value: function get()

    {
      return new PVector(this.x, this.y, this.z);
    } }, { key: 'mag', value: function mag()

    {
      return Math.sqrt(this.magSq());
    } }, { key: 'magSq', value: function magSq()

    {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    } }, { key: 'add', value: function add(

    v) {
      return new PVector(this.x + v.x, this.y + v.y, this.z + v.z);
    } }, { key: 'sub', value: function sub(

    v) {
      return new PVector(this.x - v.x, this.y - v.y, this.z - v.z);
    } }, { key: 'mult', value: function mult(

    n) {
      return new PVector(this.x * n, this.y * n, this.z * n);
    } }, { key: 'div', value: function div(

    n) {
      return new PVector(this.x / n, this.y / n, this.z / n);
    } }, { key: 'dist', value: function dist(

    v) {
      return this.sub(v).mag();
    } }, { key: 'dot', value: function dot(

    v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } }, { key: 'cross', value: function cross(

    v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;
      return new PVector(x, y, z);
    } }, { key: 'normalize', value: function normalize()

    {
      return this.div(this.mag());
    } }, { key: 'limit', value: function limit(

    max) {
      return this.mag() > max ? this.setMag(max) : this.get();
    } }, { key: 'setMag', value: function setMag(

    len) {
      return this.normalize().mult(len);
    } }, { key: 'heading', value: function heading()

    {
      return Math.atan2(this.y, this.x);
    } }, { key: 'rotate', value: function rotate(

    theta) {
      // this is 2D only.
      var x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
      var y = this.x * Math.sin(theta) + this.y * Math.cos(theta);
      var z = this.z;
      return new PVector(x, y, z);
    } }, { key: 'lerp', value: function lerp(

    v, amt) {
      return this.add(v.sub(this).mult(amt));
    } }, { key: 'array', value: function array()

    {
      return [this.x, this.y, this.z];
    } }], [{ key: 'random2D', value: function random2D()

    {
      var theta = Utils.random(0, Math.PI * 2);
      return PVector.fromAngle(theta);
    } }, { key: 'random3D', value: function random3D()

    {
      var theta = Utils.random(0, Math.PI * 2);
      var phi = Utils.random(-Math.PI / 2, Math.PI / 2);
      var unit = new PVector(1, 0);
      var xy = unit.rotate(theta);
      var z = unit.rotate(phi);
      return new PVector(xy.x, xy.y, z.y);
    } }, { key: 'fromAngle', value: function fromAngle(

    angle) {
      var xUnit = new PVector(1, 0);
      return xUnit.rotate(angle);
    } }, { key: 'angleBetween', value: function angleBetween(

    v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    } }]);return PVector;}();exports.default = PVector;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



radians = radians;exports.



random = random;exports.




rgbaToHex = rgbaToHex;exports.






rgbToHex = rgbToHex;exports.



rgba = rgba;exports.






rgb = rgb;var _Internal = require('./Internal');function radians(angle) {return angle / 180 * Math.PI;} // Utils.js
function random(min, max) {var rand = Math.random();return min + rand * (max - min);}function rgbaToHex(r, g, b, a) {if (a > 0 && a <= 1) {a = parseInt((a * 255).toFixed(0));}return '#' + (0, _Internal.hex)(a) + (0, _Internal.hex)(r) + (0, _Internal.hex)(g) + (0, _Internal.hex)(b);}function rgbToHex(r, g, b) {return '#' + (0, _Internal.hex)(r) + (0, _Internal.hex)(g) + (0, _Internal.hex)(b);}function rgba(r, g, b, a) {if (a > 1) {a = a / 255;}return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';}function rgb(r, g, b) {return 'rgba(' + r + ',' + g + ',' + b + ')';
}
