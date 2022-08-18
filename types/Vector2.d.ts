import { Base } from './Base';
import type { Matrix3 } from './Matrix3';
import type { Vector } from './Vector';

export declare type Vector2Tuple = [number, number];
/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of
 * numbers (labeled x and y), which can be used to represent a number
 * of things, such as:
 * * A point in 2D space (i.e. a position on a plane).
 * * A direction and length across a plane. In three.js the length will
 *    always be the Euclidean distance (straight-line distance)
 *    from (0, 0) to (x, y) and the direction is also measured
 *    from (0, 0) towards (x, y).
 * * Any arbitrary ordered pair of numbers.
 *
 * There are other things a 2D vector can be used to represent,
 * such as momentum vectors, complex numbers and so on.
 * However these are the most common uses in three.js.
 *
 * Iterating through a Vector2 instance will yield its
 * components (x, y) in the corresponding order.
 *
 * @example
 * ```
 * const a = new THREE.Vector2( 0, 1 );
 *
 * //no arguments; will be initialised to (0, 0)
 * const b = new THREE.Vector2( );
 *
 * const d = a.distanceTo( b );
 * ```
 */
export declare class Vector2 extends Base implements Vector {
  x: number;
  y: number;
  /**
   * Creates a new Vector2.
   * @param x - (Optional) The x value of this vector. Default is 0.
   * @param y - (Optional) The y value of this vector. Default is 0.
   */
  constructor(x?: number, y?: number);
  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  get isVector(): boolean;
  /**
   * Read-only flag to check if a given object is of type Vector2.
   */
  get isVector2(): boolean;
  /**
   * Alias for x.
   */
  get width(): number;
  set width(value: number);
  /**
   * Alias for y.
   */
  get height(): number;
  set height(value: number);
  /**
   * Sets the x and y components of this vector.
   * @param x - The new x component
   * @param y - The new y component
   * @returns This instance.
   */
  set(x: number, y: number): this;
  /**
   * Sets the x and y values of this vector both equal to scalar.
   * @param scalar - The scalar value to set.
   * @returns This instance.
   */
  setScalar(scalar: number): this;
  setX(x: number): this;
  setY(y: number): this;
  /**
   * Update the component value.
   * @param index - If index equals 0 set x to value. If index equals 1 set y to value
   * @param value - The new component value
   * @returns This instance.
   */
  setComponent(index: number, value: number): this;
  /**
   * Get the component (x or y) indicated by index parameter.
   * @param index - If index equals 0 returns the x value. If index equals 1 returns the y value.
   * @returns The component value
   */
  getComponent(index: number): number;
  /**
   * Create a Vector2 with the same x and y values as this one.
   * @returns A new Vector2 instance.
   */
  clone(): Vector2;
  /**
   * Copies the values of the passed Vector2's x and y properties to this Vector2.
   * @param vec - The source vector.
   * @returns This instance.
   */
  copy(vec: Vector2): this;
  /**
   * Adds a vector to this vector.
   * @param v - The vector to add to this vector.
   * @returns This instance.
   */
  add(v: Vector2): this;
  /**
   * Adds the scalar value s to this vector's x and y values.
   * @param s - The scalar to add to this vector.
   * @returns This instance.
   */
  addScalar(s: number): this;
  /**
   * Sets this vector to a + b.
   * @param a - The 1st vector
   * @param b - The 2nd vector
   * @returns This instance
   */
  addVectors(a: Vector2, b: Vector2): this;
  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The vector to add to this vector.
   * @param s - The scalar to multiply this vectory by.
   * @returns This instance.
   */
  addScaledVector(v: Vector2, s: number): this;
  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract from this vector.
   * @returns This instance.
   */
  sub(v: Vector2): this;
  /**
   * Subtracts s from this vector's x and y components.
   * @param s - The scalar to subtract from each of this vector's components.
   * @returns This instance.
   */
  subScalar(s: number): this;
  /**
   * Sets this vector to a - b.
   * @param a
   * @param b
   * @returns This instance.
   */
  subVectors(a: Vector2, b: Vector2): this;
  /**
   * Multiplies this vector by v.
   * @param v - The vector to multiply this vector by.
   * @returns This instance.
   */
  multiply(v: Vector2): this;
  /**
   * Multiplies this vector by scalar s.
   * @param scalar - The scalar to multiple this vector by.
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this;
  /**
   * Divides this vector by v.
   * @param v - The vector to device into this vector.
   * @returns This instance.
   */
  divide(v: Vector2): this;
  /**
   * Divides this vector by scalar s.
   * @param scalar
   * @returns This instance.
   */
  divideScalar(scalar: number): this;
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
   * @param m - The matrix to apply.
   * @returns This instance.
   */
  applyMatrix3(m: Matrix3): this;
  /**
   * If this vector's x or y value is greater than v's x or y value,
   * replace that value with the corresponding min value.
   * @param v
   * @returns This instance.
   */
  min(v: Vector2): this;
  /**
   * If this vector's x or y value is less than v's x or y value,
   * replace that value with the corresponding max value.
   * @param v
   * @returns This instance.
   */
  max(v: Vector2): this;
  /**
   * If this vector's x or y value is greater than the max
   * vector's x or y value, it is replaced by the corresponding value.
   *
   * If this vector's x or y value is less than the min vector's x or y
   * value, it is replaced by the corresponding value.
   * @param min - The minimum x and y values.
   * @param max - The maximum x and y values in the desired range
   * @returns This instance.
   */
  clamp(min: Vector2, max: Vector2): this;
  /**
   * If this vector's x or y values are greater than the max value,
   * they are replaced by the max value.
   *
   * If this vector's x or y values are less than the min value,
   * they are replaced by the min value.
   * @param minVal - the minimum value the components will be clamped to
   * @param maxVal - the maximum value the components will be clamped to
   * @returns This instance.
   */
  clampScalar(minVal: number, maxVal: number): this;
  /**
   * If this vector's length is greater than the max value,
   * it is replaced by the max value.
   *
   * If this vector's length is less than the min value,
   * it is replaced by the min value.
   * @param min - The minimum value the length will be clamped to
   * @param max - The maximum value the length will be clamped to
   * @returns This instance.
   */
  clampLength(min: number, max: number): this;
  /**
   * The components of this vector are rounded down to the nearest integer value.
   * @returns This instance.
   */
  floor(): this;
  /**
   * The x and y components of this vector are rounded up to the nearest integer value.
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
   * Inverts this vector - i.e. sets x = -x and y = -y.
   * @returns This instance.
   */
  negate(): this;
  /**
   * Calculates the dot product of this vector and v.
   * @param v - The other vector.
   * @returns The dot product.
   */
  dot(v: Vector2): number;
  /**
   * Calculates the cross product of this vector and v.
   * Note that a 'cross-product' in 2D is not well-defined.
   * This function computes a geometric cross-product often
   * used in 2D graphics
   * @param v - The other vector.
   * @returns The cross product.
   */
  cross(v: Vector2): number;
  /**
   * Computes the square of the Euclidean length (straight-line length)
   * from (0, 0) to (x, y). If you are comparing the lengths of vectors,
   * you should compare the length squared instead as it is slightly
   * more efficient to calculate.
   * @returns The length squared.
   */
  lengthSq(): number;
  /**
   * Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).
   * @returns The length.
   */
  length(): number;
  /**
   * Computes the [Manhattan length](https://en.wikipedia.org/wiki/Taxicab_geometry)
   * of this vector.
   * @returns The manhattan length.
   */
  manhattanLength(): number;
  /**
   * Converts this vector to a unit vector - that is,
   * sets it equal to a vector with the same direction
   * as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this;
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   * @returns The angle (radians)
   */
  angle(): number;
  /**
   * Computes the distance from this vector to v.
   * @param v - The vector to compute destance to.
   * @returns The distance.
   */
  distanceTo(v: Vector2): number;
  /**
   * Computes the squared distance from this vector to v.
   * If you are just comparing the distance with another
   * distance, you should compare the distance squared
   * instead as it is slightly more efficient to calculate.
   * @param v - The other vector.
   * @returns The distance squared.
   */
  distanceToSquared(v: Vector2): number;
  /**
   * Computes the Manhattan distance from this vector to v.
   * @param v - The other vector
   * @returns The distance.
   */
  manhattanDistanceTo(v: Vector2): number;
  /**
   * Sets this vector to a vector with the same direction as this one, but length l.
   * @param length - The new length of this vector.
   * @returns This instance.
   */
  setLength(length: number): this;
  /**
   * Linearly interpolates between this vector and v, where alpha is the percent
   * distance along the line - alpha = 0 will be this vector, and
   * alpha = 1 will be v.
   * @param v - Vector2 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector2, alpha: number): this;
  /**
   * Sets this vector to be the vector linearly interpolated between v1 and v2 where
   * alpha is the percent distance along the line connecting the two vectors -
   * alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - the starting Vector2.
   * @param v2 - Vector2 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this;
  /**
   * Compare a vector with this vector for equality.
   * @param v - The other vector.
   * @returns Returns true if the components of this vector
   *  and v are strictly equal; false otherwise.
   */
  equals(v: Vector2): boolean;
  /**
   * Sets this vector's x value to be array[ offset ] and y value to be array[ offset + 1 ].
   * @param array - The source array.
   * @param offset - (Optional) Offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Returns an array [x, y], or copies x and y into the provided array.
   * @param array - (optional) array to store this vector to.
   *    If this is not provided, a new array will be created.
   * @param offset - (optional) optional offset into the array.
   * @returns An array.
   */
  toArray(array?: number[], offset?: number): number[];
  /**
   * Rotates this vector around center by angle radians.
   * @param center - The point around which to rotate.
   * @param angle - The angle to rotate, in radians.
   * @returns This instance.
   */
  rotateAround(center: Vector2, angle: number): this;
  /**
   * Set the component of this vector to random values between 0-1.
   * @returns This instance.
   */
  random(): this;
  [Symbol.iterator](): IterableIterator<number>;
}
