import { MathUtils } from './MathUtils';
import { Quaternion } from './Quaternion';
import type { Euler } from './Euler';
import type { Matrix3 } from './Matrix3';
import type { Matrix4 } from './Matrix4';
import type { Spherical } from './Spherical';
import type { Cylindrical } from './Cylindrical'; 
import type { Vector } from './Vector';
import { Base } from './Base';

export type Vector3Tuple = [number, number, number];

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
export class Vector3 extends Base implements Vector {
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
  constructor(x = 0, y = 0, z = 0) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector(): boolean {
    return true;
  }

  /**
   * Read-only flag to check if a given object is of type Vector3.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector3(): boolean {
    return true;
  }

  /**
   * Sets the x, y and z components of this vector.
   * @param x - The x value of this vector.
   * @param y - The y value of this vector.
   * @param z - The z value of this vector.
   * @returns This instance.
   */
  set(x: number, y: number, z?: number): this {
    if (z === undefined) z = this.z; // sprite.scale.set(x,y)

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * Set the x, y and z values of this vector equal to scalar.
   * @param scalar - The scalar value
   * @returns This instance.
   */
  setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;

    return this;
  }

  /**
   * Replace this vector's x value with x.
   * @param x - The new x value.
   * @returns This instance.
   */
  setX(x: number): this {
    this.x = x;

    return this;
  }

  /**
   * Replace this vector's y value with y.
   * @param y - The new x value.
   * @returns This instance.
   */
  setY(y: number): this {
    this.y = y;

    return this;
  }

  /**
   * Replace this vector's z value with z.
   * @param z - The new z value.
   * @returns This instance.
   */
  setZ(z: number): this {
    this.z = z;

    return this;
  }

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
  setComponent(index: 0|1|2, value: number): this {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      default: throw new Error(`index is out of range: ${ index}`);
    }

    return this;
  }

  /**
   * Get a component value by index, [x,y,z].
   * If index equals 0 returns the x value.
   * If index equals 1 returns the y value.
   * If index equals 2 returns the z value.
   *
   * @param index - Index of component to access.
   * @return The x, y or z component specified by index.
   */
  getComponent(index: 0|1|2): number {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      case 2: return this.z;
      default: throw new Error(`index is out of range: ${ index}`);
    }
  }

  /**
   * Create a new vector using the component values of this vector.
   * @returns A new vector3 with the same x, y and z values as this one.
   */
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Copies the values of a vector3's x, y and z properties to this vector3.
   * @param v - The vector to copy onto this vector instance.
   * @returns This instance.
   */
  copy(v: Vector3): this {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
  }

  /**
   * Add a vector to this vector.
   * @param v - The vector to add to this vector.
   * @returns This instance.
   */
  add(v: Vector3): this {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  /**
   * Adds the scalar value s to this vector's x, y and z values.
   * @param s - The scalar
   * @returns This instance.
   */
  addScalar(s: number): this {
    this.x += s;
    this.y += s;
    this.z += s;

    return this;
  }

  /**
   * Sets this vector to a + b.
   * @param a
   * @param b
   * @returns This instance.
   */
  addVectors(a: Vector3, b: Vector3): this {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;

    return this;
  }

  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The source vector.
   * @param s - The scale factor.
   * @returns This instance.
   */
  addScaledVector(v: Vector3, s: number): this {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;

    return this;
  }

  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract.
   * @returns This instance.
   */
  sub(v: Vector3): this {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }

  /**
   * Subtracts s from this vector's x, y and z compnents.
   * @param s - The subtracting vector
   * @returns This instance.
   */
  subScalar(s: number): Vector3 {
    this.x -= s;
    this.y -= s;
    this.z -= s;

    return this;
  }

  /**
   * Sets this vector to a - b.
   * @param a
   * @param b
   * @returns This instance.
   */
  subVectors(a: Vector3, b: Vector3): this {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;
  }

  /**
   * Multiplies this vector by v.
   * @param v
   * @returns This instance.
   */
  multiply(v: Vector3): this {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;

    return this;
  }

  /**
   * Multiplies this vector by scalar s.
   * @param scalar
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;
  }

  /**
   * Sets this vector equal to a * b, component-wise.
   * @param a
   * @param b
   * @returns This instance.
   */
  multiplyVectors(a: Vector3, b: Vector3): this {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;

    return this;
  }

  /**
   * Applies euler transform to this vector by converting the Euler object to a Quaternion and applying.
   * @param euler
   * @returns This instance.
   */
  applyEuler(euler: Euler): this {
    return this.applyQuaternion(_quaternion.setFromEuler(euler));
  }

  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   * @param axis
   * @param angle
   * @returns This instance.
   */
  applyAxisAngle(axis: Vector3, angle: number): this {
    return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));
  }

  /**
   * Multiplies this vector by m
   * @param m
   * @returns This instance.
   */
  applyMatrix3(m: Matrix3): this {
    const { x, y, z } = this;
    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;

    return this;
  }

  /**
   * Multiplies this vector by normal matrix m and normalizes the result.
   * @param m
   * @returns This instance.
   */
  applyNormalMatrix(m: Matrix3): this {
    return this.applyMatrix3(m).normalize();
  }

  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) and m, and divides by perspective.
   * @param m
   * @returns This instance.
   */
  applyMatrix4(m: Matrix4): this {
    const { x, y, z } = this;
    const e = m.elements;

    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

    return this;
  }

  /**
   * Applies a Quaternion transform to this vector.
   * @param q
   * @returns This instance.
   */
  applyQuaternion(q: Quaternion): this {
    const { x, y, z } = this;
    const qx = q.x;
    const qy = q.y;
    const qz = q.z;
    const qw = q.w;

    // calculate quat * vector

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return this;
  }

  /**
   * Transforms the direction of this vector by a matrix
   * (the upper left 3 x 3 subset of a m) and then normalizes the result.
   * @param m
   * @returns This instance.
   */
  transformDirection(m: Matrix4): this {
    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction

    const { x, y, z } = this;
    const e = m.elements;

    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;

    return this.normalize();
  }

  /**
   * Divides this vector by v.
   * @param v
   * @returns This instance.
   */
  divide(v: Vector3): this {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;

    return this;
  }

  /**
   * Divides this vector by scalar s.
   * Sets vector to ( 0, 0, 0 ) if *s = 0*.
   * @param scalar
   * @returns This instance.
   */
  divideScalar(scalar: number): this {
    return this.multiplyScalar(1 / scalar);
  }

  /**
   * If this vector's x, y or z value is greater than v's x, y or z value,
   * replace that value with the corresponding min value.
   * @param v
   * @returns This instance.
   */
  min(v: Vector3): this {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);

    return this;
  }

  /**
   * If this vector's x, y or z value is less than v's x, y or z value,
   * replace that value with the corresponding max value.
   * @param v
   * @returns This instance.
   */
  max(v: Vector3): this {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);

    return this;
  }

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
  clamp(min: Vector3, max: Vector3): this {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));

    return this;
  }

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
  clampScalar(minVal: number, maxVal: number): this {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));

    return this;
  }

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
    this.z = Math.floor(this.z);

    return this;
  }

  /**
   * The x, y and z components of this vector are rounded up to the nearest integer value.
   * @returns This instance.
   */
  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);

    return this;
  }

  /**
   * The components of this vector are rounded to the nearest integer value.
   * @returns This instance.
   */
  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

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
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

    return this;
  }

  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   * @returns This instance.
   */
  negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
  }

  /**
   * Calculate the dot product of this vector and v.
   * @param v
   * @returns The dot product.
   */
  dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors,
   * you should compare the length squared instead as it is slightly more
   * efficient to calculate.
   *
   * @returns The sum of the components squared.
   */
  lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   * @returns The square-root of the sum of the components squared.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Computes the Manhattan length of this vector.
   * @returns The Manhattan length.
   */
  manhattanLength(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  /**
   * Convert this vector to a unit vector - that is, sets it equal to a
   * vector with the same direction as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this {
    return this.divideScalar(this.length() || 1);
  }

  /**
   * Set this vector to a vector with the same direction as this one,
   * but the specified length.
   * @param length
   * @returns This instance.
   */
  setLength(length: number): this {
    return this.normalize().multiplyScalar(length);
  }

  /**
   * Linearly interpolate between this vector and v, where alpha is the
   * percent distance along the line - alpha = 0 will be this vector,
   * and alpha = 1 will be v.
   * @param v - The vector to interpolate towards.
   * @param alpha - The interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector3, alpha: number): this {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;

    return this;
  }

  /**
   * Sets this vector to be the vector linearly interpolated between v1 and v2
   * where alpha is the percent distance along the line connecting the two
   * vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - The starting Vector3.
   * @param v2 - The vector to interpolate towards.
   * @param alpha - The interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;

    return this;
  }

  /**
   * Sets this vector to the cross product of itself and v.
   * @param v
   * @returns This instance.
   */
  cross(v: Vector3): this {
    return this.crossVectors(this, v);
  }

  /**
   * Sets this vector to cross product of a and b.
   * @param a
   * @param b
   * @returns This instance.
   */
  crossVectors(a: Vector3, b: Vector3): this {
    const ax = a.x;
    const ay = a.y;
    const az = a.z;

    const bx = b.x;
    const by = b.y;
    const bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }

  /**
   * Projects this vector onto v.
   * @param v
   *
   */
  projectOnVector(v: Vector3): this {
    const denominator = v.lengthSq();

    if (denominator === 0) return this.set(0, 0, 0);

    const scalar = v.dot(this) / denominator;

    return this.copy(v).multiplyScalar(scalar);
  }

  /**
   * Projects this vector onto a plane by subtracting this vector
   * projected onto the plane's normal from this vector.
   * @param planeNormal - A vector representing a plane normal.
   * @returns This instance.
   */
  projectOnPlane(planeNormal: Vector3): this {
    _vector.copy(this).projectOnVector(planeNormal);

    return this.sub(_vector);
  }

  /**
   * Reflect this vector off of plane orthogonal to normal.
   * Normal is assumed to have unit length.
   * @param normal - A vector representing a plane normal.
   * @returns This instance.
   */
  reflect(normal: Vector3): this {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
  }

  /**
   * Returns the angle between this vector and vector v in radians.
   * @param v
   * @returns The angle.
   */
  angleTo(v: Vector3): number {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());

    if (denominator === 0) return Math.PI / 2;

    const theta = this.dot(v) / denominator;

    // clamp, to handle numerical problems

    return Math.acos(MathUtils.clamp(theta, -1, 1));
  }

  /**
   * Computes the distance from this vector to v.
   * @param v
   * @returns The distance.
   */
  distanceTo(v: Vector3): number {
    return Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Computes the squared distance from this vector to v.
   * If you are just comparing the distance with another distance,
   * you should compare the distance squared instead as it is
   * slightly more efficient to calculate.
   * @param v
   * @returns The squared distance.
   */
  distanceToSquared(v: Vector3): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;

    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Computes the Manhattan distance from this vector to v.
   * @param v
   * @returns The Manhattan distance.
   */
  manhattanDistanceTo(v: Vector3): number {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }

  /**
   * Sets this vector from the spherical coordinates s.
   * @param s
   * @returns This instance.
   */
  setFromSpherical(s: Spherical): Vector3 {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  }

  /**
   * Sets this vector from the spherical coordinates radius, phi and theta.
   * @param radius
   * @param phi
   * @param theta
   * @returns This instance.
   */
  setFromSphericalCoords(radius: number, phi: number, theta: number): Vector3 {
    const sinPhiRadius = Math.sin(phi) * radius;

    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);

    return this;
  }

  /**
   * Sets this vector from the cylindrical coordinates c.
   * @param c
   * @returns This instance.
   */
  setFromCylindrical(c: Cylindrical): Vector3 {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  }

  /**
   * Sets this vector from the cylindrical coordinates radius, theta and y.
   * @param radius
   * @param theta
   * @param y
   * @returns This instance.
   */
  setFromCylindricalCoords(radius: number, theta: number, y: number): Vector3 {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);

    return this;
  }

  /**
   * Sets this vector to the position elements of the transformation matrix m.
   * @param m
   * @returns This instance.
   */
  setFromMatrixPosition(m: Matrix4): Vector3 {
    const e = m.elements;

    this.x = e[12];
    this.y = e[13];
    this.z = e[14];

    return this;
  }

  /**
   * Sets this vector to the scale elements of the transformation matrix m.
   * @param m
   * @returns This instance.
   */
  setFromMatrixScale(m: Matrix4): Vector3 {
    const sx = this.setFromMatrixColumn(m, 0).length();
    const sy = this.setFromMatrixColumn(m, 1).length();
    const sz = this.setFromMatrixColumn(m, 2).length();

    this.x = sx;
    this.y = sy;
    this.z = sz;

    return this;
  }

  /**
   * Sets this vector's x, y and z components from index column of matrix.
   * @param m
   * @param index
   * @returns This instance.
   */
  setFromMatrixColumn(m: Matrix4, index: number): Vector3 {
    return this.fromArray(m.elements, index * 4);
  }

  /**
   * Sets this vector's x, y and z components from index column of matrix.
   * @param m
   * @param index
   * @returns This instance.
   */
  setFromMatrix3Column(m: Matrix3, index: number): Vector3 {
    return this.fromArray(m.elements, index * 3);
  }

  /**
   * Sets this vector's x, y and z components from an euler's state.
   * @param e - The euler from which to set this state.
   * @returns This instance.
   */
  setFromEuler(e: Euler): this {
    this.x = e._x;
    this.y = e._y;
    this.z = e._z;
    return this;
  }

  /**
   * Checks for strict equality of this vector and v.
   * @param v
   * @returns true if equal; false otherwise.
   */
  equals(v: Vector3): boolean {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
  }

  /**
   * Sets this vector's x value to be array[ offset + 0 ],
   * y value to be array[ offset + 1 ] and z value to be array[ offset + 2 ].
   * @param array - The source array.
   * @param [offset=0] - Offset into the array.
   * @returns This instance.
   */
  fromArray(array: number[], offset = 0): Vector3 {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];

    return this;
  }

  /**
   * Returns an array [x, y, z], or copies x, y and z into the provided array.
   * @param array - Array to store this vector to. If this is not provided a new array will be created.
   * @param offset - Optional offset into the array.
   * @returns Array with this vector compoonent values, [x,y,z].
   */
  toArray(array: number[] | Vector3Tuple = new Array<number>(3), offset = 0): number[] {
    const idx = typeof offset === 'number' ? offset : 0;
    array[idx] = this.x;
    array[idx + 1] = this.y;
    array[idx + 2] = this.z;

    return array;
  }

  /**
   * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  random(): Vector3 {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();

    return this;
  }

  /**
   * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  randomDirection(): this {
    
		// Derived from https://mathworld.wolfram.com/SpherePointPicking.html

		const u = ( Math.random() - 0.5 ) * 2;
		const t = Math.random() * Math.PI * 2;
		const f = Math.sqrt( 1 - u ** 2 );

		this.x = f * Math.cos( t );
		this.y = f * Math.sin( t );
		this.z = u;

		return this;
  }

  *[ Symbol.iterator ](): IterableIterator<number> {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}

const _vector = new Vector3();
const _quaternion = new Quaternion();
