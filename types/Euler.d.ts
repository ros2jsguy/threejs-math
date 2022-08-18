import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';
import { Base } from './Base';
export declare type IOrder = 'XYZ' | 'YZX' | 'ZXY' | 'XZY' | 'YXZ' | 'ZYX';
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
export declare class Euler extends Base {
  static readonly DefaultOrder: IOrder;
  static readonly RotationOrders: IOrder[];
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
  constructor(x?: number, y?: number, z?: number, order?: IOrder);
  /**
   * Read-only flag to check if a given object is of type Euler.
   */
  get isEuler(): boolean;
  /**
   * The current value of the x component.
   */
  get x(): number;
  set x(value: number);
  /**
   * The current value of the y component.
   */
  get y(): number;
  set y(value: number);
  /**
   * The current value of the z component.
   */
  get z(): number;
  set z(value: number);
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
  get order(): IOrder;
  set order(value: IOrder);
  /**
   * Update state.
   * @param x - the angle of the x axis in radians.
   * @param y - the angle of the y axis in radians.
   * @param z - the angle of the z axis in radians.
   * @param [order] - a string representing the order that the rotations are applied.
   * @returns This instance.
   */
  set(x: number, y: number, z: number, order: IOrder): this;
  /**
   * Create new Euler with the same parameters as this one.
   * @returns The new instance.
   */
  clone(): Euler;
  /**
   * Copies value of euler to this euler.
   * @param euler -
   * @returns This instance.
   */
  copy(euler: Euler): this;
  /**
   * Update state from rotation matrix.
   * @param m - a Matrix4 of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param order - (optional) a string representing the order that the rotations are applied.
   *                Sets the angles of this euler transform from a pure rotation matrix based
   * on the orientation specified by order.
   * @param update - Call onChange callback
   * @returns This instance.
   */
  setFromRotationMatrix(m: Matrix4, order?: IOrder, update?: boolean): this;
  /**
   * Update state from a quaternion.
   * @param q - a normalized quaternion.
   * @param order - (optional) a string representing the order that the rotations are applied.
   *                Sets the angles of this euler transform from a normalized quaternion
   *                based on the orientation specified by order.
   * @param update - Call onChange callback
   * @returns This instance.
   */
  setFromQuaternion(q: Quaternion, order?: IOrder, update?: boolean): this;
  /**
   * Set state from a vector
   * @param v - Vector3.
   * @param order - (optional) a string representing the order that the rotations are applied.
   * @returns This instance.
   */
  setFromVector3(v: Vector3, order?: IOrder): this;
  /**
   * Resets the euler angle with a new order by creating a quaternion
   * from this euler angle and then setting this euler angle with the quaternion and the new order.
   *
   * WARNING: this discards revolution information.
   * @param newOrder
   * @returns
   */
  reorder(newOrder: IOrder): this;
  /**
   * Checks for strict equality of this euler and euler.
   * @param euler
   * @returns True when equality is determined.
   */
  equals(euler: Euler): boolean;
  /**
   * Update state from array.
   * Assigns this euler's x angle to array[0].
   * Assigns this euler's y angle to array[1].
   * Assigns this euler's z angle to array[2].
   * Optionally assigns this euler's order to array[3].
   * @param array array of length 3 or 4. The optional 4th argument corresponds to the order.
   * @returns This instance.
   */
  fromArray(array: [number, number, number, IOrder?]): this;
  /**
   * Create an array representation of this instance.
   * Returns an array of the form [x, y, z, order ].
   * @param array - Vector3.
   * @param offset - (optional) a string representing the order that the rotations are applied.
   * @returns The array.
   */
  toArray(array?: Array<number | IOrder>, offset?: number): Array<number | IOrder>;
  /**
   * @deprecated since r138, 02cf0df1cb4575d5842fef9c85bb5a89fe020d53
   */
  toVector3(optionalResult?: Vector3): Vector3;
  _onChange(callback: () => void): this;
  _onChangeCallback(): void;
  [Symbol.iterator](): IterableIterator<number | IOrder>;
}
