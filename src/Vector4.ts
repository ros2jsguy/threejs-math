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
export class Vector4 extends Base implements Vector {
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
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector(): boolean {
    return true;
  }

  /**
   * Read-only flag to check if a given object is of type Vector4.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isVector4(): boolean {
    return true;
  }

  /**
   * Alias for z.
   */
  get width() {
    return this.z;
  }

  set width(value: number) {
    this.z = value;
  }

  /**
   * Alias for w.
   */
  get height() {
    return this.w;
  }

  set height(value) {
    this.w = value;
  }

  /**
   * Sets the x, y, z and w components of this vector.
   * @param x 
   * @param y 
   * @param z 
   * @param w 
   * @returns This instance.
   */
  set(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  }

  /**
   * Sets the x, y, z and w values of this vector both equal to scalar.
   * @param scalar 
   * @returns This instance.
   */
  setScalar(scalar: number) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;

    return this;
  }

  setX(x: number) {
    this.x = x;

    return this;
  }

  setY(y: number) {
    this.y = y;

    return this;
  }

  setZ(z: number) {
    this.z = z;

    return this;
  }

  setW(w: number) {
    this.w = w;

    return this;
  }

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
  setComponent(index: number, value: number) {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      case 3: this.w = value; break;
      default: throw new Error(`index is out of range: ${ index}`);
    }

    return this;
  }

  /**
   * Get the componet referenced by index.
   * If index equals 0 set x to value.    
   * If index equals 1 set y to value.    
   * If index equals 2 set z to value.    
   * If index equals 3 set w to value.    
   * @param index - 0, 1 or 2.
   * @returns This instance.
   */
  getComponent(index: number) {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      case 2: return this.z;
      case 3: return this.w;
      default: throw new Error(`index is out of range: ${ index}`);
    }
  }

  /**
   * 
   * @returns A new Vector4 instance.
   */
  clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  /**
   * Returns a new Vector4 with the same x, y, z and w values as this one.
   * @param v - The source vector.
   * @returns This instance.
   */
  copy(v: Vector4): this {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = (v.w !== undefined) ? v.w : 1;

    return this;
  }

  /**
   * Adds v to this vector.
   * @param v - The other vector.
   * @returns This instance.
   */
  add(v: Vector4): this {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;

    return this;
  }

  /**
   * Adds the scalar value s to this vector's x, y, z and w values
   * @param s - The scalar.
   * @returns This instance.
   */
  addScalar(s: number): this {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;

    return this;
  }

  /**
   * Sets this vector to a + b.
   * @param a 
   * @param b 
   * @returns This instance.
   */
  addVectors(a: Vector4, b: Vector4): this {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;

    return this;
  }

  /**
   * Adds the multiple of v and s to this vector.
   * @param v - The vector to add.
   * @param s - The scalar to multply by.
   * @returns This instance.
   */
  addScaledVector(v: Vector4, s: number): this {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;

    return this;
  }

  /**
   * Subtracts v from this vector.
   * @param v - The vector to subtract from this vector.
   * @returns This instance.
   */
  sub(v: Vector4): this {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;

    return this;
  }

  /**
   * Subtracts s from this vector's x, y, z and w components.
   * @param s - The scalar
   * @returns This instance.
   */
  subScalar(s: number): this {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;

    return this;
  }

  /**
   * Sets this vector to a - b.
   * @param a 
   * @param b 
   * @returns This instance.
   */
  subVectors(a: Vector4, b: Vector4): this {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;

    return this;
  }

  /**
   * Multiplies this vector by v.
   * @param v - The vector to multiply.
   * @returns This instance.
   */
  multiply(v: Vector4): this {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;

    return this;
  }

  /**
   * Multiplies this vector by scalar s.
   * @param scalar - The scalar to multiply by.
   * @returns This instance.
   */
  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;

    return this;
  }

  /**
   * Multiplies this vector by 4 x 4 m.
   * @param m - The Matrix4
   * @returns This instance.
   */
  applyMatrix4(m: Matrix4): this {
    const { x, y, z, w } = this;

    const e = m.elements;

    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

    return this;
  }

  /**
   * Divides this vector by scalar s.
   * @param scalar - The scalar
   * @returns This instance.
   */
  divideScalar(scalar: number): this {
    return this.multiplyScalar(1 / scalar);
  }

  /**
   * Sets the x, y and z components of this vector
   * to the quaternion's axis and w to the angle.
   * @param q - The source quaternion
   * @returns This instance.
   */
  setAxisAngleFromQuaternion(q: Quaternion): this {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

    // q is assumed to be normalized

    this.w = 2 * Math.acos(q.w);

    const s = Math.sqrt(1 - q.w * q.w);

    if (s < 0.0001) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }

    return this;
  }

  /**
   * Sets the x, y and z to the axis of rotation and w to the angle.
   * @param m - A Matrix4 of which the upper left 3x3 matrix is a pure rotation matrix.
   * @returns This instance.
   */
  setAxisAngleFromRotationMatrix(m: Matrix4): this {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    let angle: number;
    let x: number;
    let y: number;
    let z: number;

    const epsilon = 0.01; // margin to allow for rounding errors
    const epsilon2 = 0.1; // margin to distinguish between 0 and 180 degrees

    const te = m.elements;

    const m11 = te[0]; const m12 = te[4]; const m13 = te[8];
    const m21 = te[1]; const m22 = te[5]; const m23 = te[9];
    const m31 = te[2]; const m32 = te[6]; const m33 = te[10];

    if ((Math.abs(m12 - m21) < epsilon)
    && (Math.abs(m13 - m31) < epsilon)
    && (Math.abs(m23 - m32) < epsilon)) {
      // singularity found
      // first check for identity matrix which must have +1 for all terms
      // in leading diagonal and zero in other terms

      if ((Math.abs(m12 + m21) < epsilon2)
       && (Math.abs(m13 + m31) < epsilon2)
        && (Math.abs(m23 + m32) < epsilon2)
        && (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {
        // this singularity is identity matrix so angle = 0

        this.set(1, 0, 0, 0);

        return this; // zero angle, arbitrary axis
      }

      // otherwise this singularity is angle = 180

      angle = Math.PI;

      const xx = (m11 + 1) / 2;
      const yy = (m22 + 1) / 2;
      const zz = (m33 + 1) / 2;
      const xy = (m12 + m21) / 4;
      const xz = (m13 + m31) / 4;
      const yz = (m23 + m32) / 4;

      if ((xx > yy) && (xx > zz)) {
        // m11 is the largest diagonal term

        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        // m22 is the largest diagonal term

        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        // m33 is the largest diagonal term so base result on this
        // eslint-disable-next-line
        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }

      this.set(x, y, z, angle);

      return this; // return 180 deg rotation
    }

    // as we have reached here there are no singularities so we can handle normally

    let s = Math.sqrt((m32 - m23) * (m32 - m23) +
			(m13 - m31) * (m13 - m31) +
			(m21 - m12) * (m21 - m12)); // used to normalize

    if (Math.abs(s) < 0.001) s = 1;

    // prevent divide by zero, should not happen if matrix is orthogonal and should be
    // caught by singularity test above, but I've left it in just in case

    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

    return this;
  }

  /**
   * If this vector's x, y, z or w value is greater than 
   * v's x, y, z or w value, replace that value with the
   * corresponding min value.
   * @param v - The other vector.
   * @returns This instance.
   */
  min(v: Vector4): this {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);

    return this;
  }

  /**
   * If this vector's x, y, z or w value is less than 
   * v's x, y, z or w value, replace that value with
   * the corresponding max value.
   * @param v - The other vector.
   * @returns This instance.
   */
  max(v: Vector4): this {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);

    return this;
  }

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
  clamp(min: Vector4, max: Vector4): this {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    this.w = Math.max(min.w, Math.min(max.w, this.w));

    return this;
  }

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
  clampScalar(minVal: number, maxVal: number): this {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    this.w = Math.max(minVal, Math.min(maxVal, this.w));

    return this;
  }

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
    this.w = Math.floor(this.w);

    return this;
  }

  /**
   * The x, y, z and w components of this vector are rounded up to the nearest integer value.
   * @returns This instance.
   */
  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);

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
    this.w = Math.round(this.w);

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
    this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);

    return this;
  }

  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z and w = -w.
   * @returns This instance.
   */
  negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;

    return this;
  }

  /**
   * Calculates the dot product of this vector and v.
   * @param v - The other vector.
   * @returns The dot product.
   */
  dot(v: Vector4): number {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  /**
   * Computes the square of the Euclidean length (straight-line length)
   * from (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths
   * of vectors, you should compare the length squared instead as it is
   * slightly more efficient to calculate.
   * @returns The length squared.
   */
  lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  /**
   * Computes the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w).
   * @returns The Euclidean length
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  /**
   * Computes the [Manhattan length](https://en.wikipedia.org/wiki/Taxicab_geometry) of this vector.
   * @returns The manhattan length.
   */
  manhattanLength(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }

  /**
   * Converts this vector to a unit vector - that is, sets it equal 
   * to a vector with the same direction as this one, but length 1.
   * @returns This instance.
   */
  normalize(): this {
    return this.divideScalar(this.length() || 1);
  }

  /**
   * Sets this vector to a vector with the same direction as this one, but length l.
   * @param length - The new length.
   * @returns This instance.
   */
  setLength(length: number): this {
    return this.normalize().multiplyScalar(length);
  }

  /**
   * Linearly interpolates between this vector and v, where alpha is
   * the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be v.
   * @param v - Vector4 to interpolate towards.
   * @param alpha - interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerp(v: Vector4, alpha: number): this {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;

    return this;
  }

  /**
   * Sets this vector to be the vector linearly interpolated between v1
   * and v2 where alpha is the percent distance along the line connecting
   * the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
   * @param v1 - The starting Vector4.
   * @param v2 - Vector4 to interpolate towards.
   * @param alpha - Interpolation factor, typically in the closed interval [0, 1].
   * @returns This instance.
   */
  lerpVectors(v1: Vector4, v2: Vector4, alpha: number): this {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    this.w = v1.w + (v2.w - v1.w) * alpha;

    return this;
  }

  /**
   * Compare the components of this vector are strictly equal to those of v.
   * @param v - The other vector.
   * @returns True if the components of this vector and v are strictly equal; false otherwise.
   */
  equals(v: Vector4): boolean {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
  }

  /**
   * Sets this vector's x value to be `array[ offset + 0 ]`, y value to be 
   * `array[ offset + 1 ]` z value to be `array[ offset + 2 ]`
   * and w value to be `array[ offset + 3 ]`.
   * @param array - The source array.
   * @param offset - (Optional) offset into the array. Default is 0.
   * @returns This instance.
   */
  fromArray(array: number[], offset = 0): this {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];

    return this;
  }

  /**
   * Create an array [x, y, z, w], or copies x, y, z and w into the provided array.
   * @param array - (optional) array to store this vector to.
   *  If this is not provided, a new array will be created.
   * @param offset - (optional) optional offset into the array.
   * @returns The array.
   */
  toArray(array: number[] = [], offset = 0): number[] {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    array[offset + 3] = this.w;

    return array;
  }

  /**
   * Sets each component of this vector to a pseudo-random
   * value between 0 and 1, excluding 1.
   * @returns This instance.
   */
  random(): this {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();

    return this;
  }

  *[ Symbol.iterator ](): IterableIterator<number> {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }
}

