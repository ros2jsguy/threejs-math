/* eslint-disable max-len */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */

import { assert } from 'chai';

import { Triangle } from '../lib/Triangle';
import { Box3 } from '../lib/Box3';
import { Plane } from '../lib/Plane';
import { Vector3 } from '../lib/Vector3';
import {
  zero3,
  one3,
  two3,
} from './Constants.tests';

describe('Triangle', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Triangle();
    assert.ok(a.a.equals(zero3), 'Passed!');
    assert.ok(a.b.equals(zero3), 'Passed!');
    assert.ok(a.c.equals(zero3), 'Passed!');

    var a = new Triangle(one3.clone().negate(), one3.clone(), two3.clone());
    assert.ok(a.a.equals(one3.clone().negate()), 'Passed!');
    assert.ok(a.b.equals(one3), 'Passed!');
    assert.ok(a.c.equals(two3), 'Passed!');
  });

  // STATIC STUFF
  // QUnit.todo( "getNormal", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "getBarycoord", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "containsPoint", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // PUBLIC STUFF
  it('set', () => {
    const a = new Triangle();

    a.set(one3.clone().negate(), one3, two3);
    assert.ok(a.a.equals(one3.clone().negate()), 'Passed!');
    assert.ok(a.b.equals(one3), 'Passed!');
    assert.ok(a.c.equals(two3), 'Passed!');
  });

  it('setFromPointsAndIndices', () => {
    const a = new Triangle();

    const points = [one3, one3.clone().negate(), two3];
    a.setFromPointsAndIndices(points, 1, 0, 2);
    assert.ok(a.a.equals(one3.clone().negate()), 'Passed!');
    assert.ok(a.b.equals(one3), 'Passed!');
    assert.ok(a.c.equals(two3), 'Passed!');
  });

  // QUnit.todo( "clone", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('copy', () => {
    const a = new Triangle(one3.clone().negate(), one3.clone(), two3.clone());
    const b = new Triangle().copy(a);
    assert.ok(b.a.equals(one3.clone().negate()), 'Passed!');
    assert.ok(b.b.equals(one3), 'Passed!');
    assert.ok(b.c.equals(two3), 'Passed!');

    // ensure that it is a true copy
    a.a = one3;
    a.b = zero3;
    a.c = zero3;
    assert.ok(b.a.equals(one3.clone().negate()), 'Passed!');
    assert.ok(b.b.equals(one3), 'Passed!');
    assert.ok(b.c.equals(two3), 'Passed!');
  });

  it('getArea', () => {
    var a = new Triangle();

    assert.ok(a.getArea() === 0, 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    assert.ok(a.getArea() === 0.5, 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    assert.ok(a.getArea() === 2, 'Passed!');

    // colinear triangle.
    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(3, 0, 0));
    assert.ok(a.getArea() === 0, 'Passed!');
  });

  it('getMidpoint', () => {
    var a = new Triangle();
    const midpoint = new Vector3();

    assert.ok(a.getMidpoint(midpoint).equals(new Vector3(0, 0, 0)), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    assert.ok(a.getMidpoint(midpoint).equals(new Vector3(1 / 3, 1 / 3, 0)), 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    assert.ok(a.getMidpoint(midpoint).equals(new Vector3(2 / 3, 0, 2 / 3)), 'Passed!');
  });

  it('getNormal', () => {
    var a = new Triangle();
    const normal = new Vector3();

    assert.ok(a.getNormal(normal).equals(new Vector3(0, 0, 0)), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    assert.ok(a.getNormal(normal).equals(new Vector3(0, 0, 1)), 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    assert.ok(a.getNormal(normal).equals(new Vector3(0, 1, 0)), 'Passed!');
  });

  it('getPlane', () => {
    var a = new Triangle();
    const plane = new Plane();
    const normal = new Vector3();

    a.getPlane(plane);
    assert.notOk(isNaN(plane.distanceToPoint(a.a)), 'Passed!');
    assert.notOk(isNaN(plane.distanceToPoint(a.b)), 'Passed!');
    assert.notOk(isNaN(plane.distanceToPoint(a.c)), 'Passed!');
    // assert.notDeepEqual( plane.normal,
    //   x: NaN,
    //   y: NaN,
    //   z: NaN
    // }, "Passed!" );

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    a.getPlane(plane);
    a.getNormal(normal);
    assert.ok(plane.distanceToPoint(a.a) === 0, 'Passed!');
    assert.ok(plane.distanceToPoint(a.b) === 0, 'Passed!');
    assert.ok(plane.distanceToPoint(a.c) === 0, 'Passed!');
    assert.ok(plane.normal.equals(normal), 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    a.getPlane(plane);
    a.getNormal(normal);
    assert.ok(plane.distanceToPoint(a.a) === 0, 'Passed!');
    assert.ok(plane.distanceToPoint(a.b) === 0, 'Passed!');
    assert.ok(plane.distanceToPoint(a.c) === 0, 'Passed!');
    assert.ok(plane.normal.clone().normalize().equals(normal), 'Passed!');
  });

  it('getBarycoord', () => {
    var a = new Triangle();

    const bad = new Vector3(-2, -1, -1);
    const barycoord = new Vector3();
    const midpoint = new Vector3();

    a.getBarycoord(a.a, barycoord);
    assert.ok(barycoord.equals(bad), 'Passed!');
    a.getBarycoord(a.b, barycoord);
    assert.ok(barycoord.equals(bad), 'Passed!');
    a.getBarycoord(a.c, barycoord);
    assert.ok(barycoord.equals(bad), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    a.getMidpoint(midpoint);

    a.getBarycoord(a.a, barycoord);
    assert.ok(barycoord.equals(new Vector3(1, 0, 0)), 'Passed!');
    a.getBarycoord(a.b, barycoord);
    assert.ok(barycoord.equals(new Vector3(0, 1, 0)), 'Passed!');
    a.getBarycoord(a.c, barycoord);
    assert.ok(barycoord.equals(new Vector3(0, 0, 1)), 'Passed!');
    a.getBarycoord(midpoint, barycoord);
    assert.ok(barycoord.distanceTo(new Vector3(1 / 3, 1 / 3, 1 / 3)) < 0.0001, 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    a.getMidpoint(midpoint);

    a.getBarycoord(a.a, barycoord);
    assert.ok(barycoord.equals(new Vector3(1, 0, 0)), 'Passed!');
    a.getBarycoord(a.b, barycoord);
    assert.ok(barycoord.equals(new Vector3(0, 1, 0)), 'Passed!');
    a.getBarycoord(a.c, barycoord);
    assert.ok(barycoord.equals(new Vector3(0, 0, 1)), 'Passed!');
    a.getBarycoord(midpoint, barycoord);
    assert.ok(barycoord.distanceTo(new Vector3(1 / 3, 1 / 3, 1 / 3)) < 0.0001, 'Passed!');
  });

  it('containsPoint', () => {
    var a = new Triangle();
    const midpoint = new Vector3();

    assert.ok(!a.containsPoint(a.a), 'Passed!');
    assert.ok(!a.containsPoint(a.b), 'Passed!');
    assert.ok(!a.containsPoint(a.c), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    a.getMidpoint(midpoint);
    assert.ok(a.containsPoint(a.a), 'Passed!');
    assert.ok(a.containsPoint(a.b), 'Passed!');
    assert.ok(a.containsPoint(a.c), 'Passed!');
    assert.ok(a.containsPoint(midpoint), 'Passed!');
    assert.ok(!a.containsPoint(new Vector3(-1, -1, -1)), 'Passed!');

    var a = new Triangle(new Vector3(2, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 2));
    a.getMidpoint(midpoint);
    assert.ok(a.containsPoint(a.a), 'Passed!');
    assert.ok(a.containsPoint(a.b), 'Passed!');
    assert.ok(a.containsPoint(a.c), 'Passed!');
    assert.ok(a.containsPoint(midpoint), 'Passed!');
    assert.ok(!a.containsPoint(new Vector3(-1, -1, -1)), 'Passed!');
  });

  it('intersectsBox', () => {
    const a = new Box3(one3.clone(), two3.clone());
    const b = new Triangle(new Vector3(1.5, 1.5, 2.5), new Vector3(2.5, 1.5, 1.5), new Vector3(1.5, 2.5, 1.5));
    const c = new Triangle(new Vector3(1.5, 1.5, 3.5), new Vector3(3.5, 1.5, 1.5), new Vector3(1.5, 1.5, 1.5));
    const d = new Triangle(new Vector3(1.5, 1.75, 3), new Vector3(3, 1.75, 1.5), new Vector3(1.5, 2.5, 1.5));
    const e = new Triangle(new Vector3(1.5, 1.8, 3), new Vector3(3, 1.8, 1.5), new Vector3(1.5, 2.5, 1.5));
    const f = new Triangle(new Vector3(1.5, 2.5, 3), new Vector3(3, 2.5, 1.5), new Vector3(1.5, 2.5, 1.5));

    assert.ok(b.intersectsBox(a), 'Passed!');
    assert.ok(c.intersectsBox(a), 'Passed!');
    assert.ok(d.intersectsBox(a), 'Passed!');
    assert.ok(!e.intersectsBox(a), 'Passed!');
    assert.ok(!f.intersectsBox(a), 'Passed!');
  });

  it('closestPointToPoint', () => {
    const a = new Triangle(new Vector3(-1, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    const point = new Vector3();

    // point lies inside the triangle
    a.closestPointToPoint(new Vector3(0, 0.5, 0), point);
    assert.ok(point.equals(new Vector3(0, 0.5, 0)), 'Passed!');

    // point lies on a vertex
    a.closestPointToPoint(a.a, point);
    assert.ok(point.equals(a.a), 'Passed!');

    a.closestPointToPoint(a.b, point);
    assert.ok(point.equals(a.b), 'Passed!');

    a.closestPointToPoint(a.c, point);
    assert.ok(point.equals(a.c), 'Passed!');

    // point lies on an edge
    a.closestPointToPoint(zero3.clone(), point);
    assert.ok(point.equals(zero3.clone()), 'Passed!');

    // point lies outside the triangle
    a.closestPointToPoint(new Vector3(-2, 0, 0), point);
    assert.ok(point.equals(new Vector3(-1, 0, 0)), 'Passed!');

    a.closestPointToPoint(new Vector3(2, 0, 0), point);
    assert.ok(point.equals(new Vector3(1, 0, 0)), 'Passed!');

    a.closestPointToPoint(new Vector3(0, 2, 0), point);
    assert.ok(point.equals(new Vector3(0, 1, 0)), 'Passed!');

    a.closestPointToPoint(new Vector3(0, -2, 0), point);
    assert.ok(point.equals(new Vector3(0, 0, 0)), 'Passed!');
  });

  it('isFrontFacing', () => {
    var a = new Triangle();
    var dir = new Vector3();
    assert.ok(!a.isFrontFacing(dir), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    var dir = new Vector3(0, 0, -1);
    assert.ok(a.isFrontFacing(dir), 'Passed!');

    var a = new Triangle(new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0));
    assert.ok(!a.isFrontFacing(dir), 'Passed!');
  });

  it('equals', () => {
    const a = new Triangle(
      new Vector3(1, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 1),
    );
    const b = new Triangle(
      new Vector3(0, 0, 1),
      new Vector3(0, 1, 0),
      new Vector3(1, 0, 0),
    );
    const c = new Triangle(
      new Vector3(-1, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 1),
    );

    assert.ok(a.equals(a), 'a equals a');
    assert.notOk(a.equals(b), 'a does not equal b');
    assert.notOk(a.equals(c), 'a does not equal c');
    assert.notOk(b.equals(c), 'b does not equal c');

    a.copy(b);
    assert.ok(a.equals(a), 'a equals b after copy()');
  });
});

