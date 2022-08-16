/* eslint-disable max-len */
/**
 * @author bhouston / http://exocortex.com
 * @author TristanVALCKE / https://github.com/Itee
 */

'use strict';

/* global QUnit */

import { assert } from 'chai';

import { Euler, IOrder } from '../lib/Euler';
import { Matrix4 } from '../lib/Matrix4';
import { Quaternion } from '../lib/Quaternion';
import { Vector3 } from '../lib/Vector3';
import { x, y, z } from './Constants.tests';

const eulerZero = new Euler(0, 0, 0, 'XYZ');
const eulerAxyz = new Euler(1, 0, 0, 'XYZ');
const eulerAzyx = new Euler(0, 1, 0, 'ZYX');

function matrixEquals4(a, b, tolerance = 0.0001) {
  if (a.elements.length != b.elements.length) {
    return false;
  }

  for (let i = 0, il = a.elements.length; i < il; i++) {
    const delta = a.elements[i] - b.elements[i];
    if (delta > tolerance) {
      return false;
    }
  }

  return true;
}

function eulerEquals(a, b, tolerance = 0.0001) {
  const diff = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

  return (diff < tolerance);
}

function quatEquals(a, b, tolerance = 0.0001) {
  tolerance = tolerance || 0.0001;
  const diff = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);

  return (diff < tolerance);
}

describe('Euler', () => {
  // INSTANCING
  it('Instancing', () => {
    const a = new Euler();
    assert.ok(a.equals(eulerZero), 'Passed!');
    assert.ok(!a.equals(eulerAxyz), 'Passed!');
    assert.ok(!a.equals(eulerAzyx), 'Passed!');
  });

  // STATIC STUFF
  it('RotationOrders', () => {
    assert.ok(Array.isArray(Euler.RotationOrders), 'Passed!');
    assert.deepEqual(Euler.RotationOrders, ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'], 'Passed!');
  });

  it('DefaultOrder', () => {
    assert.equal(Euler.DefaultOrder, 'XYZ', 'Passed!');
  });

  // PROPERTIES STUFF
  it('x', () => {
    let a = new Euler();
    assert.ok(a.x === 0, 'Passed!');

    a = new Euler(1, 2, 3);
    assert.ok(a.x === 1, 'Passed!');

    a = new Euler(4, 5, 6, 'XYZ');
    assert.ok(a.x === 4, 'Passed!');

    a = new Euler(7, 8, 9, 'XYZ');
    a.x = 10;
    assert.ok(a.x === 10, 'Passed!');

    a = new Euler(11, 12, 13, 'XYZ');
    let b = false;
    a._onChange(() => {
      b = true;
    });
    a.x = 14;
    assert.ok(b, 'Passed!');
    assert.ok(a.x === 14, 'Passed!');
  });

  it('y', () => {
    let a = new Euler();
    assert.ok(a.y === 0, 'Passed!');

    a = new Euler(1, 2, 3);
    assert.ok(a.y === 2, 'Passed!');

    a = new Euler(4, 5, 6, 'XYZ');
    assert.ok(a.y === 5, 'Passed!');

    a = new Euler(7, 8, 9, 'XYZ');
    a.y = 10;
    assert.ok(a.y === 10, 'Passed!');

    a = new Euler(11, 12, 13, 'XYZ');
    let b = false;
    a._onChange(() => {
      b = true;
    });
    a.y = 14;
    assert.ok(b, 'Passed!');
    assert.ok(a.y === 14, 'Passed!');
  });

  it('z', () => {
    let a = new Euler();
    assert.ok(a.z === 0, 'Passed!');

    a = new Euler(1, 2, 3);
    assert.ok(a.z === 3, 'Passed!');

    a = new Euler(4, 5, 6, 'XYZ');
    assert.ok(a.z === 6, 'Passed!');

    a = new Euler(7, 8, 9, 'XYZ');
    a.z = 10;
    assert.ok(a.z === 10, 'Passed!');

    a = new Euler(11, 12, 13, 'XYZ');
    let b = false;
    a._onChange(() => {
      b = true;
    });
    a.z = 14;
    assert.ok(b, 'Passed!');
    assert.ok(a.z === 14, 'Passed!');
  });

  it('order', () => {
    let a = new Euler();
    assert.ok(a.order === Euler.DefaultOrder, 'Passed!');

    a = new Euler(1, 2, 3);
    assert.ok(a.order === Euler.DefaultOrder, 'Passed!');

    a = new Euler(4, 5, 6, 'YZX');
    assert.ok(a.order === 'YZX', 'Passed!');

    a = new Euler(7, 8, 9, 'YZX');
    a.order = 'ZXY';
    assert.ok(a.order === 'ZXY', 'Passed!');

    a = new Euler(11, 12, 13, 'YZX');
    let b = false;
    a._onChange(() => {
      b = true;
    });
    a.order = 'ZXY';
    assert.ok(b, 'Passed!');
    assert.ok(a.order === 'ZXY', 'Passed!');
  });

  // PUBLIC STUFF
  it('isEuler', () => {
    const a = new Euler();
    assert.ok(a.isEuler, 'Passed!');
  });

  it('clone/copy/equals', () => {
    const a = eulerAxyz.clone();
    assert.ok(a.equals(eulerAxyz), 'Passed!');
    assert.ok(!a.equals(eulerZero), 'Passed!');
    assert.ok(!a.equals(eulerAzyx), 'Passed!');

    a.copy(eulerAzyx);
    assert.ok(a.equals(eulerAzyx), 'Passed!');
    assert.ok(!a.equals(eulerAxyz), 'Passed!');
    assert.ok(!a.equals(eulerZero), 'Passed!');
  });

  it('Quaternion.setFromEuler/Euler.fromQuaternion', () => {
    const testValues = [eulerZero, eulerAxyz, eulerAzyx];
    for (let i = 0; i < testValues.length; i++) {
      const v = testValues[i];
      const q = new Quaternion().setFromEuler(v);

      const v2 = new Euler().setFromQuaternion(q, v.order);
      const q2 = new Quaternion().setFromEuler(v2);
      assert.ok(quatEquals(q, q2), 'Passed!');
    }
  });

  it('Matrix4.setFromEuler/Euler.fromRotationMatrix', () => {
    const testValues = [eulerZero, eulerAxyz, eulerAzyx];
    for (let i = 0; i < testValues.length; i++) {
      const v = testValues[i];
      const m = new Matrix4().makeRotationFromEuler(v);

      const v2 = new Euler().setFromRotationMatrix(m, v.order);
      const m2 = new Matrix4().makeRotationFromEuler(v2);
      assert.ok(matrixEquals4(m, m2, 0.0001), 'Passed!');
    }
  });

  it('reorder', () => {
    const testValues = [eulerZero, eulerAxyz, eulerAzyx];
    for (let i = 0; i < testValues.length; i++) {
      const v = testValues[i];
      const q = new Quaternion().setFromEuler(v);

      v.reorder('YZX');
      const q2 = new Quaternion().setFromEuler(v);
      assert.ok(quatEquals(q, q2), 'Passed!');

      v.reorder('ZXY');
      const q3 = new Quaternion().setFromEuler(v);
      assert.ok(quatEquals(q, q3), 'Passed!');
    }
  });

  it('set/get properties, check callbacks', () => {
    const a = new Euler();
    // a._onChange( function () {
    // 	assert.step( "set: onChange called" );
    // } );

    a.x = 1;
    a.y = 2;
    a.z = 3;
    a.order = 'ZYX';

    assert.strictEqual(a.x, 1, 'get: check x');
    assert.strictEqual(a.y, 2, 'get: check y');
    assert.strictEqual(a.z, 3, 'get: check z');
    assert.strictEqual(a.order, 'ZYX', 'get: check order');

    // assert.verifySteps( Array( 4 ).fill( "set: onChange called" ) );
  });

  it('clone/copy, check callbacks', () => {
    let a = new Euler(1, 2, 3, 'ZXY');
    const b = new Euler(4, 5, 6, 'XZY');
    const cbSucceed = function () {
      assert.ok(true);
      // assert.step( "onChange called" );
    };
    const cbFail = function () {
      assert.ok(false);
    };
    a._onChange(cbFail);
    b._onChange(cbFail);

    // clone doesn't trigger onChange
    a = b.clone();
    assert.ok(a.equals(b), 'clone: check if a equals b');

    // copy triggers onChange once
    a = new Euler(1, 2, 3, 'ZXY');
    a._onChange(cbSucceed);
    a.copy(b);
    assert.ok(a.equals(b), 'copy: check if a equals b');
    // assert.verifySteps( [ "onChange called" ] );
  });

  it('toArray', () => {
    const a = new Euler(x, y, z, 'YXZ');

    let array = a.toArray();
    assert.strictEqual(array[0], x, 'No array, no offset: check x');
    assert.strictEqual(array[1], y, 'No array, no offset: check y');
    assert.strictEqual(array[2], z, 'No array, no offset: check z');
    assert.strictEqual(array[3], 'YXZ', 'No array, no offset: check order');

    array = [];
    a.toArray(array);
    assert.strictEqual(array[0], x, 'With array, no offset: check x');
    assert.strictEqual(array[1], y, 'With array, no offset: check y');
    assert.strictEqual(array[2], z, 'With array, no offset: check z');
    assert.strictEqual(array[3], 'YXZ', 'With array, no offset: check order');

    array = [];
    a.toArray(array, 1);
    assert.strictEqual(array[0], undefined, 'With array and offset: check [0]');
    assert.strictEqual(array[1], x, 'With array and offset: check x');
    assert.strictEqual(array[2], y, 'With array and offset: check y');
    assert.strictEqual(array[3], z, 'With array and offset: check z');
    assert.strictEqual(array[4], 'YXZ', 'With array and offset: check order');
  });

  it('fromArray', () => {
    let a = new Euler();
    let array: [number, number, number, IOrder?] = [x, y, z];
    const cb = function () {

      // assert.step( "onChange called" );

    };
    a._onChange(cb);

    a.fromArray(array);
    assert.strictEqual(a.x, x, 'No order: check x');
    assert.strictEqual(a.y, y, 'No order: check y');
    assert.strictEqual(a.z, z, 'No order: check z');
    assert.strictEqual(a.order, 'XYZ', 'No order: check order');

    a = new Euler();
    array = [x, y, z, 'ZYX'];
    a._onChange(cb);
    a.fromArray(array);
    assert.strictEqual(a.x, x, 'With order: check x');
    assert.strictEqual(a.y, y, 'With order: check y');
    assert.strictEqual(a.z, z, 'With order: check z');
    assert.strictEqual(a.order, 'ZYX', 'With order: check order');

    // assert.verifySteps( Array( 2 ).fill( "onChange called" ) );
  });

  it('_onChange', () => {
    const f = function () {
    };

    const a = new Euler(11, 12, 13, 'XYZ');
    a._onChange(f);
    assert.ok(a._onChangeCallback === f, 'Passed!');
  });

  // it( "_onChangeCallback", () => {

  // 	var b = false;
  // 	var a = new Euler( 11, 12, 13, "XYZ" );
  // 	var f = function () {

  // 		b = true;
  // 		assert.ok( a === this, "Passed!" );

  // 	};

  // 	a._onChangeCallback = f;
  // 	assert.ok( a._onChangeCallback === f, "Passed!" );


  // 	a._onChangeCallback();
  // 	assert.ok( b, "Passed!" );

  // } );

  // OTHERS
  it('gimbalLocalQuat', () => {
    // known problematic quaternions
    const q1 = new Quaternion(0.5207769385244341, -0.4783214164122354, 0.520776938524434, 0.47832141641223547);
    // const q2 = new Quaternion(0.11284905712620674, 0.6980437630368944, -0.11284905712620674, 0.6980437630368944);

    // const eulerOrder = 'ZYX';

    // create Euler directly from a Quaternion
    const eViaQ1 = new Euler().setFromQuaternion(q1, 'ZYX'); // there is likely a bug here

    // create Euler from Quaternion via an intermediate Matrix4
    const mViaQ1 = new Matrix4().makeRotationFromQuaternion(q1);
    const eViaMViaQ1 = new Euler().setFromRotationMatrix(mViaQ1, 'ZYX');

    // the results here are different
    assert.ok(eulerEquals(eViaQ1, eViaMViaQ1), 'Passed!'); // this result is correct
  });

  it('iterable', () => {
    const e = new Euler( 0.5, 0.75, 1, 'YZX' );
    const array = [ ...e ];
    assert.strictEqual( array[ 0 ], 0.5, 'Euler is iterable.' );
    assert.strictEqual( array[ 1 ], 0.75, 'Euler is iterable.' );
    assert.strictEqual( array[ 2 ], 1, 'Euler is iterable.' );
    assert.strictEqual( array[ 3 ], 'YZX', 'Euler is iterable.' );
  } );
});

