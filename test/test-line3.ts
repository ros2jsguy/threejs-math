/* eslint-disable no-redeclare */
/* eslint-disable no-var */

import { assert } from 'chai';

import { Line3 } from '../lib/Line3';
import { Vector3 } from '../lib/Vector3';
import { Vector4 } from '../lib/Vector4';
import { Matrix4 } from '../lib/Matrix4';
import {
  x,
  y,
  z,
  zero3,
  one3,
  two3,
} from './Constants.tests';


describe('Line3', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Line3();
    assert.ok(a.start.equals(zero3), 'Passed!');
    assert.ok(a.end.equals(zero3), 'Passed!');

    var a = new Line3(two3.clone(), one3.clone());
    assert.ok(a.start.equals(two3), 'Passed!');
    assert.ok(a.end.equals(one3), 'Passed!');
  });

  // PUBLIC STUFF
  it('set', () => {
    const a = new Line3();

    a.set(one3, one3);
    assert.ok(a.start.equals(one3), 'Passed!');
    assert.ok(a.end.equals(one3), 'Passed!');
  });

  it('copy/equals', () => {
    const a = new Line3(zero3.clone(), one3.clone());
    const b = new Line3().copy(a);
    assert.ok(b.start.equals(zero3), 'Passed!');
    assert.ok(b.end.equals(one3), 'Passed!');

    // ensure that it is a true copy
    a.start = zero3;
    a.end = one3;
    assert.ok(b.start.equals(zero3), 'Passed!');
    assert.ok(b.end.equals(one3), 'Passed!');
  });

  it('clone/equal', () => {
    var a = new Line3();
    const b = new Line3(zero3, new Vector3(1, 1, 1));
    const c = new Line3(zero3, new Vector3(1, 1, 0));

    assert.notOk(a.equals(b), "Check a and b aren't equal");
    assert.notOk(a.equals(c), "Check a and c aren't equal");
    assert.notOk(b.equals(c), "Check b and c aren't equal");

    var a = b.clone();
    assert.ok(a.equals(b), 'Check a and b are equal after clone()');
    assert.notOk(a.equals(c), "Check a and c aren't equal after clone()");

    a.set(zero3, zero3);
    assert.notOk(a.equals(b), 'Check a and b are not equal after modification');
  });

  it('getCenter', () => {
    const center = new Vector3();

    const a = new Line3(zero3.clone(), two3.clone());
    assert.ok(a.getCenter(center).equals(one3.clone()), 'Passed');
  });

  it('delta', () => {
    const delta = new Vector3();

    const a = new Line3(zero3.clone(), two3.clone());
    assert.ok(a.delta(delta).equals(two3.clone()), 'Passed');
  });

  it('distanceSq', () => {
    const a = new Line3(zero3, zero3);
    const b = new Line3(zero3, one3);
    const c = new Line3(one3.clone().negate(), one3);
    const d = new Line3(two3.clone().multiplyScalar(-2), two3.clone().negate());

    assert.equal(a.distanceSq(), 0, 'Check squared distance for zero-length line');
    assert.equal(b.distanceSq(), 3, 'Check squared distance for simple line');
    assert.equal(c.distanceSq(), 12, 'Check squared distance for negative to positive endpoints');
    assert.equal(d.distanceSq(), 12, 'Check squared distance for negative to negative endpoints');
  });

  it('distance', () => {
    const a = new Line3(zero3, zero3);
    const b = new Line3(zero3, one3);
    const c = new Line3(one3.clone().negate(), one3);
    const d = new Line3(two3.clone().multiplyScalar(-2), two3.clone().negate());

    assert.equal(a.distance(), 0, 'Check distance for zero-length line');
    assert.equal(b.distance(), Math.sqrt(3), 'Check distance for simple line');
    assert.equal(c.distance(), Math.sqrt(12), 'Check distance for negative to positive endpoints');
    assert.equal(d.distance(), Math.sqrt(12), 'Check distance for negative to negative endpoints');
  });

  it('at', () => {
    const a = new Line3(one3.clone(), new Vector3(1, 1, 2));
    const point = new Vector3();

    a.at(-1, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 0)) < 0.0001, 'Passed!');
    a.at(0, point);
    assert.ok(point.distanceTo(one3.clone()) < 0.0001, 'Passed!');
    a.at(1, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 2)) < 0.0001, 'Passed!');
    a.at(2, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 3)) < 0.0001, 'Passed!');
  });

  it('closestPointToPoint/closestPointToPointParameter', () => {
    const a = new Line3(one3.clone(), new Vector3(1, 1, 2));
    const point = new Vector3();

    // nearby the ray
    assert.ok(a.closestPointToPointParameter(zero3.clone(), true) == 0, 'Passed!');
    a.closestPointToPoint(zero3.clone(), true, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 1)) < 0.0001, 'Passed!');

    // nearby the ray
    assert.ok(a.closestPointToPointParameter(zero3.clone(), false) == -1, 'Passed!');
    a.closestPointToPoint(zero3.clone(), false, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 0)) < 0.0001, 'Passed!');

    // nearby the ray
    assert.ok(a.closestPointToPointParameter(new Vector3(1, 1, 5), true) == 1, 'Passed!');
    a.closestPointToPoint(new Vector3(1, 1, 5), true, point);
    assert.ok(point.distanceTo(new Vector3(1, 1, 2)) < 0.0001, 'Passed!');

    // exactly on the ray
    assert.ok(a.closestPointToPointParameter(one3.clone(), true) == 0, 'Passed!');
    a.closestPointToPoint(one3.clone(), true, point);
    assert.ok(point.distanceTo(one3.clone()) < 0.0001, 'Passed!');
  });

  it('applyMatrix4', () => {
    const a = new Line3(zero3.clone(), two3.clone());
    const b = new Vector4(two3.x, two3.y, two3.z, 1);
    const m = new Matrix4().makeTranslation(x, y, z);
    const v = new Vector3(x, y, z);

    a.applyMatrix4(m);
    assert.ok(a.start.equals(v), 'Translation: check start');
    assert.ok(a.end.equals(new Vector3(2 + x, 2 + y, 2 + z)), 'Translation: check start');

    // reset starting conditions
    a.set(zero3.clone(), two3.clone());
    m.makeRotationX(Math.PI);

    a.applyMatrix4(m);
    b.applyMatrix4(m);

    assert.ok(a.start.equals(zero3), 'Rotation: check start');
    assert.equal(a.end.x, b.x / b.w, 'Rotation: check end.x');
    assert.equal(a.end.y, b.y / b.w, 'Rotation: check end.y');
    assert.equal(a.end.z, b.z / b.w, 'Rotation: check end.z');

    // reset starting conditions
    a.set(zero3.clone(), two3.clone());
    b.set(two3.x, two3.y, two3.z, 1);
    m.setPosition(v);

    a.applyMatrix4(m);
    b.applyMatrix4(m);

    assert.ok(a.start.equals(v), 'Both: check start');
    assert.equal(a.end.x, b.x / b.w, 'Both: check end.x');
    assert.equal(a.end.y, b.y / b.w, 'Both: check end.y');
    assert.equal(a.end.z, b.z / b.w, 'Both: check end.z');
  });

  it('equals', () => {
    const a = new Line3(zero3.clone(), zero3.clone());
    const b = new Line3();
    assert.ok(a.equals(b), 'Passed');
  });
});

