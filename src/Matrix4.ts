import { Base } from './Base';
import type { Euler } from './Euler';
import type { Matrix } from './Matrix';
import type { Matrix3 } from './Matrix3';
import type { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';

export type Matrix4Tuple = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

/**
 * A class representing a 4x4 matrix.
 *
 * The most common use of a 4x4 matrix in 3D computer graphics is as a Transformation Matrix. 
 * For an introduction to transformation matrices as used in WebGL, check out this tutorial.
 * This allows a Vector3 representing a point in 3D space to undergo transformations such as 
 * translation, rotation, shear, scale, reflection, orthogonal or perspective projection 
 * and so on, by being multiplied by the matrix. This is known as applying the matrix to the vector.
 * 
 * A Note on Row-Major and Column-Major Ordering
 * The set() method takes arguments in row-major order, while internally 
 * they are stored in the elements array in column-major order.
 * This means that calling
 * ```
 * const m = new THREE.Matrix4();
 * 
 * m.set( 11, 12, 13, 14,
 *        21, 22, 23, 24,
 *        31, 32, 33, 34,
 *        41, 42, 43, 44 );
 * ```
 * will result in the elements array containing:
 * ```
 * m.elements = [ 11, 21, 31, 41,
 *                12, 22, 32, 42,
 *                13, 23, 33, 43,
 *                14, 24, 34, 44 ];
 * ```
 * and internally all calculations are performed using column-major ordering. 
 * However, as the actual ordering makes no difference mathematically and 
 * most people are used to thinking about matrices in row-major order, the 
 * three.js documentation shows matrices in row-major order. Just bear in mind 
 * that if you are reading the source code, you'll have to take the transpose 
 * of any matrices outlined here to make sense of the calculations.
 * 
 * Extracting position, rotation and scale
 * There are several options available for extracting position, rotation and scale from a Matrix4.
 * Vector3.setFromMatrixPosition: can be used to extract the translation component.
 * Vector3.setFromMatrixScale: can be used to extract the scale component.
 * Quaternion.setFromRotationMatrix, Euler.setFromRotationMatrix or extractRotation 
 * can be used to extract the rotation component from a pure (unscaled) matrix.
 * decompose can be used to extract position, rotation and scale all at once.
 * 
 * @example
 * ```
 * // Simple rig for rotating around 3 axes
 * const m = new THREE.Matrix4();
 * const m1 = new THREE.Matrix4();
 * const m2 = new THREE.Matrix4();
 * const m3 = new THREE.Matrix4();
 * const alpha = 0;
 * const beta = Math.PI;
 * const gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 * ```
 */
export class Matrix4 extends Base implements Matrix {
  /** A column-major list of matrix values. */
  elements: number[];

  /**
   * Creates and initializes the Matrix4 to the 4x4 identity matrix.
   */
  constructor() {
    super();
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    if (arguments.length > 0) {
      console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
    }
  }

  /**
   * Read-only flag to check if a given object is of type Matrix.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isMatrix(): boolean {
    return true;
  }

  /**
   * Read-only flag to check if a given object is of type Matrix4.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isMatrix4(): boolean {
    return true;
  }

  /**
   * Set the elements of this matrix to the supplied row-major values n11, n12, ... n44.
   * @param n11 
   * @param n12 
   * @param n13 
   * @param n14 
   * @param n21 
   * @param n22 
   * @param n23 
   * @param n24 
   * @param n31 
   * @param n32 
   * @param n33 
   * @param n34 
   * @param n41 
   * @param n42 
   * @param n43 
   * @param n44 
   * @returns This instance.
   */
  set(n11: number, n12: number, n13: number, n14: number,
    n21: number, n22: number, n23: number, n24: number,
    n31: number, n32: number, n33: number, n34: number,
    n41: number, n42: number, n43: number, n44: number): this {
    const te = this.elements;

    te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
    te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
    te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
    te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

    return this;
  }

  /**
   * Resets this matrix to the identity matrix.
   * @returns This instance.
   */
  identity(): this {
    this.set(

      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Creates a new Matrix4 with identical elements to this one.
   * @returns A new Matrix4 instance identical this.
   */
  clone(): Matrix4 {
    return new Matrix4().fromArray(this.elements);
  }

  /**
   * Copies the elements of matrix m into this matrix.
   * @param m - The source matrix
   * @returns This instance.
   */
  copy(m: Matrix4): this {
    const te = this.elements;
    const me = m.elements;

    te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
    te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
    te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
    te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];

    return this;
  }

  /**
   * Copies the translation component of the supplied matrix m into this matrix's translation component.
   * @param m - The source matrix
   * @returns This instance.
   */
  copyPosition(m: Matrix4): this {
    const te = this.elements; const
      me = m.elements;

    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];

    return this;
  }

  /**
   * Set the upper 3x3 elements of this matrix to the values of the Matrix3 m.
   * @param m - The source Matrix3
   * @returns This instance.
   */
  setFromMatrix3(m: Matrix3): this {
    const me = m.elements;

    this.set(

      me[0], me[3], me[6], 0,
      me[1], me[4], me[7], 0,
      me[2], me[5], me[8], 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Extracts the basis of this matrix into the three axis vectors provided. If this matrix is:
   * ```
   * a, b, c, d,
   * e, f, g, h,
   * i, j, k, l,
   * m, n, o, p
   * ```
   * then the xAxis, yAxis, zAxis will be set to:
   * ```
   * xAxis = (a, e, i)
   * yAxis = (b, f, j)
   * zAxis = (c, g, k)
   * ```
   * 
   * @param xAxis 
   * @param yAxis 
   * @param zAxis 
   * @returns This instance.
   */
  extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);

    return this;
  }

  /**
   * Set this to the basis matrix consisting of the three provided basis vectors:
   * ```
   * xAxis.x, yAxis.x, zAxis.x, 0,
   * xAxis.y, yAxis.y, zAxis.y, 0,
   * xAxis.z, yAxis.z, zAxis.z, 0,
   * 0,       0,       0,       1
   * ```
   * @param xAxis - x-axis to set
   * @param yAxis - y-axis to set
   * @param zAxis - z-axis to set
   * @returns This instance. 
   */
  makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
    this.set(
      xAxis.x, yAxis.x, zAxis.x, 0,
      xAxis.y, yAxis.y, zAxis.y, 0,
      xAxis.z, yAxis.z, zAxis.z, 0,
      0, 0, 0, 1,
    );

    return this;
  }

  /**
   * Extracts the rotation component of the supplied matrix m into this matrix's rotation component.
   * @param m - updated to the matrix's rotation component
   * @returns This instance.
   */
  extractRotation(m: Matrix4): this {
    // this method does not support reflection matrices

    const te = this.elements;
    const me = m.elements;

    const scaleX = 1 / _v1.setFromMatrixColumn(m, 0).length();
    const scaleY = 1 / _v1.setFromMatrixColumn(m, 1).length();
    const scaleZ = 1 / _v1.setFromMatrixColumn(m, 2).length();

    te[0] = me[0] * scaleX;
    te[1] = me[1] * scaleX;
    te[2] = me[2] * scaleX;
    te[3] = 0;

    te[4] = me[4] * scaleY;
    te[5] = me[5] * scaleY;
    te[6] = me[6] * scaleY;
    te[7] = 0;

    te[8] = me[8] * scaleZ;
    te[9] = me[9] * scaleZ;
    te[10] = me[10] * scaleZ;
    te[11] = 0;

    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;

    return this;
  }

  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this 
   * matrix to the rotation specified by the given Euler Angle. 
   * The rest of the matrix is set to the identity. Depending on 
   * the order of the euler, there are six possible outcomes. 
   * See this page for a complete list.
   * @param euler - The Euler to update from.
   * @returns This instance.
   */
  makeRotationFromEuler(euler: Euler): this {
    const te = this.elements;

    const { x } = euler; const { y } = euler; const
      { z } = euler;
    const a = Math.cos(x); const
      b = Math.sin(x);
    const c = Math.cos(y); const
      d = Math.sin(y);
    const e = Math.cos(z); const
      f = Math.sin(z);

    if (euler.order === 'XYZ') {
      const ae = a * e; const af = a * f; const be = b * e; const
        bf = b * f;

      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;

      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;

      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === 'YXZ') {
      const ce = c * e; const cf = c * f; const de = d * e; const
        df = d * f;

      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;

      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;

      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === 'ZXY') {
      const ce = c * e; const cf = c * f; const de = d * e; const
        df = d * f;

      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;

      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;

      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === 'ZYX') {
      const ae = a * e; const af = a * f; const be = b * e; const
        bf = b * f;

      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;

      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;

      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === 'YZX') {
      const ac = a * c; const ad = a * d; const bc = b * c; const
        bd = b * d;

      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;

      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;

      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      const ac = a * c; const ad = a * d; const bc = b * c; const
        bd = b * d;

      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;

      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;

      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    }

    // bottom row
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;

    // last column
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;

    return this;
  }

  /**
   * Sets the rotation component of this matrix to the 
   * rotation specified by q, as outlined here. The rest 
   * of the matrix is set to the identity. So, given 
   * q = w + xi + yj + zk, the resulting matrix will be:
   * ```
   * 1-2y²-2z²    2xy-2zw    2xz+2yw    0
   * 2xy+2zw      1-2x²-2z²  2yz-2xw    0
   * 2xz-2yw      2yz+2xw    1-2x²-2y²  0
   * 0            0          0          1
   * ```
   * @param q - The source quaternion 
   * @returns This instance
   */
  makeRotationFromQuaternion(q: Quaternion): this {
    return this.compose(_zero, q, _one);
  }

  /**
   * Constructs a rotation matrix, looking from eye towards target oriented by the up vector.
   * @param eye - The relative origin
   * @param target - Target position
   * @param up - The up vecotr
   * @returns This instance.
   */
  lookAt(eye: Vector3, target: Vector3, up: Vector3): this {
    const te = this.elements;

    _z.subVectors(eye, target);

    if (_z.lengthSq() === 0) {
      // eye and target are in the same position

      _z.z = 1;
    }

    _z.normalize();
    _x.crossVectors(up, _z);

    if (_x.lengthSq() === 0) {
      // up and z are parallel

      if (Math.abs(up.z) === 1) {
        _z.x += 0.0001;
      } else {
        _z.z += 0.0001;
      }

      _z.normalize();
      _x.crossVectors(up, _z);
    }

    _x.normalize();
    _y.crossVectors(_z, _x);

    te[0] = _x.x; te[4] = _y.x; te[8] = _z.x;
    te[1] = _x.y; te[5] = _y.y; te[9] = _z.y;
    te[2] = _x.z; te[6] = _y.z; te[10] = _z.z;

    return this;
  }

  /**
   * Post-multiplies this matrix by m.
   * @param m - The matrix to multiply with
   * @returns This instance
   */
  multiply(m: Matrix4): this {
    return this.multiplyMatrices(this, m);
  }

  /**
   * Pre-multiplies this matrix by m.
   * @param m - The matrix to multiply with.
   * @returns This instance.
   */
  premultiply(m: Matrix4): this {
    return this.multiplyMatrices(m, this);
  }

  /**
   * Sets this matrix to a x b.
   * @param a - The 'a' matrix
   * @param b - The 'b' matrix
   * @returns This instance.
   */
  multiplyMatrices(a: Matrix4, b: Matrix4): this {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[0]; const a12 = ae[4]; const a13 = ae[8]; const
      a14 = ae[12];
    const a21 = ae[1]; const a22 = ae[5]; const a23 = ae[9]; const
      a24 = ae[13];
    const a31 = ae[2]; const a32 = ae[6]; const a33 = ae[10]; const
      a34 = ae[14];
    const a41 = ae[3]; const a42 = ae[7]; const a43 = ae[11]; const
      a44 = ae[15];

    const b11 = be[0]; const b12 = be[4]; const b13 = be[8]; const
      b14 = be[12];
    const b21 = be[1]; const b22 = be[5]; const b23 = be[9]; const
      b24 = be[13];
    const b31 = be[2]; const b32 = be[6]; const b33 = be[10]; const
      b34 = be[14];
    const b41 = be[3]; const b42 = be[7]; const b43 = be[11]; const
      b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;
  }

  /**
   * Multiplies every component of the matrix by a scalar value s.
   * @param s - The scalar to multiply
   * @returns This instance.
   */
  multiplyScalar(s: number): this {
    const te = this.elements;

    te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
    te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
    te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
    te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

    return this;
  }

  /**
   * Computes and returns the determinant of this matrix.
   * @returns The determinate.
   */
  determinant(): number {
    const te = this.elements;

    const n11 = te[0]; const n12 = te[4]; const n13 = te[8]; const
      n14 = te[12];
    const n21 = te[1]; const n22 = te[5]; const n23 = te[9]; const
      n24 = te[13];
    const n31 = te[2]; const n32 = te[6]; const n33 = te[10]; const
      n34 = te[14];
    const n41 = te[3]; const n42 = te[7]; const n43 = te[11]; const
      n44 = te[15];

    return (
      n41 * (+n14 * n23 * n32 - n13 * n24 * n32
       - n14 * n22 * n33 + n12 * n24 * n33
       + n13 * n22 * n34 - n12 * n23 * n34) +
			n42 * (+n11 * n23 * n34 - n11 * n24 * n33
       + n14 * n21 * n33 - n13 * n21 * n34
       + n13 * n24 * n31 - n14 * n23 * n31) +
			n43 * (+n11 * n24 * n32 - n11 * n22 * n34
       - n14 * n21 * n32 + n12 * n21 * n34
       + n14 * n22 * n31 - n12 * n24 * n31) +
			n44 * (-n13 * n22 * n31 - n11 * n23 * n32
       + n11 * n22 * n33 + n13 * n21 * n32
       - n12 * n21 * n33 + n12 * n23 * n31)
    );
  }

  /**
   * Transposes this matrix.
   * @returns This instance.
   */
  transpose(): this {
    const te = this.elements;
    let tmp: number;

    tmp = te[1]; te[1] = te[4]; te[4] = tmp;
    tmp = te[2]; te[2] = te[8]; te[8] = tmp;
    tmp = te[6]; te[6] = te[9]; te[9] = tmp;

    tmp = te[3]; te[3] = te[12]; te[12] = tmp;
    tmp = te[7]; te[7] = te[13]; te[13] = tmp;
    tmp = te[11]; te[11] = te[14]; te[14] = tmp;

    return this;
  }

  /**
   * Sets the position component for this matrix from 
   * vector v, without affecting the rest of the matrix 
   * - i.e. if the matrix is currently:
   * ```
   * a, b, c, d,
   * e, f, g, h,
   * i, j, k, l,
   * m, n, o, p
   * ```
   * This becomes:
   * ```
   * a, b, c, v.x,
   * e, f, g, v.y,
   * i, j, k, v.z,
   * m, n, o, p
   * ```
   * @param position - The position vector.
   * @returns This instance.
   */
  setPosition(position: Vector3): this;

  /**
   * Sets the position component for this matrix from 
   * vector v, without affecting the rest of the matrix
   * @param x - The X component of position
   * @param y - The Y component of position
   * @param z - The Z component of position
   * @returns This instance.
   */
  setPosition(x: number, y: number, z: number): this;

  setPosition(...params: [Vector3] | [number, number, number]): this {
    const te = this.elements;

    if (params.length === 1) {
      te[12] = params[0].x;
      te[13] = params[0].y;
      te[14] = params[0].z;
    } else {
      te[12] = params[0];
      te[13] = params[1];
      te[14] = params[2];
    }

    return this;
  }

  /**
   * Inverts this matrix, using the analytic method.
   * You can not invert with a determinant of zero.
   * If you attempt this, the method produces a zero matrix instead.
   * @returns This instance. 
   */
  invert(): this {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    const te = this.elements;

    const n11 = te[0]; const n21 = te[1]; const n31 = te[2]; const n41 = te[3];
    const n12 = te[4]; const n22 = te[5]; const n32 = te[6]; const n42 = te[7];
    const n13 = te[8]; const n23 = te[9]; const n33 = te[10]; const n43 = te[11];
    const n14 = te[12]; const n24 = te[13]; const n34 = te[14]; const n44 = te[15];

    const t11 = n23 * n34 * n42 - n24 * n33 * n42
      + n24 * n32 * n43 - n22 * n34 * n43
      - n23 * n32 * n44 + n22 * n33 * n44;
    const t12 = n14 * n33 * n42 - n13 * n34 * n42
      - n14 * n32 * n43 + n12 * n34 * n43
      + n13 * n32 * n44 - n12 * n33 * n44;
    const t13 = n13 * n24 * n42 - n14 * n23 * n42
      + n14 * n22 * n43 - n12 * n24 * n43
      - n13 * n22 * n44 + n12 * n23 * n44;
    const t14 = n14 * n23 * n32 - n13 * n24 * n32
      - n14 * n22 * n33 + n12 * n24 * n33
      + n13 * n22 * n34 - n12 * n23 * n34;

    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    const detInv = 1 / det;

    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41
       - n24 * n31 * n43 + n21 * n34 * n43
       + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41
       + n24 * n31 * n42 - n21 * n34 * n42
       - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41
       - n23 * n31 * n42 + n21 * n33 * n42
       + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41
       + n14 * n31 * n43 - n11 * n34 * n43
       - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41
       - n14 * n31 * n42 + n11 * n34 * n42
       + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41
       + n13 * n31 * n42 - n11 * n33 * n42
       - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41
       - n14 * n21 * n43 + n11 * n24 * n43
       + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41
       + n14 * n21 * n42 - n11 * n24 * n42
       - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41
       - n13 * n21 * n42 + n11 * n23 * n42
       + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31
       + n14 * n21 * n33 - n11 * n24 * n33
       - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31
       - n14 * n21 * n32 + n11 * n24 * n32
       + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31
       + n13 * n21 * n32 - n11 * n23 * n32
       - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

    return this;
  }

  /**
   * Multiplies the columns of this matrix by vector v.
   * @param v - The vector to scale components by.
   * @returns This instance.
   */
  scale(v: Vector3): this {
    const te = this.elements;
    const { x } = v; const { y } = v; const
      { z } = v;

    te[0] *= x; te[4] *= y; te[8] *= z;
    te[1] *= x; te[5] *= y; te[9] *= z;
    te[2] *= x; te[6] *= y; te[10] *= z;
    te[3] *= x; te[7] *= y; te[11] *= z;

    return this;
  }

  /**
   * Gets the maximum scale value of the 3 axes.
   * @returns The maximum scale value.
   */
  getMaxScaleOnAxis(): number {
    const te = this.elements;

    const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  }

  /**
   * Sets this matrix as a translation transform:
   * ```
   * 1, 0, 0, x,
   * 0, 1, 0, y,
   * 0, 0, 1, z,
   * 0, 0, 0, 1
   * ```
   * @param x - the amount to translate in the X axis.
   * @param y - the amount to translate in the Y axis.
   * @param z - the amount to translate in the Z axis.
   * @returns This instance.
   */
  makeTranslation(x: number, y: number, z: number): this {
    this.set(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1,
    );

    return this;
  }

  /**
   * Sets this matrix as a rotational transformation around the X axis by theta (θ) radians. 
   * The resulting matrix will be:
   * ```
   * 1 0      0        0
   * 0 cos(θ) -sin(θ)  0
   * 0 sin(θ) cos(θ)   0
   * 0 0      0        1
   * ```
   * @param theta - Rotation angle in radians.
   * @returns This instance.
   */
  makeRotationX(theta: number): this {
    const c = Math.cos(theta); const
      s = Math.sin(theta);

    this.set(

      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Sets this matrix as a rotational transformation around the Y axis 
   * by theta (θ) radians. The resulting matrix will be:
   * ```
   * cos(θ)  0 sin(θ) 0
   * 0       1 0      0
   * -sin(θ) 0 cos(θ) 0
   * 0       0 0      1
   * ```
   * @param theta - Rotation angle in radians.
   * @returns This instance.
   */
  makeRotationY(theta: number): this {
    const c = Math.cos(theta); const
      s = Math.sin(theta);

    this.set(

      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Sets this matrix as a rotational transformation around the Z axis 
   * by theta (θ) radians. The resulting matrix will be:
   * ```
   * cos(θ) -sin(θ) 0 0
   * sin(θ) cos(θ)  0 0
   * 0      0       1 0
   * 0      0       0 1
   * ```
   * @param theta - Rotation angle in radians.
   * @returns This instance.
   */
  makeRotationZ(theta: number): this {
    const c = Math.cos(theta); const
      s = Math.sin(theta);

    this.set(

      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Sets this matrix as rotation transform around axis by theta radians.
   * This is a somewhat controversial but mathematically sound 
   * alternative to rotating via Quaternions. See the discussion 
   * [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199/)
   * @param axis - Rotation axis, should be normalized.
   * @param angle - Rotation angle in radians.
   * @returns This instance
   */
  makeRotationAxis(axis: Vector3, angle: number): this {

    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const { x } = axis; const { y } = axis; const
      { z } = axis;
    const tx = t * x; const
      ty = t * y;

    this.set(

      tx * x + c, tx * y - s * z, tx * z + s * y, 0,
      tx * y + s * z, ty * y + c, ty * z - s * x, 0,
      tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
      0, 0, 0, 1,

    );

    return this;
  }

  /**
   * Sets this matrix as scale transform:
   * ```
   * x, 0, 0, 0,
   * 0, y, 0, 0,
   * 0, 0, z, 0,
   * 0, 0, 0, 1
   * ```
   * @param x - the amount to scale in the X axis.
   * @param y - the amount to scale in the Y axis.
   * @param z - the amount to scale in the Z axis.
   * @returns This instance
   */
  makeScale(x: number, y: number, z: number): this {
    this.set(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1,
    );

    return this;
  }

  /**
   * Sets this matrix as a shear transform:
   * ```
   * 1,   yx,  zx,  0,
   * xy,   1,  zy,  0,
   * xz,  yz,   1,  0,
   * 0,    0,   0,  1
   * ```
   * xy - the amount to shear X by Y.
   * xz - the amount to shear X by Z.
   * yx - the amount to shear Y by X.
   * yz - the amount to shear Y by Z.
   * zx - the amount to shear Z by X.
   * zy - the amount to shear Z by Y.
   * @returns This instance 
   */
   makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): this {

    this.set(

      1, yx, zx, 0,
      xy, 1, zy, 0,
      xz, yz, 1, 0,
      0, 0, 0, 1

    );

    return this;
  }

  /**
   * Sets this matrix to the transformation composed of position, quaternion and scale.
   * @param position - The source position
   * @param quaternion - The source quaternion
   * @param scale - The source scale
   * @returns This instance
   */
  compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this {
    const te = this.elements;

    const x = quaternion._x; const y = quaternion._y;
    const z = quaternion._z; const w = quaternion._w;

    const x2 = x + x; const	y2 = y + y; const z2 = z + z;

    const xx = x * x2; const xy = x * y2; const xz = x * z2;

    const yy = y * y2; const yz = y * z2; const zz = z * z2;
    const wx = w * x2; const wy = w * y2; const wz = w * z2;

    const sx = scale.x; const sy = scale.y; const sz = scale.z;

    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;

    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;

    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;

    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;

    return this;
  }

  /**
   * Decomposes this matrix into its position, quaternion and scale components.
   * 
   * Note: Not all matrices are decomposable in this way. 
   * For example, if an object has a non-uniformly scaled parent, 
   * then the object's world matrix may not be decomposable, 
   * and this method may not be appropriate.
   * @param position - The output position
   * @param quaternion - The output quaternion
   * @param scale - The output vector
   * @returns This instance.
   */
  decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): this {
    const te = this.elements;

    let sx = _v1.set(te[0], te[1], te[2]).length();
    const sy = _v1.set(te[4], te[5], te[6]).length();
    const sz = _v1.set(te[8], te[9], te[10]).length();

    // if determine is negative, we need to invert one scale
    const det = this.determinant();
    if (det < 0) sx = -sx;

    position.x = te[12];
    position.y = te[13];
    position.z = te[14];

    // scale the rotation part
    _m1.copy(this);

    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;

    _m1.elements[0] *= invSX;
    _m1.elements[1] *= invSX;
    _m1.elements[2] *= invSX;

    _m1.elements[4] *= invSY;
    _m1.elements[5] *= invSY;
    _m1.elements[6] *= invSY;

    _m1.elements[8] *= invSZ;
    _m1.elements[9] *= invSZ;
    _m1.elements[10] *= invSZ;

    quaternion.setFromRotationMatrix(_m1);

    scale.x = sx;
    scale.y = sy;
    scale.z = sz;

    return this;
  }

  /**
   * Creates a perspective projection matrix.
   * @param left - The left coordinate 
   * @param right - The right coordinate
   * @param top - The top coordinate
   * @param bottom - The bottom coordinate
   * @param near - The closest distance.
   * @param far - The distance to horizon
   * @returns This insance.
   */
  makePerspective(left: number, right: number,
    top: number, bottom: number,
    near: number, far: number): this {
    const te = this.elements;
    const x = 2 * near / (right - left);
    const y = 2 * near / (top - bottom);

    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    const c = -(far + near) / (far - near);
    const d = -2 * far * near / (far - near);

    te[0] = x;	te[4] = 0;	te[8] = a;	te[12] = 0;
    te[1] = 0;	te[5] = y;	te[9] = b;	te[13] = 0;
    te[2] = 0;	te[6] = 0;	te[10] = c;	te[14] = d;
    te[3] = 0;	te[7] = 0;	te[11] = -1;	te[15] = 0;

    return this;
  }

  /**
   * Creates an orthographic projection matrix.
   * @param left - The left coordinate 
   * @param right - The right coordinate
   * @param top - The top coordinate
   * @param bottom - The bottom coordinate
   * @param near - The closest distance.
   * @param far - The distance to horizon
   * @returns This insance.
   */
  makeOrthographic(left: number, right: number,
    top: number, bottom: number,
    near: number, far: number): this {
    const te = this.elements;
    const w = 1.0 / (right - left);
    const h = 1.0 / (top - bottom);
    const p = 1.0 / (far - near);

    const x = (right + left) * w;
    const y = (top + bottom) * h;
    const z = (far + near) * p;

    te[0] = 2 * w;	te[4] = 0;	te[8] = 0;	te[12] = -x;
    te[1] = 0;	te[5] = 2 * h;	te[9] = 0;	te[13] = -y;
    te[2] = 0;	te[6] = 0;	te[10] = -2 * p;	te[14] = -z;
    te[3] = 0;	te[7] = 0;	te[11] = 0;	te[15] = 1;

    return this;
  }

  /**
   * Test if this matrix and another matrix are value-wise equal.
   * @param matrix 
   * @returns Returns true if equal.
   */
  equals(matrix: Matrix4): boolean {
    const te = this.elements;
    const me = matrix.elements;

    for (let i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }

    return true;
  }

  /**
   * Sets the elements of this matrix based on an array in column-major format.
   * @param array - the array to read the elements from.
   * @param offset - offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset = 0): this {
    for (let i = 0; i < 16; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  }

  /**
   * Writes the elements of this matrix to a array[16] in column-major format.
   * @param array - (optional) array to store the resulting vector in.
   * @param offset - (optional) offset in the array at which to put the result.
   * @returns The new array[16].
   */
  toArray(array: number[] = [], offset = 0): number[] | Matrix4Tuple {
    const te = this.elements;

    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];

    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];

    array[offset + 8] = te[8];
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];

    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];

    return array;
  }
}

const _v1 = new Vector3();
const _m1 = new Matrix4();
const _zero = new Vector3(0, 0, 0);
const _one = new Vector3(1, 1, 1);
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();
