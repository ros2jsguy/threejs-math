import { Vector3 } from './Vector3';
import type { Sphere } from './Sphere';
import type { Triangle } from './Triangle';
import type { Matrix4 } from './Matrix4';
import type { Plane } from './Plane';
import { Base } from './Base';
/**
 * Represents an axis-aligned bounding box (AABB) in 3D space.
 */
export declare class Box3 extends Base {
  /**
   * Vector3 representing the lower (x, y, z) boundary of the box.
   * Default is ( + Infinity, + Infinity, + Infinity ).
   */
  min: Vector3;
  /**
   * Vector3 representing the upper (x, y, z) boundary of the box.
   * Default is ( - Infinity, - Infinity, - Infinity ).
   */
  max: Vector3;
  /**
   * Creates a Box3 bounded by min and max.
   * @param min - (optional) Vector3 representing the lower (x, y, z) boundary of the box.
   *              Default is ( + Infinity, + Infinity, + Infinity ).
   * @param max - (optional) Vector3 representing the upper (x, y, z) boundary of the box.
   *              Default is ( - Infinity, - Infinity, - Infinity ).
   */
  constructor(min?: Vector3, max?: Vector3);
  /**
   * Read-only flag to check if a given object is of type Box3.
   */
  get isBox3(): boolean;
  /**
   * Sets the lower and upper (x, y, z) boundaries of this box.
   * Note that this method only copies the values from the given objects.
   * @param min - Vector3 representing the lower (x, y, z) boundary of the box.
   * @param max  - Vector3 representing the upper (x, y, z) boundary of the box.
   * @returns This instance.
   */
  set(min: Vector3, max: Vector3): this;
  /**
   * Sets the upper and lower bounds of this box to include all of the data in array.
   * @param array - An array of position data that the resulting box will envelop.
   * @returns This instance.
   */
  setFromArray(array: number[]): this;
  /**
   * Sets the upper and lower bounds of this box to include all of the points in points.
   * @param points - Array of Vector3s that the resulting box will contain.
   * @returns This instance.
   */
  setFromPoints(points: Vector3[]): this;
  /**
   * Centers this box on center and sets this box's width, height and
   * depth to the values specified in size.
   * @param center  - Desired center position of the box.
   * @param size - Desired x, y and z dimensions of the box.
   * @returns This instance.
   */
  setFromCenterAndSize(center: Vector3, size: Vector3): this;
  /**
   * Returns a new Box3 with the same min and max as this one.
   * @returns A new instance.
   */
  clone(): Box3;
  /**
   * Copies the min and max from box to this box.
   * @param box - Box3 to copy.
   * @returns This instance.
   */
  copy(box: Box3): this;
  /**
   * Makes this box empty.
   * @returns This instance.
   */
  makeEmpty(): this;
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes
   * one point, the one both bounds share.
   * @returns True if box includes zero points.
   */
  isEmpty(): boolean;
  /**
   * Find the center point of the box as a Vector3.
   * @param target - The result will be copied into this Vector3.
   * @returns The center point.
   */
  getCenter(target?: Vector3): Vector3;
  /**
   * Get the width, height and depth of this box.
   * @param target - The result will be copied into this Vector3.
   * @returns The box dimensions.
   */
  getSize(target?: Vector3): Vector3;
  /**
   * Expands the boundaries of this box to include point.
   * @param point - Vector3 that should be included in the box.
   * @returns This instance.
   */
  expandByPoint(point: Vector3): this;
  /**
   * Expands this box equilaterally by vector. The width of this box will be
   * expanded by the x component of vector in both directions. The height of
   * this box will be expanded by the y component of vector in both directions.
   * The depth of this box will be expanded by the z component of vector in
   * both directions.
   * @param vector - Vector3 to expand the box by.
   * @returns This instance.
   */
  expandByVector(vector: Vector3): this;
  /**
   * Expands each dimension of the box by scalar.
   * If negative, the dimensions of the box will be contracted.
   * @param scalar - Distance to expand the box by.
   * @returns This instance.
   */
  expandByScalar(scalar: number): this;
  /**
   * Test if the specified point lies within or on the boundaries of this box.
   * @param point - Vector3 to check for inclusion.
   * @returns True if the specified point lies within or on the boundaries of this box.
   */
  containsPoint(point: Vector3): boolean;
  /**
   * Test if this box includes the entirety of box.
   * @param box - Box3 to test for inclusion.
   * @returns True if this box includes the entirety of box.
   * If this and box are identical, this function also returns true.
   */
  containsBox(box: Box3): boolean;
  /**
   * Given a point inside a box, find it's relative proportion to the box's width, height and depth.
   * @param point - A point inside the box
   * @param target - The result will be copied into this Vector3.
   * @returns The 3D propportions.
   */
  getParameter(point: Vector3, target?: Vector3): Vector3;
  /**
   * Determines whether or not this box intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if box intersects this box.
   */
  intersectsBox(box: Box3): boolean;
  /**
   * Determines whether or not this box intersects sphere.
   * @param sphere - Sphere to check for intersection against.
   * @returns True if this box overlaps any part of a sphere.
   */
  intersectsSphere(sphere: Sphere): boolean;
  /**
   * Determines whether or not this box intersects plane.
   * @param plane - Plane to check for intersection against.
   * @returns True if this box intersects the plane.
   */
  intersectsPlane(plane: Plane): boolean;
  /**
   * Determines whether or not this box intersects triangle.
   * @param triangle - Triangle to check for intersection against.
   * @returns True if this box overlaps triangle anywhere.
   */
  intersectsTriangle(triangle: Triangle): boolean;
  /**
   * Clamps the point within the bounds of this box.
   * @param point - Vector3 to clamp.
   * @param target — the result will be copied into this Vector3.
   * @returns A new clamped Vector3.
   */
  clampPoint(point: Vector3, target?: Vector3): Vector3;
  /**
   * Find the distance from any edge of this box to the specified point.
   * If the point lies inside of this box, the distance will be 0.
   * @param point - Vector3 to measure distance to.
   * @returns Returns the distance.
   */
  distanceToPoint(point: Vector3): number;
  /**
   * Gets a Sphere that bounds the box.
   * @param target - The result will be copied into this Sphere.
   * @returns The bounding sphere.
   */
  getBoundingSphere(target: Sphere): Sphere;
  /**
   * Computes the intersection of this and box, setting the upper bound
   * of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds.
   * If there's no overlap, makes this box empty.
   * @param box - Box to intersect with.
   * @returns This instance.
   */
  intersect(box: Box3): this;
  /**
   * Computes the union of this box and box, setting the upper bound of
   * this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   * @param box - Box that will be unioned with this box.
   * @returns This instance.
   */
  union(box: Box3): this;
  /**
   * Transforms this Box3 with the supplied matrix.
   * @param matrix - The Matrix4 to apply
   * @returns This instance.
   */
  applyMatrix4(matrix: Matrix4): this;
  /**
   * Adds offset to both the upper and lower bounds of this box,
   * effectively moving this box offset units in 3D space.
   * @param offset  - Direction and distance of offset.
   * @returns This instance.
   */
  translate(offset: Vector3): this;
  /**
   * Test if this box and box share the same lower and upper bounds.
   * @param box - Box to compare with this one.
   * @returns True if this box and box share the same lower and upper bounds.
   */
  equals(box: Box3): boolean;
}
