import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';
import { MathUtils } from './MathUtils';
import { Base } from './Base';

const _matrix = new Matrix4();
const _quaternion = new Quaternion();

export type IOrder = 'XYZ' | 'YZX' | 'ZXY' | 'XZY' | 'YXZ' | 'ZYX';

/**
 * A class representing Euler Angles.
 * Euler angles describe a rotational transformation by rotating an object
 * on its various axes in specified amounts per axis, and a specified axis order.
 *
 * @example
 * ```
 * const a = new Euler( 0, 1, 1.57, 'XYZ' );
 * const b = new Vector3( 1, 0, 1 );
 * b.applyEuler(a);
 * ```
 */
export class Euler extends Base {
  static readonly DefaultOrder: IOrder = 'XYZ';
  static readonly RotationOrders: IOrder[] = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];

  _x: number;
  _y: number;
  _z: number;

  /**
   * The order in which to apply rotations. Default is 'XYZ', 
   * which means that the object will first be rotated around its X axis,
   * then its Y axis and finally its Z axis. Other possibilities are: 
   * 'YZX', 'ZXY', 'XZY', 'YXZ' and 'ZYX'. These must be in upper case.
   * 
   * Three.js uses intrinsic Tait-Bryan angles. This means that rotations
   * are performed with respect to the local coordinate system.
   * That is, for order 'XYZ', the rotation is first around the
   * local-X axis (which is the same as the world-X axis),
   * then around local-Y (which may now be different from the world Y-axis), 
   * then local-Z (which may be different from the world Z-axis).
   */
  _order: IOrder;

  /**
   * Create a new instance.
   * @param x - (optional) the angle of the x axis in radians. Default is 0.
   * @param y - (optional) the angle of the y axis in radians. Default is 0.
   * @param z - (optional) the angle of the z axis in radians. Default is 0.
   * @param order - (optional) a string representing the order that the
   *              rotations are applied, defaults to 'XYZ' (must be upper case).
   */
  constructor(x = 0, y = 0, z = 0, order = Euler.DefaultOrder) {
    super();
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
  }

  /**
   * Read-only flag to check if a given object is of type Euler.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEuler(): boolean {
    return true;
  }

  /**
   * The current value of the x component.
   */
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this._onChangeCallback();
  }

  /**
   * The current value of the y component.
   */
  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this._onChangeCallback();
  }

  /**
   * The current value of the z component.
   */
  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this._onChangeCallback();
  }

  /**
   * The order in which to apply rotations. Default is 'XYZ', which means
   * that the object will first be rotated around its X axis, then its Y axis
   * and finally its Z axis. Other possibilities are: 'YZX', 'ZXY', 'XZY',
   * 'YXZ' and 'ZYX'. These must be in upper case.
   *
   *  Three.js uses intrinsic Tait-Bryan angles. This means that rotations are
   * performed with respect to the local coordinate system. That is, for
   * order 'XYZ', the rotation is first around the local-X axis
   * (which is the same as the world-X axis), then around local-Y
   * (which may now be different from the world Y-axis), then local-Z
   * (which may be different from the world Z-axis).
   */
  get order(): IOrder {
    return this._order;
  }

  set order(value: IOrder) {
    this._order = value;
    this._onChangeCallback();
  }

  /**
   * Update state.
   * @param x - the angle of the x axis in radians.
   * @param y - the angle of the y axis in radians.
   * @param z - the angle of the z axis in radians.
   * @param [order] - a string representing the order that the rotations are applied.
   * @returns This instance.
   */
  set(x: number, y: number, z: number, order: IOrder): this {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;

    this._onChangeCallback();

    return this;
  }

  /**
   * Create new Euler with the same parameters as this one.
   * @returns The new instance.
   */
  clone(): Euler {
    return new Euler(this._x, this._y, this._z, this._order);
  }

  /**
   * Copies value of euler to this euler.
   * @param euler -
   * @returns This instance.
   */
  copy(euler: Euler): this {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;

    this._onChangeCallback();

    return this;
  }

  /**
   * Update state from rotation matrix.
   * @param m - a Matrix4 of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param order - (optional) a string representing the order that the rotations are applied.
   *                Sets the angles of this euler transform from a pure rotation matrix based
   * on the orientation specified by order.
   * @param update - Call onChange callback
   * @returns This instance.
   */
  setFromRotationMatrix(m: Matrix4, order = this._order, update = true): this {
    const { clamp } = MathUtils;

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    const te = m.elements;
    const m11 = te[0]; const m12 = te[4]; const m13 = te[8];
    const m21 = te[1]; const m22 = te[5]; const m23 = te[9];
    const m31 = te[2]; const m32 = te[6]; const m33 = te[10];

    switch (order) {
      case 'XYZ':

        this._y = Math.asin(clamp(m13, -1, 1));

        if (Math.abs(m13) < 0.9999999) {
          this._x = Math.atan2(-m23, m33);
          this._z = Math.atan2(-m12, m11);
        } else {
          this._x = Math.atan2(m32, m22);
          this._z = 0;
        }

        break;

      case 'YXZ':

        this._x = Math.asin(-clamp(m23, -1, 1));

        if (Math.abs(m23) < 0.9999999) {
          this._y = Math.atan2(m13, m33);
          this._z = Math.atan2(m21, m22);
        } else {
          this._y = Math.atan2(-m31, m11);
          this._z = 0;
        }

        break;

      case 'ZXY':

        this._x = Math.asin(clamp(m32, -1, 1));

        if (Math.abs(m32) < 0.9999999) {
          this._y = Math.atan2(-m31, m33);
          this._z = Math.atan2(-m12, m22);
        } else {
          this._y = 0;
          this._z = Math.atan2(m21, m11);
        }

        break;

      case 'ZYX':

        this._y = Math.asin(-clamp(m31, -1, 1));

        if (Math.abs(m31) < 0.9999999) {
          this._x = Math.atan2(m32, m33);
          this._z = Math.atan2(m21, m11);
        } else {
          this._x = 0;
          this._z = Math.atan2(-m12, m22);
        }

        break;

      case 'YZX':

        this._z = Math.asin(clamp(m21, -1, 1));

        if (Math.abs(m21) < 0.9999999) {
          this._x = Math.atan2(-m23, m22);
          this._y = Math.atan2(-m31, m11);
        } else {
          this._x = 0;
          this._y = Math.atan2(m13, m33);
        }

        break;

      case 'XZY':

        this._z = Math.asin(-clamp(m12, -1, 1));

        if (Math.abs(m12) < 0.9999999) {
          this._x = Math.atan2(m32, m22);
          this._y = Math.atan2(m13, m11);
        } else {
          this._x = Math.atan2(-m23, m33);
          this._y = 0;
        }

        break;

      default:

        console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ${ order}`);
    }

    this._order = order;

    if (update) this._onChangeCallback();

    return this;
  }

  /**
   * Update state from a quaternion.
   * @param q - a normalized quaternion.
   * @param order - (optional) a string representing the order that the rotations are applied.
   *                Sets the angles of this euler transform from a normalized quaternion
   *                based on the orientation specified by order.
   * @param update - Call onChange callback
   * @returns This instance.
   */
  setFromQuaternion(q: Quaternion, order?: IOrder, update?: boolean): this {
    _matrix.makeRotationFromQuaternion(q);

    return this.setFromRotationMatrix(_matrix, order, update);
  }

  /**
   * Set state from a vector
   * @param v - Vector3.
   * @param order - (optional) a string representing the order that the rotations are applied.
   * @returns This instance.
   */
  setFromVector3(v: Vector3, order?: IOrder): this {
    return this.set(v.x, v.y, v.z, order || this._order);
  }

  /**
   * Resets the euler angle with a new order by creating a quaternion from this euler angle and then setting this euler angle with the quaternion and the new order.

WARNING: this discards revolution information.
   * @param newOrder
   * @returns
   */
  reorder(newOrder: IOrder): this {
    // WARNING: this discards revolution information -bhouston

    _quaternion.setFromEuler(this);

    return this.setFromQuaternion(_quaternion, newOrder);
  }

  /**
   * Checks for strict equality of this euler and euler.
   * @param euler
   * @returns True when equality is determined.
   */
  equals(euler: Euler): boolean {
    return (euler._x === this._x) && (euler._y === this._y)
    && (euler._z === this._z) && (euler._order === this._order);
  }

  /**
   * Update state from array.
   * Assigns this euler's x angle to array[0].
   * Assigns this euler's y angle to array[1].
   * Assigns this euler's z angle to array[2].
   * Optionally assigns this euler's order to array[3].
   * @param array array of length 3 or 4. The optional 4th argument corresponds to the order.
   * @returns This instance.
   */
  fromArray(array: [number, number, number, IOrder?]): this {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined) this._order = array[3];

    this._onChangeCallback();

    return this;
  }

  /**
   * Create an array representation of this instance.
   * Returns an array of the form [x, y, z, order ].
   * @param array - Vector3.
   * @param offset - (optional) a string representing the order that the rotations are applied.
   * @returns The array.
   */
  toArray(array: Array<number | IOrder> = [], offset = 0): Array<number | IOrder> {
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;

    return array;
  }

  /**
   * @deprecated since r138, 02cf0df1cb4575d5842fef9c85bb5a89fe020d53
   */
  toVector3(optionalResult?: Vector3): Vector3 {
    console.error( 'THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead' );
    return new Vector3();
    // if (optionalResult) {
    //   return optionalResult.set(this._x, this._y, this._z);
    // } else {
    //   return new Vector3(this._x, this._y, this._z);
    // }
  }

  _onChange(callback: () => void) {
    this._onChangeCallback = callback;

    return this;
  }

  _onChangeCallback() {}

  *[ Symbol.iterator ](): IterableIterator<number | IOrder> {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._order;
  }
}

