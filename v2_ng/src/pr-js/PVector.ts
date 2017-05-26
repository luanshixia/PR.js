// PVector.js

import * as Utils from './Utils';

export default class PVector {
  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z);
  }

  set(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get() {
    return new PVector(this.x, this.y, this.z);
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  magSq() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  }

  add(v) {
    return new PVector(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v) {
    return new PVector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mult(n) {
    return new PVector(this.x * n, this.y * n, this.z * n);
  }

  div(n) {
    return new PVector(this.x / n, this.y / n, this.z / n);
  }

  dist(v) {
    return this.sub(v).mag();
  }

  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  }

  cross(v) {
    const x = (this.y * v.z) - (this.z * v.y);
    const y = (this.z * v.x) - (this.x * v.z);
    const z = (this.x * v.y) - (this.y * v.x);
    return new PVector(x, y, z);
  }

  normalize() {
    return this.div(this.mag());
  }

  limit(max) {
    return this.mag() > max ? this.setMag(max) : this.get();
  }

  setMag(len) {
    return this.normalize().mult(len);
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  rotate(theta) {
    // this is 2D only.
    const x = (this.x * Math.cos(theta)) - (this.y * Math.sin(theta));
    const y = (this.x * Math.sin(theta)) + (this.y * Math.cos(theta));
    const z = this.z;
    return new PVector(x, y, z);
  }

  lerp(v, amt) {
    return this.add(v.sub(this).mult(amt));
  }

  array() {
    return [this.x, this.y, this.z];
  }

  static random2D() {
    const theta = Utils.random(0, Math.PI * 2);
    return PVector.fromAngle(theta);
  }

  static random3D() {
    const theta = Utils.random(0, Math.PI * 2);
    const phi = Utils.random(-Math.PI / 2, Math.PI / 2);
    const unit = new PVector(1, 0);
    const xy = unit.rotate(theta);
    const z = unit.rotate(phi);
    return new PVector(xy.x, xy.y, z.y);
  }

  static fromAngle(angle) {
    const xUnit = new PVector(1, 0);
    return xUnit.rotate(angle);
  }

  static angleBetween(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  }
}
