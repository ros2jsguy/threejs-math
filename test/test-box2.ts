/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/**
 * @author bhouston / http://exocortex.com
 * @author TristanVALCKE / https://github.com/Itee
 */

'use strict';

import { assert } from 'chai';

import { Box2 } from '../lib/Box2';
import { Vector2 } from '../lib/Vector2';
import {
  negInf2,
  posInf2,
  negOne2,
  zero2,
  one2,
  two2,
} from './Constants.tests';


describe('Box2 Tests', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Box2();
    assert.ok(a.min.equals(posInf2), 'Passed!');
    assert.ok(a.max.equals(negInf2), 'Passed!');

    var a = new Box2(zero2.clone(), zero2.clone());
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(zero2), 'Passed!');

    var a = new Box2(zero2.clone(), one2.clone());
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(one2), 'Passed!');
  });

  // PUBLIC STUFF
  it('set', () => {
    const a = new Box2();

    a.set(zero2, one2);
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(one2), 'Passed!');
  });

  it('setFromPoints', () => {
    const a = new Box2();

    a.setFromPoints([zero2, one2, two2]);
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(two2), 'Passed!');

    a.setFromPoints([one2]);
    assert.ok(a.min.equals(one2), 'Passed!');
    assert.ok(a.max.equals(one2), 'Passed!');

    a.setFromPoints([]);
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('setFromCenterAndSize', () => {
    const a = new Box2();

    a.setFromCenterAndSize(zero2, two2);
    assert.ok(a.min.equals(negOne2), 'Passed!');
    assert.ok(a.max.equals(one2), 'Passed!');

    a.setFromCenterAndSize(one2, two2);
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(two2), 'Passed!');

    a.setFromCenterAndSize(zero2, zero2);
    assert.ok(a.min.equals(zero2), 'Passed!');
    assert.ok(a.max.equals(zero2), 'Passed!');
  });

  it('clone', () => {
    let a = new Box2(zero2, zero2);

    var b = a.clone();
    assert.ok(b.min.equals(zero2), 'Passed!');
    assert.ok(b.max.equals(zero2), 'Passed!');

    a = new Box2();
    var b = a.clone();
    assert.ok(b.min.equals(posInf2), 'Passed!');
    assert.ok(b.max.equals(negInf2), 'Passed!');
  });

  it('copy', () => {
    const a = new Box2(zero2.clone(), one2.clone());
    const b = new Box2().copy(a);
    assert.ok(b.min.equals(zero2), 'Passed!');
    assert.ok(b.max.equals(one2), 'Passed!');

    // ensure that it is a true copy
    a.min = zero2;
    a.max = one2;
    assert.ok(b.min.equals(zero2), 'Passed!');
    assert.ok(b.max.equals(one2), 'Passed!');
  });

  it('empty/makeEmpty', () => {
    var a = new Box2();

    assert.ok(a.isEmpty(), 'Passed!');

    var a = new Box2(zero2.clone(), one2.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    a.makeEmpty();
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('isEmpty', () => {
    var a = new Box2(zero2.clone(), zero2.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    var a = new Box2(zero2.clone(), one2.clone());
    assert.ok(!a.isEmpty(), 'Passed!');

    var a = new Box2(two2.clone(), one2.clone());
    assert.ok(a.isEmpty(), 'Passed!');

    var a = new Box2(posInf2.clone(), negInf2.clone());
    assert.ok(a.isEmpty(), 'Passed!');
  });

  it('getCenter', () => {
    var a = new Box2(zero2.clone(), zero2.clone());
    const center = new Vector2();
    assert.ok(a.getCenter(center).equals(zero2), 'Passed!');

    var a = new Box2(zero2, one2);
    const midpoint = one2.clone().multiplyScalar(0.5);
    assert.ok(a.getCenter(center).equals(midpoint), 'Passed!');
  });

  it('getSize', () => {
    var a = new Box2(zero2.clone(), zero2.clone());
    const size = new Vector2();

    assert.ok(a.getSize(size).equals(zero2), 'Passed!');

    var a = new Box2(zero2.clone(), one2.clone());
    assert.ok(a.getSize(size).equals(one2), 'Passed!');
  });

  it('expandByPoint', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const size = new Vector2();
    const center = new Vector2();

    a.expandByPoint(zero2);
    assert.ok(a.getSize(size).equals(zero2), 'Passed!');

    a.expandByPoint(one2);
    assert.ok(a.getSize(size).equals(one2), 'Passed!');

    a.expandByPoint(one2.clone().negate());
    assert.ok(a.getSize(size).equals(one2.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero2), 'Passed!');
  });

  it('expandByVector', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const size = new Vector2();
    const center = new Vector2();

    a.expandByVector(zero2);
    assert.ok(a.getSize(size).equals(zero2), 'Passed!');

    a.expandByVector(one2);
    assert.ok(a.getSize(size).equals(one2.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero2), 'Passed!');
  });

  it('expandByScalar', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const size = new Vector2();
    const center = new Vector2();

    a.expandByScalar(0);
    assert.ok(a.getSize(size).equals(zero2), 'Passed!');

    a.expandByScalar(1);
    assert.ok(a.getSize(size).equals(one2.clone().multiplyScalar(2)), 'Passed!');
    assert.ok(a.getCenter(center).equals(zero2), 'Passed!');
  });

  it('containsPoint', () => {
    const a = new Box2(zero2.clone(), zero2.clone());

    assert.ok(a.containsPoint(zero2), 'Passed!');
    assert.ok(!a.containsPoint(one2), 'Passed!');

    a.expandByScalar(1);
    assert.ok(a.containsPoint(zero2), 'Passed!');
    assert.ok(a.containsPoint(one2), 'Passed!');
    assert.ok(a.containsPoint(one2.clone().negate()), 'Passed!');
  });

  it('containsBox', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(zero2.clone(), one2.clone());
    const c = new Box2(one2.clone().negate(), one2.clone());

    assert.ok(a.containsBox(a), 'Passed!');
    assert.ok(!a.containsBox(b), 'Passed!');
    assert.ok(!a.containsBox(c), 'Passed!');

    assert.ok(b.containsBox(a), 'Passed!');
    assert.ok(c.containsBox(a), 'Passed!');
    assert.ok(!b.containsBox(c), 'Passed!');
  });

  it('getParameter', () => {
    const a = new Box2(zero2.clone(), one2.clone());
    const b = new Box2(one2.clone().negate(), one2.clone());

    const parameter = new Vector2();

    a.getParameter(zero2, parameter);
    assert.ok(parameter.equals(zero2), 'Passed!');
    a.getParameter(one2, parameter);
    assert.ok(parameter.equals(one2), 'Passed!');

    b.getParameter(one2.clone().negate(), parameter);
    assert.ok(parameter.equals(zero2), 'Passed!');
    b.getParameter(zero2, parameter);
    assert.ok(parameter.equals(new Vector2(0.5, 0.5)), 'Passed!');
    b.getParameter(one2, parameter);
    assert.ok(parameter.equals(one2), 'Passed!');
  });

  it('intersectsBox', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(zero2.clone(), one2.clone());
    const c = new Box2(one2.clone().negate(), one2.clone());

    assert.ok(a.intersectsBox(a), 'Passed!');
    assert.ok(a.intersectsBox(b), 'Passed!');
    assert.ok(a.intersectsBox(c), 'Passed!');

    assert.ok(b.intersectsBox(a), 'Passed!');
    assert.ok(c.intersectsBox(a), 'Passed!');
    assert.ok(b.intersectsBox(c), 'Passed!');

    b.translate(two2);
    assert.ok(!a.intersectsBox(b), 'Passed!');
    assert.ok(!b.intersectsBox(a), 'Passed!');
    assert.ok(!b.intersectsBox(c), 'Passed!');
  });

  it('clampPoint', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(one2.clone().negate(), one2.clone());

    const point = new Vector2();

    a.clampPoint(zero2, point);
    assert.ok(point.equals(new Vector2(0, 0)), 'Passed!');
    a.clampPoint(one2, point);
    assert.ok(point.equals(new Vector2(0, 0)), 'Passed!');
    a.clampPoint(one2.clone().negate(), point);
    assert.ok(point.equals(new Vector2(0, 0)), 'Passed!');

    b.clampPoint(two2, point);
    assert.ok(point.equals(new Vector2(1, 1)), 'Passed!');
    b.clampPoint(one2, point);
    assert.ok(point.equals(new Vector2(1, 1)), 'Passed!');
    b.clampPoint(zero2, point);
    assert.ok(point.equals(new Vector2(0, 0)), 'Passed!');
    b.clampPoint(one2.clone().negate(), point);
    assert.ok(point.equals(new Vector2(-1, -1)), 'Passed!');
    b.clampPoint(two2.clone().negate(), point);
    assert.ok(point.equals(new Vector2(-1, -1)), 'Passed!');
  });

  it('distanceToPoint', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(one2.clone().negate(), one2.clone());

    assert.ok(a.distanceToPoint(new Vector2(0, 0)) == 0, 'Passed!');
    assert.ok(a.distanceToPoint(new Vector2(1, 1)) == Math.sqrt(2), 'Passed!');
    assert.ok(a.distanceToPoint(new Vector2(-1, -1)) == Math.sqrt(2), 'Passed!');

    assert.ok(b.distanceToPoint(new Vector2(2, 2)) == Math.sqrt(2), 'Passed!');
    assert.ok(b.distanceToPoint(new Vector2(1, 1)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector2(0, 0)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector2(-1, -1)) == 0, 'Passed!');
    assert.ok(b.distanceToPoint(new Vector2(-2, -2)) == Math.sqrt(2), 'Passed!');
  });

  it('intersect', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(zero2.clone(), one2.clone());
    const c = new Box2(one2.clone().negate(), one2.clone());

    assert.ok(a.clone().intersect(a).equals(a), 'Passed!');
    assert.ok(a.clone().intersect(b).equals(a), 'Passed!');
    assert.ok(b.clone().intersect(b).equals(b), 'Passed!');
    assert.ok(a.clone().intersect(c).equals(a), 'Passed!');
    assert.ok(b.clone().intersect(c).equals(b), 'Passed!');
    assert.ok(c.clone().intersect(c).equals(c), 'Passed!');
  });

  it('union', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(zero2.clone(), one2.clone());
    const c = new Box2(one2.clone().negate(), one2.clone());

    assert.ok(a.clone().union(a).equals(a), 'Passed!');
    assert.ok(a.clone().union(b).equals(b), 'Passed!');
    assert.ok(a.clone().union(c).equals(c), 'Passed!');
    assert.ok(b.clone().union(c).equals(c), 'Passed!');
  });

  it('translate', () => {
    const a = new Box2(zero2.clone(), zero2.clone());
    const b = new Box2(zero2.clone(), one2.clone());
    const c = new Box2(one2.clone().negate(), one2.clone());
    const d = new Box2(one2.clone().negate(), zero2.clone());

    assert.ok(a.clone().translate(one2).equals(new Box2(one2, one2)), 'Passed!');
    assert.ok(a.clone().translate(one2).translate(one2.clone().negate()).equals(a), 'Passed!');
    assert.ok(d.clone().translate(one2).equals(b), 'Passed!');
    assert.ok(b.clone().translate(one2.clone().negate()).equals(d), 'Passed!');
  });

  it('equals', () => {
    let a = new Box2();
    let b = new Box2();
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box2(one2, two2);
    b = new Box2(one2, two2);
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box2(one2, two2);
    b = a.clone();
    assert.ok(b.equals(a), 'Passed!');
    assert.ok(a.equals(b), 'Passed!');

    a = new Box2(one2, two2);
    b = new Box2(one2, one2);
    assert.ok(!b.equals(a), 'Passed!');
    assert.ok(!a.equals(b), 'Passed!');

    a = new Box2();
    b = new Box2(one2, one2);
    assert.ok(!b.equals(a), 'Passed!');
    assert.ok(!a.equals(b), 'Passed!');

    a = new Box2(one2, two2);
    b = new Box2(one2, one2);
    assert.ok(!b.equals(a), 'Passed!');
    assert.ok(!a.equals(b), 'Passed!');
  });
});
