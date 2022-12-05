import { Base } from './Base';
import type { Matrix } from './Matrix';
import type { Matrix4 } from './Matrix4';
import type { Vector3 } from './Vector3';
/**
 * A class representing a 3x3 matrix.
 *
 * @example
 * ```
 * const m = new Matrix3();
 * ```
 *
 * @remark
 * A Note on Row-Major and Column-Major Ordering
 * The set() method takes arguments in row-major order, while internally
 * they are stored in the elements array in column-major order.
 *
 * This means that calling
 * ```
 * m.set( 11, 12, 13,
 *      21, 22, 23,
 *      31, 32, 33 );
 * ```
 * will result in the elements array containing:
 * ```
 * m.elements = [ 11, 21, 31,
 *                12, 22, 32,
 *                13, 23, 33 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically
 * and most people are used to thinking about matrices in row-major order,
 * the three.js documentation shows matrices in row-major order.
 * Just bear in mind that if you are reading the source code, you'll have
 * to take the transpose of any matrices outlined here to make sense of the calculations.

 */
export declare class Matrix3 extends Base implements Matrix {
  /**
   * A column-major list of matrix values.
   * @default [1, 0, 0, 0, 1, 0, 0, 0, 1]
   */
  elements: number[];
  /**
   * Creates and initializes the Matrix3 to the 3x3 identity matrix.
   */
  constructor();
  /**
   * Read-only flag to check if a given object is of type Matrix.
   */
  get isMatrix(): boolean;
  /**
   * Read-only flag to check if a given object is of type Matrix3.
   */
  get isMatrix3(): boolean;
  /**
   * Sets the 3x3 matrix values to the given row-major sequence of values.
   * @param n11
   * @param n12
   * @param n13
   * @param n21
   * @param n22
   * @param n23
   * @param n31
   * @param n32
   * @param n33
   * @returns This instance.
   */
  set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number,
    n31: number, n32: number, n33: number): this;
  /**
   * Resets this matrix to the 3x3 identity matrix:
   * ```
   * 1, 0, 0
   * 0, 1, 0
   * 0, 0, 1
   * ```
   * @returns This instance.
   */
  identity(): this;
  /**
   * Copies the elements of matrix m into this matrix.
   * @param m - The matrix to copy
   * @returns This instance.
   */
  copy(m: Matrix3): this;
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   * If this matrix is:
   * ```
   * a, b, c,
   * d, e, f,
   * g, h, i
   * ```
   * then the xAxis, yAxis, zAxis will be set to:
   * ```
   * xAxis = (a, d, g)
   * yAxis = (b, e, h)
   * zAxis = (c, f, i)
   * ```
   * @param xAxis
   * @param yAxis
   * @param zAxis
   * @returns This instance.
   */
  extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;
  /**
   * Set this matrix to the upper 3x3 matrix of the Matrix4 m.
   * @param m
   * @returns This instance.
   */
  setFromMatrix4(m: Matrix4): this;
  /**
   * Post-multiplies this matrix by m.
   * @return This instance.
   */
  multiply(m: Matrix3): this;
  /**
   * Pre-multiplies this matrix by m.
   * @param m
   * @returns This instance.
   */
  premultiply(m: Matrix3): this;
  /**
   * Sets this matrix to a x b.
   * @param a
   * @param b
   * @returns This instance.
   */
  multiplyMatrices(a: Matrix3, b: Matrix3): this;
  /**
   * Multiplies every component of the matrix by the scalar value s.
   * @param s
   * @returns This instance.
   */
  multiplyScalar(s: number): this;
  /**
   * Computes the determinant of this matrix.
   * @returns A float.
   */
  determinant(): number;
  /**
   * Inverts this matrix, using the analytic method.
   * You can not invert with a determinant of zero.
   * If you attempt this, the method produces a zero matrix instead.
   * @returns This instance
   */
  invert(): this;
  /**
   * Transposes this matrix in place.
   * @returns This instance.
   */
  transpose(): this;
  /**
   * Sets this matrix as the upper left 3x3 of the normal matrix of the passed matrix4.
   * The normal matrix is the inverse transpose of the matrix m.
   * @param matrix4
   * @returns This instance.
   */
  getNormalMatrix(matrix4: Matrix4): this;
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   * @param r - array to store the resulting vector in.
   * @returns This instance.
   */
  transposeIntoArray(r: number[]): this;
  /**
   * Set this matrix to the upper 3x3 matrix of the Matrix4 m.
   * @param tx - offset x
   * @param ty - offset y
   * @param sx - repeat x
   * @param sy - repeat y
   * @param rotation - rotation, in radians. Positive values rotate counterclockwise
   * @param cx - center x of rotation
   * @param cy - center y of rotation
   * @returns This instance.
   */
  setUvTransform(tx: number, ty: number, sx: number, sy: number,
    rotation: number, cx: number, cy: number): this;
  /**
   * Sets this matrix as a 2D rotational transformation by theta radians.
	 * The resulting matrix will be:
	 * <code>
   * cos(&theta;) -sin(&theta;) 0
   * sin(&theta;) cos(&theta;)  0
   * 0      0       1
   * </code>
   * @param theta  — Rotation angle in radians. Positive values rotate counterclockwise
   * @returns This instance.
   */
  makeRotation(theta: number): this;
  /**
   * Sets this matrix as a 2D scale transform
   * <code>
   * x, 0, 0,
   * 0, y, 0,
   * 0, 0, 1
		</code>
    @param x - the amount to scale in the X axis
    @param y - the amount to scale in the Y axis
    @returns This instance.
   */
  makeScale(x: number, y: number): this;
  /**
   * Sets this matrix as a 2D translation transform:
   * <code>
   * 1, 0, x,
   * 0, 1, y,
   * 0, 0, 1
   * </code>
   * @param - the amount to translate in the X axis.
   * @param - the amount to translate in the Y axis.
   * @returns This instance.
   */
  makeTranslation(x: number, y: number): this;
  /**
   * Scales this matrix with the given scalar values.
   * @param sx - x scale factor
   * @param sy - y scale factor
   * @returns This instance.
   */
  scale(sx: number, sy: number): this;
  /**
   * Rotates this matrix by the given angle (in radians).
   * @param theta - The angle in radians to rotate
   * @returns This instance.
   */
  rotate(theta: number): this;
  /**
   * Translates this matrix by the given scalar values.
   * @param tx - The x direction translation
   * @param ty - The y direction translation
   * @returns This instance.
   */
  translate(tx: number, ty: number): this;
  /**
   * Test if this instance is equivalent to another matrix.
   * @param matrix
   * @returns True if this matrix and m are equal.
   */
  equals(matrix: Matrix3): boolean;
  /**
   * Sets the elements of this matrix based on an array in column-major format.
   * @param array -  the array to read the elements from.
   * @param [offset] -  index of first element in the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Writes the elements of this matrix to an array in column-major format.
   * @param [array=number[]] - array to store the resulting vector in.
   *  If not given a new array will be created.
   * @param [offset=0] - offset in the array at which to put the result.
   * @returns The array param or a new instance
   */
  toArray(array?: number[], offset?: number): number[];
  /**
   * Creates a new Matrix3 and with identical elements to this one.
   * @returns A new instance.
   */
  clone(): Matrix3;
}
