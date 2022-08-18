import { Matrix3 } from './Matrix3';
import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Line3 } from './Line3';
import { Box3 } from './Box3';
import { Matrix4 } from './Matrix4';
import { Base } from './Base';
/**
 * A two dimensional surface that extends infinitely in 3d space,
 * represented in Hessian normal form by a unit length normal
 * vector and a constant.
 */
export declare class Plane extends Base {
  normal: Vector3;
  constant: number;
  /**
   * Create a new instance.
   * @param normal - (optional) a unit length Vector3 defining the normal of the plane. Default is (1, 0, 0).
   * @param constant  - (optional) the signed distance from the origin to the plane. Default is 0.
   */
  constructor(normal?: Vector3, constant?: number);
  /**
   * Read-only flag to check if a given object is of type Plane.
   */
  get isPlane(): boolean;
  /**
   * Sets this plane's normal and constant properties by copying
   * the values from the given normal.
   * @param normal - a unit length Vector3 defining the normal of the plane.
   * @param constant - the signed distance from the origin to the plane. Default is 0.
   * @returns This instance.
   */
  set(normal: Vector3, constant: number): this;
  /**
   * Set the individual components that define the plane.
   * @param x - x value of the unit length normal vector.
   * @param y - y value of the unit length normal vector.
   * @param z - z value of the unit length normal vector.
   * @param w - the value of the plane's constant property.
   * @returns This instance.
   */
  setComponents(x: number, y: number, z: number, w: number): this;
  /**
   * Sets the plane's properties as defined by a normal and an arbitrary coplanar point.
   * @param normal - a unit length Vector3 defining the normal of the plane.
   * @param point - a Vector3 point
   * @returns This instance.
   */
  setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): this;
  /**
   * Defines the plane based on the 3 provided points.
   * The winding order is assumed to be counter-clockwise,
   * and determines the direction of the normal.
   * @param a - first point on the plane.
   * @param b - secpmd point on the plane.
   * @param c - third point on the plane.
   * @returns This instance.
   */
  setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): this;
  /**
   * Copies the values of the passed plane's normal and constant properties to this plane.
   * @param plane - The source plane to copy values from.
   * @returns This instance.
   */
  copy(plane: Plane): this;
  /**
   * Normalizes the normal vector, and adjusts the constant value accordingly.
   * @returns This instance.
   */
  normalize(): this;
  /**
   * Negates both the normal vector and the constant.
   * @returns This instance.
   */
  negate(): this;
  /**
   * Compute the signed distance from the point to the plane.
   * @param point - The point to measure to.
   * @returns The signed distance value.
   */
  distanceToPoint(point: Vector3): number;
  /**
   * Compute the signed distance from the sphere to the plane.
   * @param sphere - The sphere surface to measure to.
   * @returns The signed distance value.
   */
  distanceToSphere(sphere: Sphere): number;
  /**
   * Projects a point onto the plane.
   * @param point - the Vector3 to project onto the plane.
   * @param target - the result will be copied into this Vector3.
   * @returns The projected point.
   */
  projectPoint(point: Vector3, target: Vector3): Vector3;
  /**
   * Compute the intersection point of the passed line and the plane.
   * @param line - the Line3 to check for intersection.
   * @param target — the result will be copied into this Vector3.
   * @returns null if the line does not intersect; otherwise returns the
   * line's starting point if the line is coplanar with the plane.
   */
  intersectLine(line: Line3, target: Vector3): Vector3 | null;
  /**
   * Tests whether a line segment intersects with (passes through) the plane.
   * @param line - the Line3 to check for intersection.
   * @returns True if the line intersect this plane.
   */
  intersectsLine(line: Line3): boolean;
  /**
   * Determines whether or not this plane intersects box.
   * @param box - the Box3 to check for intersection.
   * @returns True if box and this plane intersect.
   */
  intersectsBox(box: Box3): boolean;
  /**
   * Determines whether or not this plane intersects a sphere.
   * @param sphere - the Sphere to check for intersection.
   * @returns True if sphere and this plane intersect.
   */
  intersectsSphere(sphere: Sphere): boolean;
  /**
   * Compute a Vector3 coplanar to the plane, by calculating
   * the projection of the normal vector at the origin onto the plane.
   * @param target — The result will be copied into this Vector3.
   * @returns A vector coplanar to this plane.
   */
  coplanarPoint(target: Vector3): Vector3;
  /**
   * Apply a Matrix4 to the plane. The matrix must be an affine,
   * homogeneous transform.If supplying an optionalNormalMatrix,
   * it can be created like so:
   * ```
   * const optionalNormalMatrix = new Matrix3().getNormalMatrix( matrix );
   * ```
   * @param matrix  - the Matrix4 to apply.
   * @param optionalNormalMatrix
   * @returns This instance
   */
  applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix3): this;
  /**
   * Translates the plane by the distance defined by the offset vector.
   * Note that this only affects the plane constant and will not
   * affect the normal vector.
   * @param offset - the amount to move the plane by.
   * @returns This instance.
   */
  translate(offset: Vector3): this;
  /**
   * Checks to see if two planes are equal (their normal and constant properties match).
   * @param plane - The plane to compare with.
   * @returns True if value-wise equal.
   */
  equals(plane: Plane): boolean;
  /**
   * Create a new plane with the same normal and constant as this one.
   * @returns The enw instance.
   */
  clone(): Plane;
}
