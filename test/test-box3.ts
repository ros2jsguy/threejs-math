/**
 * @author bhouston / http://exocortex.com
 * @author TristanVALCKE / https://github.com/Itee
 */

'use strict';

import { assert } from 'chai';

import { Box3 } from '../lib/Box3';
import { Matrix4 } from '../lib/Matrix4';
import { Plane } from '../lib/Plane';
import { Vector3 } from '../lib/Vector3';
import { Sphere } from '../lib/Sphere';
import { Triangle } from '../lib/Triangle';
import {
  negInf3,
  posInf3,
  zero3,
  one3,
  two3,
} from './Constants.tests';

function compareBox(a: Box3, b: Box3, threshold?: number) {
  threshold = threshold || 0.0001;
  return (a.min.distanceTo(b.min) < threshold &&
a.max.distanceTo(b.max) < threshold);
}

describe('Box3', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Box3();
    assert.ok(a.min.equals(posInf3), 'Passed!');
    assert.ok(a.max.equals(negInf3), 'Passed!');

    var a = new Box3(zero3.clone(), zero3.clone());
    assert.ok(a.min.equals(zero3), 'Passed!');
    assert.ok(a.max.equals(zero3), 'Passed!');

    var a = new Box3(zero3.clone(), one3.clone());
    assert.ok(a.min.equals(zero3), 'Passed!');
    assert.ok(a.max.equals(one3), 'Passed!');
  });

  // PUBLIC STUFF
  it('isBox3', () => {
    const a = new Box3();
    assert.ok(a.isBox3 === true, 'Passed!');

    const b = new Sphere();
    assert.ok(!b.isBox3, 'Passed!');
  });

  it('set', () => {
    const a = new Box3();

    a.set(zero3, one3);
    assert.ok(a.min.equals(zero3), 'Passed!');
    assert.ok(a.max.equals(one3), 'Passed!');
  });

  it('setFromArray', () => {
    const a = new Box3();

    a.setFromArray([0, 0, 0, 1, 1, 1, 2, 2, 2]);
    assert.ok(a.min.equals(zero3), 'Passed!');
    assert.ok(a.max.equals(two3), 'Passed!');
  });

  it('setFromPoints', () => {
    const a = new Box3();

    a.setFromPoints([zero3, one3, two3]);
    assert.ok(a.min.equals(zero3), 'Passed!');
    assert.ok(a.max.equals(two3), 'Passed!');

    a.setFromPoints([one3]);
    assert.ok(a.min.equals(one3), 'Passed!');
    assert.ok(a.max.equals(one3), 'Passed!');

    a.setFromPoints([]);
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('setFromCenterAndSize', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = a.clone();
    const centerA = new Vector3();
    const sizeA = new Vector3();
    const sizeB = new Vector3();
    const newCenter = one3;
    const newSize = two3;

    a.getCenter(centerA);
    a.getSize(sizeA);
    a.setFromCenterAndSize(centerA, sizeA);
    assert.ok(a.equals(b), 'Same values: no changes');

    a.setFromCenterAndSize(newCenter, sizeA);
    a.getCenter(centerA);
    a.getSize(sizeA);
    b.getSize(sizeB);

    assert.ok(centerA.equals(newCenter), 'Move center: correct new center');
    assert.ok(sizeA.equals(sizeB), 'Move center: no change in size');
    assert.notOk(a.equals(b), 'Move center: no longer equal to old values');

    a.setFromCenterAndSize(centerA, newSize);
    a.getCenter(centerA);
    a.getSize(sizeA);
    assert.ok(centerA.equals(newCenter), 'Resize: no change to center');
    assert.ok(sizeA.equals(newSize), 'Resize: correct new size');
    assert.notOk(a.equals(b), 'Resize: no longer equal to old values');
  });

  it('clone', () => {
    let a = new Box3(zero3.clone(), one3.clone());

    var b = a.clone();
    assert.ok(b.min.equals(zero3), 'Passed!');
    assert.ok(b.max.equals(one3), 'Passed!');

    a = new Box3();
    var b = a.clone();
    assert.ok(b.min.equals(posInf3), 'Passed!');
    assert.ok(b.max.equals(negInf3), 'Passed!');
  });

  it('copy', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = new Box3().copy(a);
    assert.ok(b.min.equals(zero3), 'Passed!');
    assert.ok(b.max.equals(one3), 'Passed!');

    // ensure that it is a true copy
    a.min = zero3;
    a.max = one3;
    assert.ok(b.min.equals(zero3), 'Passed!');
    assert.ok(b.max.equals(one3), 'Passed!');
  });

  it('empty/makeEmpty', () => {
    var a = new Box3();

    assert.ok(a.isEmpty(), 'Passed!');

    var a = new Box3(zero3.clone(), one3.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    a.makeEmpty();
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('isEmpty', () => {
    var a = new Box3(zero3.clone(), zero3.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    var a = new Box3(zero3.clone(), one3.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    var a = new Box3(two3.clone(), one3.clone());
    assert.ok(a.isEmpty(), 'Passed!');

    var a = new Box3(posInf3.clone(), negInf3.clone());
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('getCenter', () => {
    var a = new Box3(zero3.clone(), zero3.clone());
    const center = new Vector3();

    assert.ok(a.getCenter(center).equals(zero3), 'Passed!');

    var a = new Box3(zero3.clone(), one3.clone());
    const midpoint = one3.clone().multiplyScalar(0.5);
    assert.ok(a.getCenter(center).equals(midpoint), 'Passed!');
  });

  it('getSize', () => {
    var a = new Box3(zero3.clone(), zero3.clone());
    const size = new Vector3();

    assert.ok(a.getSize(size).equals(zero3), 'Passed!');

    var a = new Box3(zero3.clone(), one3.clone());
    assert.ok(a.getSize(size).equals(one3), 'Passed!');
  });

  it('expandByPoint', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const center = new Vector3();
    const size = new Vector3();

    a.expandByPoint(zero3);
    assert.ok(a.getSize(size).equals(zero3), 'Passed!');

    a.expandByPoint(one3);
    assert.ok(a.getSize(size).equals(one3), 'Passed!');

    a.expandByPoint(one3.clone().negate());
    assert.ok(a.getSize(size).equals(one3.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero3), 'Passed!');
  });

  it('expandByVector', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const center = new Vector3();
    const size = new Vector3();

    a.expandByVector(zero3);
    assert.ok(a.getSize(size).equals(zero3), 'Passed!');

    a.expandByVector(one3);
    assert.ok(a.getSize(size).equals(one3.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero3), 'Passed!');
  });

  it('expandByScalar', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const center = new Vector3();
    const size = new Vector3();

    a.expandByScalar(0);
    assert.ok(a.getSize(size).equals(zero3), 'Passed!');

    a.expandByScalar(1);
    assert.ok(a.getSize(size).equals(one3.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero3), 'Passed!');
  });

  it('containsPoint', () => {
    const a = new Box3(zero3.clone(), zero3.clone());

    assert.ok(a.containsPoint(zero3), 'Passed!');
    assert.ok(!a.containsPoint(one3), 'Passed!');

    a.expandByScalar(1);
    assert.ok(a.containsPoint(zero3), 'Passed!');
    assert.ok(a.containsPoint(one3), 'Passed!');
    assert.ok(a.containsPoint(one3.clone().negate()), 'Passed!');
  });

  it('containsBox', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());

    assert.ok(a.containsBox(a), 'Passed!');
    assert.ok(!a.containsBox(b), 'Passed!');
    assert.ok(!a.containsBox(c), 'Passed!');

    assert.ok(b.containsBox(a), 'Passed!');
    assert.ok(c.containsBox(a), 'Passed!');
    assert.ok(!b.containsBox(c), 'Passed!');
  });

  it('getParameter', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = new Box3(one3.clone().negate(), one3.clone());
    const parameter = new Vector3();

    a.getParameter(zero3, parameter);
    assert.ok(parameter.equals(zero3), 'Passed!');
    a.getParameter(one3, parameter);
    assert.ok(parameter.equals(one3), 'Passed!');

    b.getParameter(one3.clone().negate(), parameter);
    assert.ok(parameter.equals(zero3), 'Passed!');
    b.getParameter(zero3, parameter);
    assert.ok(parameter.equals(new Vector3(0.5, 0.5, 0.5)), 'Passed!');
    b.getParameter(one3, parameter);
    assert.ok(parameter.equals(one3), 'Passed!');
  });

  it('intersectsBox', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());

    assert.ok(a.intersectsBox(a), 'Passed!');
    assert.ok(a.intersectsBox(b), 'Passed!');
    assert.ok(a.intersectsBox(c), 'Passed!');

    assert.ok(b.intersectsBox(a), 'Passed!');
    assert.ok(c.intersectsBox(a), 'Passed!');
    assert.ok(b.intersectsBox(c), 'Passed!');

    b.translate(new Vector3(2, 2, 2));
    assert.ok(!a.intersectsBox(b), 'Passed!');
    assert.ok(!b.intersectsBox(a), 'Passed!');
    assert.ok(!b.intersectsBox(c), 'Passed!');
  });

  it('intersectsSphere', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = new Sphere(zero3.clone(), 1);

    assert.ok(a.intersectsSphere(b), 'Passed!');

    b.translate(new Vector3(2, 2, 2));
    assert.ok(!a.intersectsSphere(b), 'Passed!');
  });

  it('intersectsPlane', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = new Plane(new Vector3(0, 1, 0), 1);
    const c = new Plane(new Vector3(0, 1, 0), 1.25);
    const d = new Plane(new Vector3(0, -1, 0), 1.25);
    const e = new Plane(new Vector3(0, 1, 0), 0.25);
    const f = new Plane(new Vector3(0, 1, 0), -0.25);
    const g = new Plane(new Vector3(0, 1, 0), -0.75);
    const h = new Plane(new Vector3(0, 1, 0), -1);
    const i = new Plane(new Vector3(1, 1, 1).normalize(), -1.732);
    const j = new Plane(new Vector3(1, 1, 1).normalize(), -1.733);

    assert.ok(!a.intersectsPlane(b), 'Passed!');
    assert.ok(!a.intersectsPlane(c), 'Passed!');
    assert.ok(!a.intersectsPlane(d), 'Passed!');
    assert.ok(!a.intersectsPlane(e), 'Passed!');
    assert.ok(a.intersectsPlane(f), 'Passed!');
    assert.ok(a.intersectsPlane(g), 'Passed!');
    assert.ok(a.intersectsPlane(h), 'Passed!');
    assert.ok(a.intersectsPlane(i), 'Passed!');
    assert.ok(!a.intersectsPlane(j), 'Passed!');
  });

  it('intersectsTriangle', () => {
    const a = new Box3(one3.clone(), two3.clone());
    const b = new Triangle(new Vector3(1.5, 1.5, 2.5), new Vector3(2.5, 1.5, 1.5), new Vector3(1.5, 2.5, 1.5));
    const c = new Triangle(new Vector3(1.5, 1.5, 3.5), new Vector3(3.5, 1.5, 1.5), new Vector3(1.5, 1.5, 1.5));
    const d = new Triangle(new Vector3(1.5, 1.75, 3), new Vector3(3, 1.75, 1.5), new Vector3(1.5, 2.5, 1.5));
    const e = new Triangle(new Vector3(1.5, 1.8, 3), new Vector3(3, 1.8, 1.5), new Vector3(1.5, 2.5, 1.5));
    const f = new Triangle(new Vector3(1.5, 2.5, 3), new Vector3(3, 2.5, 1.5), new Vector3(1.5, 2.5, 1.5));

    assert.ok(a.intersectsTriangle(b), 'Passed!');
    assert.ok(a.intersectsTriangle(c), 'Passed!');
    assert.ok(a.intersectsTriangle(d), 'Passed!');
    assert.ok(!a.intersectsTriangle(e), 'Passed!');
    assert.ok(!a.intersectsTriangle(f), 'Passed!');
  });

  it('clampPoint', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(one3.clone().negate(), one3.clone());
    const point = new Vector3();

    a.clampPoint(zero3, point);
    assert.ok(point.equals(zero3), 'Passed!');
    a.clampPoint(one3, point);
    assert.ok(point.equals(zero3), 'Passed!');
    a.clampPoint(one3.clone().negate(), point);
    assert.ok(point.equals(zero3), 'Passed!');

    b.clampPoint(new Vector3(2, 2, 2), point);
    assert.ok(point.equals(one3), 'Passed!');
    b.clampPoint(one3, point);
    assert.ok(point.equals(one3), 'Passed!');
    b.clampPoint(zero3, point);
    assert.ok(point.equals(zero3), 'Passed!');
    b.clampPoint(one3.clone().negate(), point);
    assert.ok(point.equals(one3.clone().negate()), 'Passed!');
    b.clampPoint(new Vector3(-2, -2, -2), point);
    assert.ok(point.equals(one3.clone().negate()), 'Passed!');
  });

  it('distanceToPoint', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(one3.clone().negate(), one3.clone());

    assert.ok(a.distanceToPoint(new Vector3(0, 0, 0)) == 0, 'Passed!');
    assert.ok(a.distanceToPoint(new Vector3(1, 1, 1)) == Math.sqrt(3), 'Passed!');
    assert.ok(a.distanceToPoint(new Vector3(-1, -1, -1)) == Math.sqrt(3), 'Passed!');

    assert.ok(b.distanceToPoint(new Vector3(2, 2, 2)) == Math.sqrt(3), 'Passed!');
    assert.ok(b.distanceToPoint(new Vector3(1, 1, 1)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector3(0, 0, 0)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector3(-1, -1, -1)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector3(-2, -2, -2)) == Math.sqrt(3), 'Passed!');
  });

  it('getBoundingSphere', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());
    const sphere = new Sphere();

    assert.ok(a.getBoundingSphere(sphere).equals(new Sphere(zero3, 0)), 'Passed!');
    assert.ok(b.getBoundingSphere(sphere).equals(new Sphere(one3.clone().multiplyScalar(0.5), Math.sqrt(3) * 0.5)), 'Passed!');
    assert.ok(c.getBoundingSphere(sphere).equals(new Sphere(zero3, Math.sqrt(12) * 0.5)), 'Passed!');
  });

  it('intersect', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());

    assert.ok(a.clone().intersect(a).equals(a), 'Passed!');
    assert.ok(a.clone().intersect(b).equals(a), 'Passed!');
    assert.ok(b.clone().intersect(b).equals(b), 'Passed!');
    assert.ok(a.clone().intersect(c).equals(a), 'Passed!');
    assert.ok(b.clone().intersect(c).equals(b), 'Passed!');
    assert.ok(c.clone().intersect(c).equals(c), 'Passed!');
  });

  it('union', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());

    assert.ok(a.clone().union(a).equals(a), 'Passed!');
    assert.ok(a.clone().union(b).equals(b), 'Passed!');
    assert.ok(a.clone().union(c).equals(c), 'Passed!');
    assert.ok(b.clone().union(c).equals(c), 'Passed!');
  });

  it('applyMatrix4', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());
    const d = new Box3(one3.clone().negate(), zero3.clone());

    const m = new Matrix4().makeTranslation(1, -2, 1);
    const t1 = new Vector3(1, -2, 1);

    assert.ok(compareBox(a.clone().applyMatrix4(m), a.clone().translate(t1)), 'Passed!');
    assert.ok(compareBox(b.clone().applyMatrix4(m), b.clone().translate(t1)), 'Passed!');
    assert.ok(compareBox(c.clone().applyMatrix4(m), c.clone().translate(t1)), 'Passed!');
    assert.ok(compareBox(d.clone().applyMatrix4(m), d.clone().translate(t1)), 'Passed!');
  });

  it('translate', () => {
    const a = new Box3(zero3.clone(), zero3.clone());
    const b = new Box3(zero3.clone(), one3.clone());
    const c = new Box3(one3.clone().negate(), one3.clone());
    const d = new Box3(one3.clone().negate(), zero3.clone());

    assert.ok(a.clone().translate(one3).equals(new Box3(one3, one3)), 'Passed!');
    assert.ok(a.clone().translate(one3).translate(one3.clone().negate()).equals(a), 'Passed!');
    assert.ok(d.clone().translate(one3).equals(b), 'Passed!');
    assert.ok(b.clone().translate(one3.clone().negate()).equals(d), 'Passed!');
  });

  it('equals', () => {
    let a = new Box3();
    let b = new Box3();
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box3(one3, two3);
    b = new Box3(one3, two3);
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box3(one3, two3);
    b = a.clone();
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box3(one3, two3);
    b = new Box3(one3, one3);
    assert.ok(!b.equals(a), 'Passed!');
    assert.ok(!a.equals(b), 'Passed!');

    a = new Box3();
    b = new Box3(one3, one3);
    assert.ok(!b.equals(a), 'Passed!');
    assert.ok(!a.equals(b), 'Passed!');
  });
});
