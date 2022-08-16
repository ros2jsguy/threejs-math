import { Base } from './Base';
import type { Matrix3 } from './Matrix3';
import type { Vector } from './Vector';


export type Vector2Tuple = [number, number];

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
export class Vector2 extends Base implements Vector {
  x: number;
  y: number;

  /**
   * Creates a new Vector2.
   * @param x - (Optional) The x value of this vector. Default is 0.
   * @param y - (Optional) The y value of this vector. Default is 0.
   */
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }

  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector(): boolean {
    return true;
  }

  /**
   * Read-only flag to check if a given object is of type Vector2.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector2(): boolean {
    return true;
  }

  /**
   * Alias for x.
   */
  get width() {
    return this.x;
  }

  set width(value: number) {
    this.x = value;
  }

  /**
   * Alias for y.
   */
  get height() {
    return this.y;
  }

  set height(value: number) {
    this.y = value;
  }

  /**
   * Sets the x and y components of this vector.
   * @param x - The new x component
   * @param y - The new y component
   * @returns This instance.
   */
  set(x: number, y: number): this {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Sets the x and y values of this vector both equal to scalar.
   * @param scalar - The scalar value to set.
   * @returns This instance.
   */
  setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;

    return this;
  }

  setX(x: number): this {
    this.x = x;

    return this;
  }

  setY(y: number) {
    this.y = y;

    return this;
  }

  /**
   * Update the component value.
   * @param index - If index equals 0 set x to value. If index equals 1 set y to value
   * @param value - The new component value
   * @returns This instance.
   */
  setComponent(index: number, value: number): this {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      default: throw new Error(`index is out of range: ${ index}`);
    }

    return this;
  }

  /**
   * Get the component (x or y) indicated by index parameter.
   * @param index - If index equals 0 returns the x value. If index equals 1 returns the y value.
   * @returns The component value
   */
  getComponent(index: number): number {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      default: throw new Error(`index is out of range: ${ index}`);
    }
  }

  /**
   * Create a Vector2 with the same x and y values as this one.
   * @returns A new Vector2 instance.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Copies the values of the passed Vector2's x and y properties to this Vector2.
   * @param vec - The source vector.
   * @returns This instance.
   */
  copy(vec: Vector2): this {
    this.x = vec.x;
    this.y = vec.y;

    return this;
  }

  /**
   * Adds a vector to this vector.
   * @param v - The vector to add to this vector.
   * @returns This instance.
   */
  add(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Adds the scalar value s to this vector's x and y values.
   * @param s - The scalar to add to this vector.
   * @returns This instance.
   */
  addScalar(s: number): this {
    this.x += s;
    this.y += s;

    return this;
  }

  /**
   * Sets this vector to a + b.
   * @param a - The 1st vector
   * @param b - The 2nd vector
   * @returns This instance
   */
  addVectors(a: Vector2, b: Vector2): this {
    this.x = a.x + b.x;
    this.y = a.y + b.y;

    return this;
  }

  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The vector to add to this vector.
   * @param s - The scalar to multiply this vectory by.
   * @returns This instance.
   */
  addScaledVector(v: Vector2, s: number): this {
    this.x += v.x * s;
    this.y += v.y * s;

    return this;
  }

  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract from this vector.
   * @returns This instance.
   */
  sub(v: Vector2): this {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Subtracts s from this vector's x and y components.
   * @param s - The scalar to subtract from each of this vector's components.
   * @returns This instance.
   */
  subScalar(s: number): this {
    this.x -= s;
    this.y -= s;

    return this;
  }

  /**
   * Sets this vector to a - b.
   * @param a 
   * @param b 
   * @returns This instance.
   */
  subVectors(a: Vector2, b: Vector2): this {
    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
  }

  /**
   * Multiplies this vector by v.
   * @param v - The vector to multiply this vector by.
   * @returns This instance.
   */
  multiply(v: Vector2): this {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  /**
   * Multiplies this vector by scalar s.
   * @param scalar - The scalar to multiple this vector by.
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Divides this vector by v.
   * @param v - The vector to device into this vector.
   * @returns This instance.
   */
  divide(v: Vector2): this {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  /**
   * Divides this vector by scalar s.
   * @param scalar 
   * @returns This instance.
   */
  divideScalar(scalar: number): this {
    return this.multiplyScalar(1 / scalar);
  }

  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
   * @param m - The matrix to apply.
   * @returns This instance.
   */
  applyMatrix3(m: Matrix3): this {
    const { x, y } = this;

    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];

    return this;
  }

  /**
   * If this vector's x or y value is greater than v's x or y value,
   * replace that value with the corresponding min value.
   * @param v 
   * @returns This instance.
   */
  min(v: Vector2): this {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);

    return this;
  }

  /**
   * If this vector's x or y value is less than v's x or y value,
   * replace that value with the corresponding max value.
   * @param v 
   * @returns This instance.
   */
  max(v: Vector2): this {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);

    return this;
  }

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
  clamp(min: Vector2, max: Vector2): this {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));

    return this;
  }

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
  clampScalar(minVal: number, maxVal: number): this {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));

    return this;
  }

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
  clampLength(min: number, max: number): this {
    const length = this.length();

    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  }

  /**
   * The components of this vector are rounded down to the nearest integer value.
   * @returns This instance.
   */
  floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
  }

  /**
   * The x and y components of this vector are rounded up to the nearest integer value.
   * @returns This instance.
   */
  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
  }

  /**
   * The components of this vector are rounded to the nearest integer value.
   * @returns This instance.
   */
  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
  }

  /**
   * The components of this vector are rounded towards zero 
   * (up if negative, down if positive) to an integer value.
   * @returns This instance.
   */
  roundToZero(): this {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

    return this;
  }

  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   * @returns This instance.
   */
  negate(): this {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Calculates the dot product of this vector and v.
   * @param v - The other vector.
   * @returns The dot product.
   */
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculates the cross product of this vector and v. 
   * Note that a 'cross-product' in 2D is not well-defined. 
   * This function computes a geometric cross-product often 
   * used in 2D graphics
   * @param v - The other vector.
   * @returns The cross product.
   */
  cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Computes the square of the Euclidean length (straight-line length)
   * from (0, 0) to (x, y). If you are comparing the lengths of vectors,
   * you should compare the length squared instead as it is slightly
   * more efficient to calculate.
   * @returns The length squared.
   */
  lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).
   * @returns The length.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Computes the [Manhattan length](https://en.wikipedia.org/wiki/Taxicab_geometry)
   * of this vector.
   * @returns The manhattan length.
   */
  manhattanLength(): number {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  /**
   * Converts this vector to a unit vector - that is,
   * sets it equal to a vector with the same direction
   * as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this {
    return this.divideScalar(this.length() || 1);
  }

  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   * @returns The angle (radians)
   */
  angle(): number {
    // computes the angle in radians with respect to the positive x-axis

    const angle = Math.atan2(-this.y, -this.x) + Math.PI;

    return angle;
  }

  /**
   * Computes the distance from this vector to v.
   * @param v - The vector to compute destance to.
   * @returns The distance.
   */
  distanceTo(v: Vector2): number {
    return Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Computes the squared distance from this vector to v.
   * If you are just comparing the distance with another
   * distance, you should compare the distance squared
   * instead as it is slightly more efficient to calculate.
   * @param v - The other vector.
   * @returns The distance squared.
   */
  distanceToSquared(v: Vector2): number {
    const dx = this.x - v.x; const
      dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  /**
   * Computes the Manhattan distance from this vector to v.
   * @param v - The other vector
   * @returns The distance.
   */
  manhattanDistanceTo(v: Vector2): number {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }

  /**
   * Sets this vector to a vector with the same direction as this one, but length l.
   * @param length - The new length of this vector.
   * @returns This instance.
   */
  setLength(length: number): this {
    return this.normalize().multiplyScalar(length);
  }

  /**
   * Linearly interpolates between this vector and v, where alpha is the percent
   * distance along the line - alpha = 0 will be this vector, and
   * alpha = 1 will be v.
   * @param v - Vector2 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector2, alpha: number): this {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;

    return this;
  }

  /**
   * Sets this vector to be the vector linearly interpolated between v1 and v2 where
   * alpha is the percent distance along the line connecting the two vectors - 
   * alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - the starting Vector2.
   * @param v2 - Vector2 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;

    return this;
  }

  /**
   * Compare a vector with this vector for equality.
   * @param v - The other vector.
   * @returns Returns true if the components of this vector
   *  and v are strictly equal; false otherwise.
   */
  equals(v: Vector2): boolean {
    return ((v.x === this.x) && (v.y === this.y));
  }

  /**
   * Sets this vector's x value to be array[ offset ] and y value to be array[ offset + 1 ].
   * @param array - The source array.
   * @param offset - (Optional) Offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset = 0): this {
    this.x = array[offset];
    this.y = array[offset + 1];

    return this;
  }

  /**
   * Returns an array [x, y], or copies x and y into the provided array.
   * @param array - (optional) array to store this vector to.
   *    If this is not provided, a new array will be created.
   * @param offset - (optional) optional offset into the array.
   * @returns An array.
   */
  toArray(array: number[] = [], offset = 0): number[] {
    array[offset] = this.x;
    array[offset + 1] = this.y;

    return array;
  }

  /**
   * Rotates this vector around center by angle radians.
   * @param center - The point around which to rotate.
   * @param angle - The angle to rotate, in radians.
   * @returns This instance.
   */
  rotateAround(center: Vector2, angle: number): this {
    const c = Math.cos(angle); const
      s = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;

    return this;
  }

  /**
   * Set the component of this vector to random values between 0-1.
   * @returns This instance.
   */
  random(): this {
    this.x = Math.random();
    this.y = Math.random();

    return this;
  }

  *[ Symbol.iterator ](): IterableIterator<number> {
    yield this.x;
    yield this.y;
  }

}
