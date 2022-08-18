import { Base } from './Base';
import { Vector2 } from './Vector2';
/**
 * Represents an axis-aligned bounding box (AABB) in 2D space.
 */
export declare class Box2 extends Base {
  /**
   * The lower (x, y) boundary of the box. Default is ( + Infinity, + Infinity ).
   */
  min: Vector2;
  /**
   * The lower upper (x, y) boundary of the box. Default is ( - Infinity, - Infinity ).
   */
  max: Vector2;
  /**
   * Creates a Box2 bounded by min and max.
   * @param min - the lower (x, y) boundary of the box. Default is ( + Infinity, + Infinity ).
   * @param max - the upper (x, y) boundary of the box. Default is ( - Infinity, - Infinity ).
   */
  constructor(min?: Vector2, max?: Vector2);
  get isBox2(): boolean;
  /**
   * Sets the lower and upper (x, y) boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   * @param min - Vector2 representing the lower (x, y) boundary of the box.
   * @param max - Vector2 representing the upper (x, y) boundary of the box.
   * @returns This instance.
   */
  set(min: Vector2, max: Vector2): this;
  /**
   * Sets the upper and lower bounds of this box to include all of the
   * points in points.
   * @param points - Array of Vector2s that the resulting box will contain.
   * @returns This instance.
   */
  setFromPoints(points: Vector2[]): this;
  /**
   * Centers this box on center and sets this box's width and height
   * to the values specified in size.
   * @param center - - Desired center position of the box
   * @param size - Desired x and y dimensions of the box
   * @returns This instance.
   */
  setFromCenterAndSize(center: Vector2, size: Vector2): this;
  /**
   * Creates a new Box2 with the same min and max as this one.
   * @returns The new instance.
   */
  clone(): Box2;
  /**
   * Copies the min and max from box to this box
   * @param box - The box to copy.
   * @returns This instance.
   */
  copy(box: Box2): this;
  /**
   * Makes this box empty.
   * @returns This instance.
   */
  makeEmpty(): this;
  /**
   * Determine if there is no overlap between this box and another.
   * Note that a box with equal lower and upper bounds still includes
   * one point, the one both bounds share.
   * @returns True if this box includes zero points within its bounds.
   */
  isEmpty(): boolean;
  /**
   * Compute the center point of the box as a Vector2.
   * @param target � the result will be copied into this Vector2.
   * @returns The center point.
   */
  getCenter(target?: Vector2): Vector2;
  /**
   * The width and height of this box.
   * @param target � the result will be copied into this Vector2.
   * @returns The width and height of this box.
   */
  getSize(target?: Vector2): Vector2;
  /**
   * Expands the boundaries of this box to include point.
   * @param point - Vector2 that should be included in the box.
   * @returns This instance.
   */
  expandByPoint(point: Vector2): this;
  /**
   * Expands this box equilaterally by vector.
   * The width of this box will be expanded by the x component of vector
   * in both directions. The height of this box will be expanded by the
   * y component of vector in both directions.
   * @param vector - Vector2 to expand the box by.
   * @returns This instance.
   */
  expandByVector(vector: Vector2): this;
  /**
   * Expands each dimension of the box by scalar.
   * If negative, the dimensions of the box will be contracted.
   * @param scalar - Distance to expand the box by.
   * @returns This instance.
   */
  expandByScalar(scalar: number): this;
  /**
   * Test if the specified point lies within or on the boundaries of this box.
   * @param point - Vector2 to check for inclusion.
   * @returns True if point lies within or on the boundary of this box.
   */
  containsPoint(point: Vector2): boolean;
  /**
   * Test if this box includes the entirety of box.
   * If this and box are identical,this function also returns true.
   * @param box - Box2 to test for inclusion.
   * @returns True if this box includes the entirety of box.
   */
  containsBox(box: Box2): boolean;
  /**
   * Computes a point as a proportion of this box's width and height.
   * @param point
   * @param target - the result will be copied into this Vector2.
   * @returns The target vector
   */
  getParameter(point: Vector2, target?: Vector2): Vector2;
  /**
   * Determines whether or not this box intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if this and another box2 overlap.
   */
  intersectsBox(box: Box2): boolean;
  /**
   * Clamps the point within the bounds of this box.
   * @param point - Vector2 to clamp.
   * @param target -  the result will be copied into this Vector2.
   * @returns The target Vector updated with clamped dimensions.
   */
  clampPoint(point: Vector2, target?: Vector2): Vector2;
  /**
   * Compute the distance from any edge of this box to the specified point.
   * If the point lies inside of this box, the distance will be 0.
   * @param point - Vector2 to measure distance to.
   * @returns The distance to point.
   */
  distanceToPoint(point: Vector2): number;
  /**
   * Compute the intersection of this and box, setting the upper bound
   * of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds.
   * @param box - Box to intersect with.
   * @returns This instance.
   */
  intersect(box: Box2): this;
  /**
   * Unions this box with box, setting the upper bound of this box to the
   * greater of the two boxes' upper bounds and the lower bound of this
   * box to the lesser of the two boxes' lower bounds.
   * @param box - Box that will be unioned with this box.
   * @param This instance.
   */
  union(box: Box2): this;
  /**
   * Adds offset to both the upper and lower bounds of this box,
   * effectively moving this box offset units in 2D space.
   * @param offset - Direction and distance of offset.
   * @returns This instance.
   */
  translate(offset: Vector2): this;
  /**
   * Test the dimensions of this box with another box for equality.
   * @param box - Box to compare with this one.
   * @returns True if this box and box share the same lower and upper bounds.
   */
  equals(box: Box2): boolean;
}
