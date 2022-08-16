/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* global QUnit */
import { assert } from 'chai';

import { Cylindrical } from '../lib/Cylindrical';
import { Vector3 } from '../lib/Vector3';
import { eps } from './Constants.tests';

describe('Cylindrical', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Cylindrical();
    const radius = 10.0;
    const theta = Math.PI;
    const y = 5;

    assert.strictEqual(a.radius, 1.0, 'Default values: check radius');
    assert.strictEqual(a.theta, 0, 'Default values: check theta');
    assert.strictEqual(a.y, 0, 'Default values: check y');

    var a = new Cylindrical(radius, theta, y);
    assert.strictEqual(a.radius, radius, 'Custom values: check radius');
    assert.strictEqual(a.theta, theta, 'Custom values: check theta');
    assert.strictEqual(a.y, y, 'Custom values: check y');
  });

  // PUBLIC STUFF
  it('set', () => {
    const a = new Cylindrical();
    const radius = 10.0;
    const theta = Math.PI;
    const y = 5;

    a.set(radius, theta, y);
    assert.strictEqual(a.radius, radius, 'Check radius');
    assert.strictEqual(a.theta, theta, 'Check theta');
    assert.strictEqual(a.y, y, 'Check y');
  });

  it('clone', () => {
    const radius = 10.0;
    const theta = Math.PI;
    const y = 5;
    const a = new Cylindrical(radius, theta, y);
    const b = a.clone();

    assert.deepEqual(a, b, 'Check a and b are equal after clone()');

    a.radius = 1;
    assert.notDeepEqual(a, b, 'Check a and b are not equal after modification');
  });

  it('copy', () => {
    const radius = 10.0;
    const theta = Math.PI;
    const y = 5;
    const a = new Cylindrical(radius, theta, y);
    const b = new Cylindrical().copy(a);

    assert.deepEqual(a, b, 'Check a and b are equal after copy()');

    a.radius = 1;
    assert.notDeepEqual(a, b, 'Check a and b are not equal after modification');
  });

  it('setFromVector3', () => {
    const a = new Cylindrical(1, 1, 1);
    const b = new Vector3(0, 0, 0);
    const c = new Vector3(3, -1, -3);
    const expected = new Cylindrical(Math.sqrt(9 + 9), Math.atan2(3, -3), -1);

    a.setFromVector3(b);
    assert.strictEqual(a.radius, 0, 'Zero-length vector: check radius');
    assert.strictEqual(a.theta, 0, 'Zero-length vector: check theta');
    assert.strictEqual(a.y, 0, 'Zero-length vector: check y');

    a.setFromVector3(c);
    assert.ok(Math.abs(a.radius - expected.radius) <= eps, 'Normal vector: check radius');
    assert.ok(Math.abs(a.theta - expected.theta) <= eps, 'Normal vector: check theta');
    assert.ok(Math.abs(a.y - expected.y) <= eps, 'Normal vector: check y');
  });
});

