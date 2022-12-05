import type { Euler } from './Euler';
import type { Matrix4 } from './Matrix4';
import type { Vector3 } from './Vector3';
import { Base } from './Base';
/**
 * Implementation of a quaternion.
 * Quaternions are used to represent rotations.
 *
 * @example
 * ```
 * const quaternion = new Quaternion();
 * quaternion.setFromAxisAngle( new Vector3( 0, 1, 0 ), Math.PI / 2 );
 *
 * const vector = new Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 * ```
 */
export declare class Quaternion extends Base {
  /**
   * This SLERP implementation assumes the quaternion data are managed in flat arrays.
   * @param dist - The output array.
   * @param dstOffset - An offset into the output array.
   * @param src0 - The source array of the starting quaternion.
   * @param srcOffset0 - An offset into the array src0.
   * @param src1 -The source array of the target quatnerion.
   * @param srcOffset1 - An offset into the array src1.
   * @param t - Normalized interpolation factor (between 0 and 1).
   */
  static slerpFlat(dst: number[], dstOffset: number, src0: number[], srcOffset0: number,
    src1: number[], srcOffset1: number, t: number): void;
  /**
   * Multiply 2 quaterions.
   * This multiplication implementation assumes the quaternion data are managed in flat arrays.
   *
   * @param dst - The output array.
   * @param dstOffset - An offset into the output array.
   * @param src0 - The source array of the starting quaternion.
   * @param srcOffset0 - An offset into the array src0.
   * @param src1 - The source array of the target quaternion.
   * @param srcOffset1 - An offset into the array src1.
   */
  static multiplyQuaternionsFlat(dst: number[], dstOffset: number, src0: number[],
    srcOffset0: number, src1: number[], srcOffset1: number): number[];
  _x: number;
  _y: number;
  _z: number;
  _w: number;
  /**
   * Create a new instance. Default is a unit quaternion
   * @param x - x coordinate
   * @param y - y coordinate
   * @param z - z coordinate
   * @param w - w coordinate
   */
  constructor(x?: number, y?: number, z?: number, w?: number);
  /**
   * Read-only flag to check if a given object is of type Quaternion.
   */
  get isQuaternion(): boolean;
  get x(): number;
  set x(value: number);
  get y(): number;
  set y(value: number);
  get z(): number;
  set z(value: number);
  get w(): number;
  set w(value: number);
  /**
   * Sets x, y, z, w properties of this quaternion.
   * @param x
   * @param y
   * @param z
   * @param w
   * @returns This instance.
   */
  set(x: number, y: number, z: number, w: number): this;
  /**
   * Creates a new Quaternion with identical x, y, z and w properties to this one.
   * @returns A new instance.
   */
  clone(): Quaternion;
  /**
   * Copies the x, y, z and w properties of q into this quaternion.
   * @param quaternion
   * @returns This instance.
   */
  copy(quaternion: Quaternion): this;
  /**
   * Sets this quaternion from the rotation specified by Euler angle.
   * @param euler
   * @returns This instance.
   */
  setFromEuler(euler: Euler, update?: boolean): this;
  /**
   * Sets this quaternion from rotation specified by axis and angle.
   * Axis is assumed to be normalized, angle is in radians.
   * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
   * @param axis
   * @param angle
   * @returns This instance.
   */
  setFromAxisAngle(axis: Vector3, angle: number): this;
  /**
   * Sets this quaternion from rotation component of m.
   * @param m - a Matrix4 of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @returns This instance.
   */
  setFromRotationMatrix(m: Matrix4): this;
  /**
   * Sets this quaternion to the rotation required to rotate direction
   * vector vFrom to direction vector vTo.
   * @param vFrom
   * @param vTo
   * @returns This instance.
   */
  setFromUnitVectors(vFrom: Vector3, vTo: Vector3): this;
  /**
   * Find the angle between this quaternion and quaternion q in radians.
   * @param q
   * @returns The angle.
   */
  angleTo(q: Quaternion): number;
  /**
   * Rotates this quaternion by a given angular step to the defined quaternion q.
   * The method ensures that the final quaternion will not overshoot q.
   * @param q - THe target quaternion
   * @param step - The angular step in radians
   * @returns This instance.
   */
  rotateTowards(q: Quaternion, step: number): this;
  /**
   * Sets this quaternion to the identity quaternion; that is,
   * to the quaternion that represents "no rotation".
   * @returns This instance
   */
  identity(): this;
  /**
   * Inverts this quaternion - calculates the conjugate.
   * The quaternion is assumed to have unit length.
   * @returns This instance.
   */
  invert(): this;
  /**
   * Compute the rotational conjugate of this quaternion.
   * The conjugate of a quaternion represents the same rotation
   * in the opposite direction about the rotational axis.
   * @returns The conjugate quaternion.
   */
  conjugate(): this;
  /**
   * Calculates the dot product of quaternions v and this one.
   * @param v
   * @returns The dot product.
   */
  dot(v: Quaternion): number;
  /**
   * Computes the squared Euclidean length (straight-line length) of this
   * quaternion, considered as a 4 dimensional vector. This can be useful
   * if you are comparing the lengths of two quaternions, as this is a
   * slightly more efficient calculation than length().
   * @returns The squared Euclidean length.
   */
  lengthSq(): number;
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   * @returns The Euclidean length.
   */
  length(): number;
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that
   * performs the same rotation as this one, but has length equal to 1.
   * @returns This instance.
   */
  normalize(): this;
  /**
   * Multiplies this quaternion by q.
   * @param q
   * @returns This instance.
   */
  multiply(q: Quaternion): this;
  /**
   * Pre-multiplies this quaternion by q.
   * @param q
   * @returns This instance.
   */
  premultiply(q: Quaternion): this;
  /**
   * Sets this quaternion to a x b.
   * @param a
   * @param b
   * @returns This instance.
   */
  multiplyQuaternions(a: Quaternion, b: Quaternion): this;
  /**
   * Handles the spherical linear interpolation between quaternions.
   * t represents the amount of rotation between this quaternion (where t is 0)
   * and qb (where t is 1). This quaternion is set to the result.
   * Also see the static version of the slerp below.
   * @param qb - The other quaternion rotation
   * @param t - interpolation factor in the closed interval [0, 1].
   * @returns This instance.
   */
  slerp(qb: Quaternion, t: number): this;
  /**
   * Performs a spherical linear interpolation between the given
   * quaternions and stores the result in this quaternion.
   * @param qa
   * @param qb
   * @param t
   * @returns This instance.
   */
  slerpQuaternions(qa: Quaternion, qb: Quaternion, t: number): this;
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   * @returns This instance.
   */
  random(): this;
  /**
   * Compares the x, y, z and w properties of v to the equivalent properties
   * of this quaternion to determine if they represent the same rotation.
   * @param quaternion - quaternion that this quaternion will be compared to.
   * @returns True when equivalance is found; false otherwise.
   */
  equals(quaternion: Quaternion): boolean;
  /**
   * Sets this quaternion's x, y, z and w properties from an array.
   * @param array - array of format (x, y, z, w) used to construct the quaternion.
   * @param [offset] - an offset into the array.
   * @returns This instance.
   */
  fromArray(array: number[], offset?: number): this;
  /**
   * Calculates the numerical elements of this quaternion
   * in an array of format [x, y, z, w].
   * @param array - An optional array to store the quaternion. If not specified, a new array will be created.
   * @param offset - if specified, the result will be copied into this Array.
   * @returns The array equivalent of this quaternion.
   */
  toArray(array?: number[], offset?: number): number[];
  _onChange(callback: () => void): this;
  _onChangeCallback(): void;
  [Symbol.iterator](): IterableIterator<number>;
}
