import type { Box3 } from './Box3';
import type { Matrix4 } from './Matrix4';
import type { Sphere } from './Sphere';
import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Base } from './Base';
/**
 * A ray that emits from an origin in a certain direction.
 */
export declare class Ray extends Base {
  /**
   * The origin of the Ray. Default is a Vector3 at (0, 0, 0).
   */
  origin: Vector3;
  /**
   * The direction of the Ray. This must be normalized (with Vector3.normalize)
   * for the methods to operate properly. Default is a Vector3 at (0, 0, -1).
   */
  direction: Vector3;
  /**
   * Creates a new Ray.
   * @param origin - (optional) the origin of the Ray. Default is a Vector3 at (0, 0, 0).
   * @param direction - Vector3 The direction of the Ray. This must be normalized
   *    (with Vector3.normalize) for the methods to operate properly.
   *    Default is a Vector3 at (0, 0, -1).
   */
  constructor(origin?: Vector3, direction?: Vector3);
  /**
   * Read-only flag to check if a given object is of type Ray.
   */
  get isRay(): boolean;
  /**
   * Sets this ray's origin and direction properties by copying the
   * values from the given objects.
   * @param origin - the origin of the Ray.
   * @param direction - the direction of the Ray.
   *  This must be normalized (with Vector3.normalize)
   *  for the methods to operate properly.
   * @returns This instance.
   */
  set(origin: Vector3, direction: Vector3): this;
  /**
   * Copies the origin and direction properties of ray into this ray.
   * @param ray - The source Ray to copy from.
   * @returns This instance.
   */
  copy(ray: Ray): this;
  /**
   * Compute a Vector3 that is a given distance along this Ray.
   * @param t - the distance along the Ray to retrieve a position for.
   * @param target — (Optional) If defined, the result will be copied into this Vector3.
   * @returns The computed vector.
   */
  at(t: number, target?: Vector3): Vector3;
  /**
   * Adjusts the direction of the ray to point at the vector in world coordinates.
   * @param v - The Vector3 to look at.
   * @returns This instance.
   */
  lookAt(v: Vector3): this;
  /**
   * Shift the origin of this Ray along its direction by the distance given.
   * @param t - The distance along the Ray to interpolate.
   * @returns This instance.
   */
  recast(t: number): this;
  /**
   * Get the point along this Ray that is closest to the Vector3 provided.
   * @param point - the point to get the closest approach to.
   * @param target - the result will be copied into this Vector3.
   * @returns The closest point.
   */
  closestPointToPoint(point: Vector3, target?: Vector3): Vector3;
  /**
   * Compute the distance of the closest approach between the Ray and the point.
   * @param point - Vector3 The Vector3 to compute a distance to.
   * @returns The distance.
   */
  distanceToPoint(point: Vector3): number;
  /**
   * Compute the squared distance of the closest approach between the Ray and the Vector3.
   * @param point - The Vector3 to compute a distance to.
   * @returns The squared distance.
   */
  distanceSqToPoint(point: Vector3): number;
  /**
   * Get the squared distance between this Ray and a line segment.
   * @param v0 - the start of the line segment.
   * @param v1 - the end of the line segment.
   * @param optionalPointOnRay - (optional) if this is provided,
   *    it receives the point on this Ray that is closest to the segment.
   * @param optionalPointOnSegment - (optional) if this is provided,
   *    it receives the point on the line segment that is closest to this Ray.
   * @returns Th distance squared.
   */
  distanceSqToSegment(v0: Vector3, v1: Vector3, optionalPointOnRay: Vector3,
    optionalPointOnSegment: Vector3): number;
  /**
   * Intersect this Ray with a Sphere.
   * @param sphere - The Sphere to intersect with.
   * @param target - The result will be copied into this Vector3.
   * @returns The intersection point or null
   *  if there is no intersection.
   */
  intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null;
  /**
   * Determine if this Ray intersects with the Sphere.
   * @param sphere - the Sphere to intersect with.
   * @returns True if ray intersects the sphere.
   */
  intersectsSphere(sphere: Sphere): boolean;
  /**
   * Get the distance from origin to the Plane, or null
   * if the Ray doesn't intersect the Plane.
   * @param plane - The Plane to get the distance to.
   * @returns The distance to the plane.
   */
  distanceToPlane(plane: Plane): number | null;
  /**
   * Intersect this Ray with a Plane.
   * @param plane - the Plane to intersect with.
   * @param target - the result will be copied into this Vector3.
   * @returns Tthe intersection point or null if there is no intersection.
   */
  intersectPlane(plane: Plane, target: any): Vector3 | null;
  /**
   * Determine if this Ray intersects with the Plane.
   * @param plane - the Plane to intersect with.
   * @returns True if plane intersects this ray.
   */
  intersectsPlane(plane: Plane): boolean;
  /**
   * Intersect this Ray with a Box.
   * @param box - The Box3 to intersect with.
   * @param target - The result will be copied into this Vector3.
   * @returns The intersection point or null if there is no intersection.
   */
  intersectBox(box: Box3, target: Vector3): Vector3 | null;
  /**
   * Determine if this Ray intersects with the Box3.
   * @param box - The Box3 to intersect with.
   * @returns True if this Ray intersects with the Box3.
   */
  intersectsBox(box: Box3): boolean;
  /**
   * Intersect this Ray with a triangle.
   * @param a - A Vector3 point making up the triangle.
   * @param b - A Vector3 point making up the triangle.
   * @param c - A Vector3 point making up the triangle.
   * @param backfaceCulling - whether to use backface culling.
   * @param target - the result will be copied into this Vector3.
   * @returns The intersection point or null if there is no intersection.
   */
  intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean,
    target: Vector3): Vector3 | null;
  /**
   * Transform this Ray by the Matrix4.
   * @param matrix4 - The Matrix4 to apply to this Ray.
   * @returns This instance
   */
  applyMatrix4(matrix4: Matrix4): this;
  /**
   * Determine if this and the other ray have equal origin and direction.
   * @param ray - The Ray to compare to.
   * @returns True if equal.
   */
  equals(ray: Ray): boolean;
  /**
   * Creates a new Ray with identical origin and direction to this one.
   * @returns A new instance just like this ray.
   */
  clone(): Ray;
}
