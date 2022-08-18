import { Base } from './Base';
import type { Matrix4 } from './Matrix4';
import type { Quaternion } from './Quaternion';
import type { Vector } from './Vector';
/**
 * Class representing a 4D vector. A 4D vector is an ordered
 * quadruplet of numbers (labeled x, y, z, and w), which can
 * be used to represent a number of things, such as:
 * * A point in 4D space.
 * * A direction and length in 4D space. The length
 * will always be the Euclidean distance (straight-line distance)
 * from (0, 0, 0, 0) to (x, y, z, w) and the direction is also
 * measured from (0, 0, 0, 0) towards (x, y, z, w).
 * * Any arbitrary ordered quadruplet of numbers.
 *
 * Iterating through a Vector4 instance will yield its
 * components (x, y, z, w) in the corresponding order.
 *
 * @example
 * ```
 * const a = new THREE.Vector4( 0, 1, 0, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0, 1)
 * const b = new THREE.Vector4( );
 *
 * const d = a.dot( b );
 * ```
 */
export declare class Vector4 extends Base implements Vector {
  x: number;
  y: number;
  z: number;
  w: number;
  /**
   * Creates a new Vector4.
   * @param x - the x value of this vector. Default is 0.
   * @param y - the y value of this vector. Default is 0.
   * @param z - the z value of this vector. Default is 0.
   * @param w - the w value of this vector. Default is 0.
   */
  constructor(x?: number, y?: number, z?: number, w?: number);
  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  get isVector(): boolean;
  /**
   * Read-only flag to check if a given object is of type Vector4.
   */
  get isVector4(): boolean;
  /**
   * Alias for z.
   */
  get width(): number;
  set width(value: number);
  /**
   * Alias for w.
   */
  get height(): number;
  set height(value: number);
  /**
   * Sets the x, y, z and w components of this vector.
   * @param x
   * @param y
   * @param z
   * @param w
   * @returns This instance.
   */
  set(x: number, y: number, z: number, w: number): this;
  /**
   * Sets the x, y, z and w values of this vector both equal to scalar.
   * @param scalar
   * @returns This instance.
   */
  setScalar(scalar: number): this;
  setX(x: number): this;
  setY(y: number): this;
  setZ(z: number): this;
  setW(w: number): this;
  /**
   * Set the componet referenced by index.
   * If index equals 0 set x to value.
   * If index equals 1 set y to value.
   * If index equals 2 set z to value.
   * If index equals 3 set w to value.
   * @param index - 0, 1 or 2.
   * @param value - THe new component value
   * @returns This instance.
   */
  setComponent(index: number, value: number): this;
  /**
   * Get the componet referenced by index.
   * If index equals 0 set x to value.
   * If index equals 1 set y to value.
   * If index equals 2 set z to value.
   * If index equals 3 set w to value.
   * @param index - 0, 1 or 2.
   * @returns This instance.
   */
  getComponent(index: number): number;
  /**
   *
   * @returns A new Vector4 instance.
   */
  clone(): Vector4;
  /**
   * Returns a new Vector4 with the same x, y, z and w values as this one.
   * @param v - The source vector.
   * @returns This instance.
   */
  copy(v: Vector4): this;
  /**
   * Adds v to this vector.
   * @param v - The other vector.
   * @returns This instance.
   */
  add(v: Vector4): this;
  /**
   * Adds the scalar value s to this vector's x, y, z and w values
   * @param s - The scalar.
   * @returns This instance.
   */
  addScalar(s: number): this;
  /**
   * Sets this vector to a + b.
   * @param a
   * @param b
   * @returns This instance.
   */
  addVectors(a: Vector4, b: Vector4): this;
  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The vector to add.
   * @param s - The scalar to multply by.
   * @returns This instance.
   */
  addScaledVector(v: Vector4, s: number): this;
  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract from this vector.
   * @returns This instance.
   */
  sub(v: Vector4): this;
  /**
   * Subtracts s from this vector's x, y, z and w components.
   * @param s - The scalar
   * @returns This instance.
   */
  subScalar(s: number): this;
  /**
   * Sets this vector to a - b.
   * @param a
   * @param b
   * @returns This instance.
   */
  subVectors(a: Vector4, b: Vector4): this;
  /**
   * Multiplies this vector by v.
   * @param v - The vector to multiply.
   * @returns This instance.
   */
  multiply(v: Vector4): this;
  /**
   * Multiplies this vector by scalar s.
   * @param scalar - The scalar to multiply by.
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this;
  /**
   * Multiplies this vector by 4 x 4 m.
   * @param m - The Matrix4
   * @returns This instance.
   */
  applyMatrix4(m: Matrix4): this;
  /**
   * Divides this vector by scalar s.
   * @param scalar - The scalar
   * @returns This instance.
   */
  divideScalar(scalar: number): this;
  /**
   * Sets the x, y and z components of this vector
   * to the quaternion's axis and w to the angle.
   * @param q - The source quaternion
   * @returns This instance.
   */
  setAxisAngleFromQuaternion(q: Quaternion): this;
  /**
   * Sets the x, y and z to the axis of rotation and w to the angle.
   * @param m - A Matrix4 of which the upper left 3x3 matrix is a pure rotation matrix.
   * @returns This instance.
   */
  setAxisAngleFromRotationMatrix(m: Matrix4): this;
  /**
   * If this vector's x, y, z or w value is greater than
   * v's x, y, z or w value, replace that value with the
   * corresponding min value.
   * @param v - The other vector.
   * @returns This instance.
   */
  min(v: Vector4): this;
  /**
   * If this vector's x, y, z or w value is less than
   * v's x, y, z or w value, replace that value with
   * the corresponding max value.
   * @param v - The other vector.
   * @returns This instance.
   */
  max(v: Vector4): this;
  /**
   * If this vector's x, y, z or w value is greater than the
   * max vector's x, y, z or w value, it is replaced by the
   * corresponding value.
   *
   * If this vector's x, y, z or w value is less than the min
   * vector's x, y, z or w value, it is replaced by the
   * corresponding value.
   * @param min - The minimum x, y, z and w values.
   * @param max - The maximum x, y, z and w values in the desired range
   * @returns This instance.
   */
  clamp(min: Vector4, max: Vector4): this;
  /**
   * Restrict the min and max component values.
   * If this vector's x, y, z or w values are greater
   * than the max value, they are replaced by the max value.
   *
   * If this vector's x, y, z or w values are less than the
   * min value, they are replaced by the min value.
   * @param minVal - The minimum value the components will be clamped to
   * @param maxVal - The maximum value the components will be clamped to
   * @returns This instance.
   */
  clampScalar(minVal: number, maxVal: number): this;
  /**
   * Restrict the min and max length of this vector.
   * If this vector's length is greater than the max value,
   * it is replaced by the max value.
   * If this vector's length is less than the min value,
   * it is replaced by the min value.
   * @param min - the minimum value the length will be clamped to
   * @param max - the maximum value the length will be clamped to
   * @returns This instance.
   */
  clampLength(min: number, max: number): this;
  /**
   * The components of this vector are rounded down to the nearest integer value.
   * @returns This instance.
   */
  floor(): this;
  /**
   * The x, y, z and w components of this vector are rounded up to the nearest integer value.
   * @returns This instance.
   */
  ceil(): this;
  /**
   * The components of this vector are rounded to the nearest integer value.
   * @returns This instance.
   */
  round(): this;
  /**
   * The components of this vector are rounded towards zero
   * (up if negative, down if positive) to an integer value.
   * @returns This instance.
   */
  roundToZero(): this;
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z and w = -w.
   * @returns This instance.
   */
  negate(): this;
  /**
   * Calculates the dot product of this vector and v.
   * @param v - The other vector.
   * @returns The dot product.
   */
  dot(v: Vector4): number;
  /**
   * Computes the square of the Euclidean length (straight-line length)
   * from (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths
   * of vectors, you should compare the length squared instead as it is
   * slightly more efficient to calculate.
   * @returns The length squared.
   */
  lengthSq(): number;
  /**
   * Computes the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w).
   * @returns The Euclidean length
   */
  length(): number;
  /**
   * Computes the [Manhattan length](https://en.wikipedia.org/wiki/Taxicab_geometry) of this vector.
   * @returns The manhattan length.
   */
  manhattanLength(): number;
  /**
   * Converts this vector to a unit vector - that is, sets it equal
   * to a vector with the same direction as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this;
  /**
   * Sets this vector to a vector with the same direction as this one, but length l.
   * @param length - The new length.
   * @returns This instance.
   */
  setLength(length: number): this;
  /**
   * Linearly interpolates between this vector and v, where alpha is
   * the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be v.
   * @param v - Vector4 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector4, alpha: number): this;
  /**
   * Sets this vector to be the vector linearly interpolated between v1
   * and v2 where alpha is the percent distance along the line connecting
   * the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - The starting Vector4.
   * @param v2 - Vector4 to interpolate towards.
   * @param alpha - Interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector4, v2: Vector4, alpha: number): this;
  /**
   * Compare the components of this vector are strictly equal to those of v.
   * @param v - The other vector.
   * @returns True if the components of this vector and v are strictly equal; false otherwise.
   */
  equals(v: Vector4): boolean;
  /**
   * Sets this vector's x value to be `array[ offset + 0 ]`, y value to be
   * `array[ offset + 1 ]` z value to be `array[ offset + 2 ]`
   * and w value to be `array[ offset + 3 ]`.
   * @param array - The source array.
   * @param offset - (Optional) offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Create an array [x, y, z, w], or copies x, y, z and w into the provided array.
   * @param array - (optional) array to store this vector to.
   *  If this is not provided, a new array will be created.
   * @param offset - (optional) optional offset into the array.
   * @returns The array.
   */
  toArray(array?: number[], offset?: number): number[];
  /**
   * Sets each component of this vector to a pseudo-random
   * value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  random(): this;
  [Symbol.iterator](): IterableIterator<number>;
}
