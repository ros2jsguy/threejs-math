import { Quaternion } from './Quaternion';
import type { Euler } from './Euler';
import type { Matrix3 } from './Matrix3';
import type { Matrix4 } from './Matrix4';
import type { Spherical } from './Spherical';
import type { Cylindrical } from './Cylindrical';
import type { Vector } from './Vector';
import { Base } from './Base';

export declare type Vector3Tuple = [number, number, number];
/**
 * Represents a 3D vector.
 * A 3D vector is an ordered triplet of numbers (labeled x, y, and z),
 * which can be used to represent a number of things, such as:
 * ```
 * * A point in 3D space.
 * * A direction and length in 3D space.
 * * Any arbitrary ordered triplet of numbers.
 * ```
 * There are other things a 3D vector can be used to represent,
 * such as momentum vectors and so on.
 *
 * Iterating through a Vector3 instance will yield its
 * components (x, y, z) in the corresponding order.
 *
 * @example
 * ```
 * const a = new Vector3( 0, 1, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0)
 * const b = new Vector3( );
 *
 * const d = a.distanceTo( b );
 * ```
 */
export declare class Vector3 extends Base implements Vector {
  /**
   * @default 0
   */
  x: number;
  /**
   * @default 0
   */
  y: number;
  /**
   * @default 0
   */
  z: number;
  /**
   * Creates a new Vector3.
   * @param [x=0] - The x value of this vector.
   * @param [y=0] - The y value of this vector.
   * @param [z=0] - The z value of this vector.
   */
  constructor(x?: number, y?: number, z?: number);
  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  get isVector(): boolean;
  /**
   * Read-only flag to check if a given object is of type Vector3.
   */
  get isVector3(): boolean;
  /**
   * Sets the x, y and z components of this vector.
   * @param x - The x value of this vector.
   * @param y - The y value of this vector.
   * @param z - The z value of this vector.
   * @returns This instance.
   */
  set(x: number, y: number, z?: number): this;
  /**
   * Set the x, y and z values of this vector equal to scalar.
   * @param scalar - The scalar value
   * @returns This instance.
   */
  setScalar(scalar: number): this;
  /**
   * Replace this vector's x value with x.
   * @param x - The new x value.
   * @returns This instance.
   */
  setX(x: number): this;
  /**
   * Replace this vector's y value with y.
   * @param y - The new x value.
   * @returns This instance.
   */
  setY(y: number): this;
  /**
   * Replace this vector's z value with z.
   * @param z - The new z value.
   * @returns This instance.
   */
  setZ(z: number): this;
  /**
   * Update a component by index.
   * If index equals 0 set x to value.
   * If index equals 1 set y to value.
   * If index equals 2 set z to value
   *
   * @param index - The component to update
   * @param value - New value
   * @returns This instance.
   */
  setComponent(index: 0 | 1 | 2, value: number): this;
  /**
   * Get a component value by index, [x,y,z].
   * If index equals 0 returns the x value.
   * If index equals 1 returns the y value.
   * If index equals 2 returns the z value.
   *
   * @param index - Index of component to access.
   * @return The x, y or z component specified by index.
   */
  getComponent(index: 0 | 1 | 2): number;
  /**
   * Create a new vector using the component values of this vector.
   * @returns A new vector3 with the same x, y and z values as this one.
   */
  clone(): Vector3;
  /**
   * Copies the values of a vector3's x, y and z properties to this vector3.
   * @param v - The vector to copy onto this vector instance.
   * @returns This instance.
   */
  copy(v: Vector3): this;
  /**
   * Add a vector to this vector.
   * @param v - The vector to add to this vector.
   * @returns This instance.
   */
  add(v: Vector3): this;
  /**
   * Adds the scalar value s to this vector's x, y and z values.
   * @param s - The scalar
   * @returns This instance.
   */
  addScalar(s: number): this;
  /**
   * Sets this vector to a + b.
   * @param a
   * @param b
   * @returns This instance.
   */
  addVectors(a: Vector3, b: Vector3): this;
  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The source vector.
   * @param s - The scale factor.
   * @returns This instance.
   */
  addScaledVector(v: Vector3, s: number): this;
  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract.
   * @returns This instance.
   */
  sub(v: Vector3): this;
  /**
   * Subtracts s from this vector's x, y and z compnents.
   * @param s - The subtracting vector
   * @returns This instance.
   */
  subScalar(s: number): this;
  /**
   * Sets this vector to a - b.
   * @param a
   * @param b
   * @returns This instance.
   */
  subVectors(a: Vector3, b: Vector3): this;
  /**
   * Multiplies this vector by v.
   * @param v
   * @returns This instance.
   */
  multiply(v: Vector3): this;
  /**
   * Multiplies this vector by scalar s.
   * @param scalar
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this;
  /**
   * Sets this vector equal to a * b, component-wise.
   * @param a
   * @param b
   * @returns This instance.
   */
  multiplyVectors(a: Vector3, b: Vector3): this;
  /**
   * Applies euler transform to this vector by converting the Euler object to a Quaternion and applying.
   * @param euler
   * @returns This instance.
   */
  applyEuler(euler: Euler): this;
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   * @param axis
   * @param angle
   * @returns This instance.
   */
  applyAxisAngle(axis: Vector3, angle: number): this;
  /**
   * Multiplies this vector by m
   * @param m
   * @returns This instance.
   */
  applyMatrix3(m: Matrix3): this;
  /**
   * Multiplies this vector by normal matrix m and normalizes the result.
   * @param m
   * @returns This instance.
   */
  applyNormalMatrix(m: Matrix3): this;
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) and m, and divides by perspective.
   * @param m
   * @returns This instance.
   */
  applyMatrix4(m: Matrix4): this;
  /**
   * Applies a Quaternion transform to this vector.
   * @param q
   * @returns This instance.
   */
  applyQuaternion(q: Quaternion): this;
  /**
   * Transforms the direction of this vector by a matrix
   * (the upper left 3 x 3 subset of a m) and then normalizes the result.
   * @param m
   * @returns This instance.
   */
  transformDirection(m: Matrix4): this;
  /**
   * Divides this vector by v.
   * @param v
   * @returns This instance.
   */
  divide(v: Vector3): this;
  /**
   * Divides this vector by scalar s.
   * Sets vector to ( 0, 0, 0 ) if *s = 0*.
   * @param scalar
   * @returns This instance.
   */
  divideScalar(scalar: number): this;
  /**
   * If this vector's x, y or z value is greater than v's x, y or z value,
   * replace that value with the corresponding min value.
   * @param v
   * @returns This instance.
   */
  min(v: Vector3): this;
  /**
   * If this vector's x, y or z value is less than v's x, y or z value,
   * replace that value with the corresponding max value.
   * @param v
   * @returns This instance.
   */
  max(v: Vector3): this;
  /**
   * Restrict this vector component values to the range of their respective min and max vector component values.
   *
   * If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value.
   *
   * If this vector's x, y or z value is less than the min vector's x, y or z value, it is replaced by the corresponding value.
   * @param min - The minimum x, y and z values.
   * @param max - The maximum x, y and z values in the desired range
   * @returns This instance.
   */
  clamp(min: Vector3, max: Vector3): this;
  /**
   * Restrict this vector component values to the range [minVal,maxVal].
   *
   * If this vector's x, y or z values are greater than the max value, they are replaced by the max value.
   *
   * If this vector's x, y or z values are less than the min value, they are replaced by the min value.
   *
   * @param minVal - The minimum component value
   * @param maxVal - The maximum component value
   * @returns This instance.
   */
  clampScalar(minVal: number, maxVal: number): this;
  /**
   * Restrict this vector length the range [min,max].
   *
   * If this vector's length is greater than the max value, the vector will be scaled down so its length is the max value.
   *
   * If this vector's length is less than the min value, the vector will be scaled up so its length is the min value.
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
   * The x, y and z components of this vector are rounded up to the nearest integer value.
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
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   * @returns This instance.
   */
  negate(): this;
  /**
   * Calculate the dot product of this vector and v.
   * @param v
   * @returns The dot product.
   */
  dot(v: Vector3): number;
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors,
   * you should compare the length squared instead as it is slightly more
   * efficient to calculate.
   *
   * @returns The sum of the components squared.
   */
  lengthSq(): number;
  /**
   * Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   * @returns The square-root of the sum of the components squared.
   */
  length(): number;
  /**
   * Computes the Manhattan length of this vector.
   * @returns The Manhattan length.
   */
  manhattanLength(): number;
  /**
   * Convert this vector to a unit vector - that is, sets it equal to a
   * vector with the same direction as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this;
  /**
   * Set this vector to a vector with the same direction as this one,
   * but the specified length.
   * @param length
   * @returns This instance.
   */
  setLength(length: number): this;
  /**
   * Linearly interpolate between this vector and v, where alpha is the
   * percent distance along the line - alpha = 0 will be this vector,
   * and alpha = 1 will be v.
   * @param v - The vector to interpolate towards.
   * @param alpha - The interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector3, alpha: number): this;
  /**
   * Sets this vector to be the vector linearly interpolated between v1 and v2
   * where alpha is the percent distance along the line connecting the two
   * vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - The starting Vector3.
   * @param v2 - The vector to interpolate towards.
   * @param alpha - The interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this;
  /**
   * Sets this vector to the cross product of itself and v.
   * @param v
   * @returns This instance.
   */
  cross(v: Vector3): this;
  /**
   * Sets this vector to cross product of a and b.
   * @param a
   * @param b
   * @returns This instance.
   */
  crossVectors(a: Vector3, b: Vector3): this;
  /**
   * Projects this vector onto v.
   * @param v
   *
   */
  projectOnVector(v: Vector3): this;
  /**
   * Projects this vector onto a plane by subtracting this vector
   * projected onto the plane's normal from this vector.
   * @param planeNormal - A vector representing a plane normal.
   * @returns This instance.
   */
  projectOnPlane(planeNormal: Vector3): this;
  /**
   * Reflect this vector off of plane orthogonal to normal.
   * Normal is assumed to have unit length.
   * @param normal - A vector representing a plane normal.
   * @returns This instance.
   */
  reflect(normal: Vector3): this;
  /**
   * Returns the angle between this vector and vector v in radians.
   * @param v
   * @returns The angle.
   */
  angleTo(v: Vector3): number;
  /**
   * Computes the distance from this vector to v.
   * @param v
   * @returns The distance.
   */
  distanceTo(v: Vector3): number;
  /**
   * Computes the squared distance from this vector to v.
   * If you are just comparing the distance with another distance,
   * you should compare the distance squared instead as it is
   * slightly more efficient to calculate.
   * @param v
   * @returns The squared distance.
   */
  distanceToSquared(v: Vector3): number;
  /**
   * Computes the Manhattan distance from this vector to v.
   * @param v
   * @returns The Manhattan distance.
   */
  manhattanDistanceTo(v: Vector3): number;
  /**
   * Sets this vector from the spherical coordinates s.
   * @param s
   * @returns This instance.
   */
  setFromSpherical(s: Spherical): this;
  /**
   * Sets this vector from the spherical coordinates radius, phi and theta.
   * @param radius
   * @param phi
   * @param theta
   * @returns This instance.
   */
  setFromSphericalCoords(radius: number, phi: number, theta: number): this;
  /**
   * Sets this vector from the cylindrical coordinates c.
   * @param c
   * @returns This instance.
   */
  setFromCylindrical(c: Cylindrical): this;
  /**
   * Sets this vector from the cylindrical coordinates radius, theta and y.
   * @param radius
   * @param theta
   * @param y
   * @returns This instance.
   */
  setFromCylindricalCoords(radius: number, theta: number, y: number): this;
  /**
   * Sets this vector to the position elements of the transformation matrix m.
   * @param m
   * @returns This instance.
   */
  setFromMatrixPosition(m: Matrix4): this;
  /**
   * Sets this vector to the scale elements of the transformation matrix m.
   * @param m
   * @returns This instance.
   */
  setFromMatrixScale(m: Matrix4): this;
  /**
   * Sets this vector's x, y and z components from index column of matrix.
   * @param m
   * @param index
   * @returns This instance.
   */
  setFromMatrixColumn(m: Matrix4, index: number): this;
  /**
   * Sets this vector's x, y and z components from index column of matrix.
   * @param m
   * @param index
   * @returns This instance.
   */
  setFromMatrix3Column(m: Matrix3, index: number): this;
  /**
   * Sets this vector's x, y and z components from an euler's state.
   * @param e - The euler from which to set this state.
   * @returns This instance.
   */
  setFromEuler(e: Euler): this;
  /**
   * Checks for strict equality of this vector and v.
   * @param v
   * @returns true if equal; false otherwise.
   */
  equals(v: Vector3): boolean;
  /**
   * Sets this vector's x value to be array[ offset + 0 ],
   * y value to be array[ offset + 1 ] and z value to be array[ offset + 2 ].
   * @param array - The source array.
   * @param [offset=0] - Offset into the array.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Returns an array [x, y, z], or copies x, y and z into the provided array.
   * @param array - Array to store this vector to. If this is not provided a new array will be created.
   * @param offset - Optional offset into the array.
   * @returns Array with this vector compoonent values, [x,y,z].
   */
  toArray(array?: number[] | Vector3Tuple, offset?: number): number[];
  /**
   * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  random(): this;
  /**
   * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  randomDirection(): this;
  [Symbol.iterator](): IterableIterator<number>;
}
