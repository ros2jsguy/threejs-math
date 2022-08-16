import { Box3 } from './Box3';
import { Vector3 } from './Vector3';
import type { Matrix4 } from './Matrix4';
// eslint-disable-next-line import/no-cycle
import { Plane } from './Plane';
import { Base } from './Base';

const _box = new Box3();
const _v1 = new Vector3();
const _toFarthestPoint = new Vector3();
const _toPoint = new Vector3();

/**
 * A sphere defined by a center and radius.
 */
export class Sphere extends Base {

  /**
   * A Vector3 defining the center of the sphere.
   * Default is (0, 0, 0).
   */
  center: Vector3;

  /**
   * The radius of the sphere. Default is -1.
   */
  radius: number;

  /**
   * Creates a new Sphere.
   * @param center - center of the sphere. Default is a Vector3 at (0, 0, 0).
   * @param radius - radius of the sphere. Default is -1.
   */
  constructor(center = new Vector3(), radius = -1) {
    super();
    this.center = center;
    this.radius = radius;
  }

  /**
   * Read-only flag to check if a given object is of type Sphere.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isSphere(): boolean {
    return true;
  }

  /**
   * Sets the center and radius properties of this sphere.
   * Please note that this method only copies the values from the given center.
   * @param center - Center of the sphere.
   * @param radius - Radius of the sphere.
   * @returns This instance
   */
  set(center: Vector3, radius: number): this {
    this.center.copy(center);
    this.radius = radius;

    return this;
  }

  /**
   * Computes the minimum bounding sphere for an array of points.
   * If optionalCenteris given, it is used as the sphere's center.
   * Otherwise, the center of the axis-aligned bounding box
   * encompassing points is calculated.
   * @param points - an Array of Vector3 positions.
   * @param optionalCenter - Optional Vector3 position for the sphere's center.
   * @returns This instance.
   */
  setFromPoints(points: Vector3[], optionalCenter?: Vector3): this {
    const { center } = this;

    if (optionalCenter !== undefined) {
      center.copy(optionalCenter);
    } else {
      _box.setFromPoints(points).getCenter(center);
    }

    let maxRadiusSq = 0;

    for (let i = 0, il = points.length; i < il; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    }

    this.radius = Math.sqrt(maxRadiusSq);

    return this;
  }

  /**
   * Copies the values of the passed sphere's center and radius properties to this sphere.
   * @param sphere - The sphere to copy.
   * @returns This instance.
   */
  copy(sphere: Sphere): this {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;

    return this;
  }

  /**
   * Checks to see if the sphere is empty (the radius set to a negative number).
   * Spheres with a radius of 0 contain only their center point and are 
   * not considered to be empty.
   * @returns True if empty. 
   */
  isEmpty(): boolean {
    return (this.radius < 0);
  }

  /**
   * Makes the sphere empty by setting center to (0, 0, 0) and radius to -1.
   * @returns This instance.
   */
  makeEmpty(): this {
    this.center.set(0, 0, 0);
    this.radius = -1;

    return this;
  }

  /**
   * Checks to see if the sphere contains the provided point inclusive of the surface of the sphere.
   * @param point - The Vector3 to be checked
   * @returns True if point is contained by this sphere.
   */
  containsPoint(point: Vector3): boolean {
    return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
  }

  /**
   * Computes the closest distance from the boundary of the sphere to a point.
   * If the sphere contains the point, the distance will be negative.
   * @param point - The point to compute the distance to.
   * @returns The distance to the point.
   */
  distanceToPoint(point: Vector3): number {
    return (point.distanceTo(this.center) - this.radius);
  }

  /**
   * Checks to see if two spheres intersect.
   * @param sphere - Sphere to check for intersection against.
   * @returns True if the spheres intersect.
   */
  intersectsSphere(sphere: Sphere): boolean {
    const radiusSum = this.radius + sphere.radius;

    return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
  }

  /**
   * Determines whether or not this sphere intersects a given box.
   * @param box - Box3 to check for intersection against.
   * @returns True if the sphere and box intersect.
   */
  intersectsBox(box: Box3): boolean {
    return box.intersectsSphere(this);
  }

  /**
   * Determines whether or not this sphere intersects a given plane.
   * @param plane - Plane to check for intersection against.
   * @returns True if this sphere and plane intersect.
   */
  intersectsPlane(plane: Plane): boolean {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  }

  /**
   * Clamps a point within the sphere. If the point is outside the sphere, 
   * it will clamp it to the closest point on the edge of the sphere. 
   * Points already inside the sphere will not be affected. 
   * @param point - Vector3 The point to clamp.
   * @param target - The result will be copied into this Vector3.
   * @returns The clamped point.
   */
  clampPoint(point: Vector3, target = new Vector3()): Vector3 {
    const deltaLengthSq = this.center.distanceToSquared(point);
    target.copy(point);

    if (deltaLengthSq > (this.radius * this.radius)) {
      target.sub(this.center).normalize();
      target.multiplyScalar(this.radius).add(this.center);
    }

    return target;
  }

  /**
   * Copmute a minimum bounding box for the sphere.
   * @param target — the result will be copied into this Box3.
   * @returns The bounding box.
   */
  getBoundingBox(target = new Box3()): Box3 {
    if (this.isEmpty()) {
      // Empty sphere produces empty bounding box
      target.makeEmpty();
      return target;
    }

    target.set(this.center, this.center);
    target.expandByScalar(this.radius);

    return target;
  }

  /**
   * Transforms this sphere with the provided Matrix4.
   * @param matrix - the Matrix4 to apply
   * @returns This instance.
   */
  applyMatrix4(matrix: Matrix4): this {
    this.center.applyMatrix4(matrix);
    this.radius *= matrix.getMaxScaleOnAxis();

    return this;
  }

  /**
   * Translate the sphere's center by the provided offset Vector3.
   * @param offset - The x, y, z offsets
   * @returns This instance.
   */
  translate(offset: Vector3): this {
    this.center.add(offset);

    return this;
  }

  /**
   * Expands the boundaries of this sphere to include point.
   * @param point - Vector3 that should be included in the sphere.
   * @returns This instance.
   */
  expandByPoint(point: Vector3): this {
    // from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L649-L671

    _toPoint.subVectors(point, this.center);

    const lengthSq = _toPoint.lengthSq();

    if (lengthSq > (this.radius * this.radius)) {
      const length = Math.sqrt(lengthSq);
      const missingRadiusHalf = (length - this.radius) * 0.5;

      // Nudge this sphere towards the target point. Add half the missing distance to radius,
      // and the other half to position. This gives a tighter enclosure, instead of if
      // the whole missing distance were just added to radius.

      this.center.add(_toPoint.multiplyScalar(missingRadiusHalf / length));
      this.radius += missingRadiusHalf;
    }

    return this;
  }

  /**
   * Expands this sphere to enclose both the original sphere and the given sphere
   * [based on algorithm](https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L759-L769)
   * @param sphere - Bounding sphere that will be unioned with this sphere.
   * @returns This instance.
   */
  union(sphere: Sphere): this {

    // To enclose another sphere into this sphere, we only need to enclose two points:
    // 1) Enclose the farthest point on the other sphere into this sphere.
    // 2) Enclose the opposite point of the farthest point into this sphere.

    _toFarthestPoint
      .subVectors(sphere.center, this.center)
      .normalize()
      .multiplyScalar(sphere.radius);

    this.expandByPoint(_v1.copy(sphere.center).add(_toFarthestPoint));
    this.expandByPoint(_v1.copy(sphere.center).sub(_toFarthestPoint));

    return this;
  }

  /**
   * Checks to see if the two spheres' centers and radii are equal.
   * @param sphere - The sphere to compare for equality.
   * @returns True if the 2 spheres are equal.
   */
  equals(sphere: Sphere): boolean {
    return sphere.center.equals(this.center) && (sphere.radius === this.radius);
  }

  /**
   * Create new sphere with the same center and radius as this one.
   * @returns The new sphere.
   */
  clone(): Sphere {
    return new Sphere().copy(this);
  }
}
