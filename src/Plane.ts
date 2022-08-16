import { Matrix3 } from './Matrix3';
import { Vector3 } from './Vector3';
// eslint-disable-next-line import/no-cycle
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
export class Plane extends Base {
  
  /**
   * Create a new instance.
   * @param normal - (optional) a unit length Vector3 defining the normal of the plane. Default is (1, 0, 0).
   * @param constant  - (optional) the signed distance from the origin to the plane. Default is 0.
   */
  constructor(public normal = new Vector3(1, 0, 0), public constant = 0) {
    super();
    // normal is assumed to be normalized
  }

  /**
   * Read-only flag to check if a given object is of type Plane.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isPlane(): boolean {
    return true;
  }

  /**
   * Sets this plane's normal and constant properties by copying 
   * the values from the given normal.
   * @param normal - a unit length Vector3 defining the normal of the plane.
   * @param constant - the signed distance from the origin to the plane. Default is 0.
   * @returns This instance.
   */
  set(normal: Vector3, constant: number): this {
    this.normal.copy(normal);
    this.constant = constant;

    return this;
  }

  /**
   * Set the individual components that define the plane.
   * @param x - x value of the unit length normal vector.
   * @param y - y value of the unit length normal vector.
   * @param z - z value of the unit length normal vector.
   * @param w - the value of the plane's constant property.
   * @returns This instance.
   */
  setComponents(x: number, y: number, z: number, w: number): this {
    this.normal.set(x, y, z);
    this.constant = w;

    return this;
  }

  /**
   * Sets the plane's properties as defined by a normal and an arbitrary coplanar point.
   * @param normal - a unit length Vector3 defining the normal of the plane.
   * @param point - a Vector3 point
   * @returns This instance.
   */
  setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): this {
    this.normal.copy(normal);
    this.constant = -point.dot(this.normal);

    return this;
  }

  /**
   * Defines the plane based on the 3 provided points. 
   * The winding order is assumed to be counter-clockwise, 
   * and determines the direction of the normal.
   * @param a - first point on the plane.
   * @param b - secpmd point on the plane.
   * @param c - third point on the plane.
   * @returns This instance.
   */
  setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): this {
    const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();

    // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

    this.setFromNormalAndCoplanarPoint(normal, a);

    return this;
  }

  /**
   * Copies the values of the passed plane's normal and constant properties to this plane.
   * @param plane - The source plane to copy values from.
   * @returns This instance.
   */
  copy(plane: Plane): this {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;

    return this;
  }

  /**
   * Normalizes the normal vector, and adjusts the constant value accordingly.
   * @returns This instance.
   */
  normalize(): this {
    // Note: will lead to a divide by zero if the plane is invalid.

    const inverseNormalLength = 1.0 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;

    return this;
  }

  /**
   * Negates both the normal vector and the constant.
   * @returns This instance.
   */
  negate(): this {
    this.constant *= -1;
    this.normal.negate();

    return this;
  }

  /**
   * Compute the signed distance from the point to the plane.
   * @param point - The point to measure to.
   * @returns The signed distance value.
   */
  distanceToPoint(point: Vector3): number {
    return this.normal.dot(point) + this.constant;
  }

  /**
   * Compute the signed distance from the sphere to the plane.
   * @param sphere - The sphere surface to measure to.
   * @returns The signed distance value.
   */
  distanceToSphere(sphere: Sphere): number {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }

  /**
   * Projects a point onto the plane.
   * @param point - the Vector3 to project onto the plane.
   * @param target - the result will be copied into this Vector3.
   * @returns The projected point.
   */
  projectPoint(point: Vector3, target: Vector3): Vector3 {
    return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
  }

  /**
   * Compute the intersection point of the passed line and the plane. 
   * @param line - the Line3 to check for intersection.
   * @param target — the result will be copied into this Vector3.
   * @returns null if the line does not intersect; otherwise returns the 
   * line's starting point if the line is coplanar with the plane.
   */
  intersectLine(line: Line3, target: Vector3): Vector3 | null {
    const direction = line.delta(_vector1);
    const denominator = this.normal.dot(direction);

    if (denominator === 0) {
      // line is coplanar, return origin
      if (this.distanceToPoint(line.start) === 0) {
        return target.copy(line.start);
      }

      // Unsure if this is the correct method to handle this case.
      return null;
    }

    const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    if (t < 0 || t > 1) {
      return null;
    }

    return target.copy(direction).multiplyScalar(t).add(line.start);
  }

  /**
   * Tests whether a line segment intersects with (passes through) the plane.
   * @param line - the Line3 to check for intersection.
   * @returns True if the line intersect this plane.
   */
  intersectsLine(line: Line3): boolean {
    // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

    const startSign = this.distanceToPoint(line.start);
    const endSign = this.distanceToPoint(line.end);

    return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
  }

  /**
   * Determines whether or not this plane intersects box.
   * @param box - the Box3 to check for intersection.
   * @returns True if box and this plane intersect.
   */
  intersectsBox(box: Box3): boolean {
    return box.intersectsPlane(this);
  }

  /**
   * Determines whether or not this plane intersects a sphere.
   * @param sphere - the Sphere to check for intersection.
   * @returns True if sphere and this plane intersect.
   */
  intersectsSphere(sphere: Sphere): boolean {
    return sphere.intersectsPlane(this);
  }

  /**
   * Compute a Vector3 coplanar to the plane, by calculating 
   * the projection of the normal vector at the origin onto the plane.
   * @param target — The result will be copied into this Vector3.
   * @returns A vector coplanar to this plane.
   */
  coplanarPoint(target: Vector3): Vector3 {
    return target.copy(this.normal).multiplyScalar(-this.constant);
  }

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
  applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix3): this {
    const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
    const normal = this.normal.applyMatrix3(normalMatrix).normalize();

    this.constant = -referencePoint.dot(normal);

    return this;
  }

  /**
   * Translates the plane by the distance defined by the offset vector. 
   * Note that this only affects the plane constant and will not 
   * affect the normal vector.
   * @param offset - the amount to move the plane by. 
   * @returns This instance.
   */
  translate(offset: Vector3): this {
    this.constant -= offset.dot(this.normal);

    return this;
  }

  /**
   * Checks to see if two planes are equal (their normal and constant properties match).
   * @param plane - The plane to compare with.
   * @returns True if value-wise equal.
   */
  equals(plane: Plane): boolean {
    return plane.normal.equals(this.normal) && (plane.constant === this.constant);
  }

  /**
   * Create a new plane with the same normal and constant as this one.
   * @returns The enw instance.
   */
  clone(): Plane {
    return new Plane().copy(this);
  }
}

const _vector1 = new Vector3();
const _vector2 = new Vector3();
const _normalMatrix = new Matrix3();
