import { Base } from './Base';
import type { Euler } from './Euler';
import type { Matrix } from './Matrix';
import type { Matrix3 } from './Matrix3';
import type { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';

export declare type Matrix4Tuple = [
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
  number
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
export declare class Matrix4 extends Base implements Matrix {
  /** A column-major list of matrix values. */
  elements: number[];
  /**
   * Creates and initializes the Matrix4 to the 4x4 identity matrix.
   */
  constructor();
  /**
   * Read-only flag to check if a given object is of type Matrix.
   */
  get isMatrix(): boolean;
  /**
   * Read-only flag to check if a given object is of type Matrix4.
   */
  get isMatrix4(): boolean;
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
  set(n11: number, n12: number, n13: number, n14: number, n21: number,
    n22: number, n23: number, n24: number, n31: number, n32: number,
    n33: number, n34: number, n41: number, n42: number, n43: number,
    n44: number): this;
  /**
   * Resets this matrix to the identity matrix.
   * @returns This instance.
   */
  identity(): this;
  /**
   * Creates a new Matrix4 with identical elements to this one.
   * @returns A new Matrix4 instance identical this.
   */
  clone(): Matrix4;
  /**
   * Copies the elements of matrix m into this matrix.
   * @param m - The source matrix
   * @returns This instance.
   */
  copy(m: Matrix4): this;
  /**
   * Copies the translation component of the supplied matrix m into
   * this matrix's translation component.
   * @param m - The source matrix
   * @returns This instance.
   */
  copyPosition(m: Matrix4): this;
  /**
   * Set the upper 3x3 elements of this matrix to the values of the Matrix3 m.
   * @param m - The source Matrix3
   * @returns This instance.
   */
  setFromMatrix3(m: Matrix3): this;
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
  extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;
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
  makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;
  /**
   * Extracts the rotation component of the supplied matrix m into this matrix's rotation component.
   * @param m - updated to the matrix's rotation component
   * @returns This instance.
   */
  extractRotation(m: Matrix4): this;
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this
   * matrix to the rotation specified by the given Euler Angle.
   * The rest of the matrix is set to the identity. Depending on
   * the order of the euler, there are six possible outcomes.
   * See this page for a complete list.
   * @param euler - The Euler to update from.
   * @returns This instance.
   */
  makeRotationFromEuler(euler: Euler): this;
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
  makeRotationFromQuaternion(q: Quaternion): this;
  /**
   * Constructs a rotation matrix, looking from eye towards target oriented by the up vector.
   * @param eye - The relative origin
   * @param target - Target position
   * @param up - The up vecotr
   * @returns This instance.
   */
  lookAt(eye: Vector3, target: Vector3, up: Vector3): this;
  /**
   * Post-multiplies this matrix by m.
   * @param m - The matrix to multiply with
   * @returns This instance
   */
  multiply(m: Matrix4): this;
  /**
   * Pre-multiplies this matrix by m.
   * @param m - The matrix to multiply with.
   * @returns This instance.
   */
  premultiply(m: Matrix4): this;
  /**
   * Sets this matrix to a x b.
   * @param a - The 'a' matrix
   * @param b - The 'b' matrix
   * @returns This instance.
   */
  multiplyMatrices(a: Matrix4, b: Matrix4): this;
  /**
   * Multiplies every component of the matrix by a scalar value s.
   * @param s - The scalar to multiply
   * @returns This instance.
   */
  multiplyScalar(s: number): this;
  /**
   * Computes and returns the determinant of this matrix.
   * @returns The determinate.
   */
  determinant(): number;
  /**
   * Transposes this matrix.
   * @returns This instance.
   */
  transpose(): this;
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
  /**
   * Inverts this matrix, using the analytic method.
   * You can not invert with a determinant of zero.
   * If you attempt this, the method produces a zero matrix instead.
   * @returns This instance.
   */
  invert(): this;
  /**
   * Multiplies the columns of this matrix by vector v.
   * @param v - The vector to scale components by.
   * @returns This instance.
   */
  scale(v: Vector3): this;
  /**
   * Gets the maximum scale value of the 3 axes.
   * @returns The maximum scale value.
   */
  getMaxScaleOnAxis(): number;
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
  makeTranslation(x: number, y: number, z: number): this;
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
  makeRotationX(theta: number): this;
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
  makeRotationY(theta: number): this;
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
  makeRotationZ(theta: number): this;
  /**
   * Sets this matrix as rotation transform around axis by theta radians.
   * This is a somewhat controversial but mathematically sound
   * alternative to rotating via Quaternions. See the discussion
   * [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199/)
   * @param axis - Rotation axis, should be normalized.
   * @param angle - Rotation angle in radians.
   * @returns This instance
   */
  makeRotationAxis(axis: Vector3, angle: number): this;
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
  makeScale(x: number, y: number, z: number): this;
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
  makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): this;
  /**
   * Sets this matrix to the transformation composed of position, quaternion and scale.
   * @param position - The source position
   * @param quaternion - The source quaternion
   * @param scale - The source scale
   * @returns This instance
   */
  compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this;
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
  decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): this;
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
  makePerspective(left: number, right: number, top: number,
    bottom: number, near: number, far: number): this;
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
  makeOrthographic(left: number, right: number, top: number,
    bottom: number, near: number, far: number): this;
  /**
   * Test if this matrix and another matrix are value-wise equal.
   * @param matrix
   * @returns Returns true if equal.
   */
  equals(matrix: Matrix4): boolean;
  /**
   * Sets the elements of this matrix based on an array in column-major format.
   * @param array - the array to read the elements from.
   * @param offset - offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Writes the elements of this matrix to a array[16] in column-major format.
   * @param array - (optional) array to store the resulting vector in.
   * @param offset - (optional) offset in the array at which to put the result.
   * @returns The new array[16].
   */
  toArray(array?: number[], offset?: number): number[] | Matrix4Tuple;
}
