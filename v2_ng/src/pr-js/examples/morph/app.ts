// app.js

import PRApp from '../../PRApp';
import PVector from '../../PVector';
import ArrayList from '../../ArrayList';
import { size, radians, background, translate, strokeWeight, beginShape, noFill, stroke, vertex, endShape } from '../../PR';

/**
 * Morph.
 *
 * Changing one shape into another by interpolating
 * vertices from one to another
 */

export default function MorphDemo() {
  // Two ArrayLists to store the vertices for two shapes
  // This example assumes that each shape will have the same
  // number of vertices, i.e. the size of each ArrayList will be the same
  var circle = new ArrayList();
  var square = new ArrayList();

  // An ArrayList for a third set of vertices, the ones we will be drawing
  // in the window
  var morph = new ArrayList();

  // This boolean variable will control if we are morphing to a circle or square
  var state = false;

  var width = 640, height = 360;

  MorphDemo.prototype = new PRApp();

  MorphDemo.prototype.setup = function () {
    size(width, height);

    // Create a circle using vectors pointing from center
    for (var angle = 0; angle < 360; angle += 9) {
      // Note we are not starting from 0 in order to match the
      // path of a circle.
      var v = PVector.fromAngle(radians(angle - 135));
      var v1 = v.mult(100);
      circle.add(v1);
      // Let's fill out morph ArrayList with blank PVectors while we are at it
      morph.add(new PVector());
    }

    // A square is a bunch of vertices along straight lines
    // Top of square
    for (var x = -50; x < 50; x += 10) {
      square.add(new PVector(x, -50));
    }
    // Right side
    for (var y = -50; y < 50; y += 10) {
      square.add(new PVector(50, y));
    }
    // Bottom
    for (var x = 50; x > -50; x -= 10) {
      square.add(new PVector(x, 50));
    }
    // Left side
    for (var y = 50; y > -50; y -= 10) {
      square.add(new PVector(-50, y));
    }
  }

  MorphDemo.prototype.draw = function () {
    background(51);

    // We will keep how far the vertices are from their target
    var totalDistance = 0;

    // Look at each vertex
    for (var i = 0; i < circle.size(); i++) {
      var v1;
      // Are we lerping to the circle or square?
      if (state) {
        v1 = circle.get(i);
      } else {
        v1 = square.get(i);
      }
      // Get the vertex we will draw
      var v2 = morph.get(i);
      // Lerp to the target
      var v3 = v2.lerp(v1, 0.1);
      morph.set(i, v3);
      // Check how far we are from target
      totalDistance += v1.dist(v3);
    }

    // If all the vertices are close, switch shape
    if (totalDistance < 0.1) {
      state = !state;
    }

    // Draw relative to center
    translate(width / 2, height / 2);
    strokeWeight(4);
    // Draw a polygon that makes up all the vertices
    beginShape();
    noFill();
    stroke(255);
    for (var i = 0; i < morph.size(); i++) {
      var v = morph.get(i);
      vertex(v.x, v.y);
    }
    endShape();
  }
}
