import { Base } from './Base';
import { Vector2 } from './Vector2';

const _vector = new Vector2();

/**
 * Represents an axis-aligned bounding box (AABB) in 2D space.
 */
export class Box2 extends Base {
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
  constructor(min = new Vector2(+Infinity, +Infinity), max = new Vector2(-Infinity, -Infinity)) {
    super();
    this.min = min;
    this.max = max;
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isBox2(): boolean {
    return true;
  }

  /**
   * Sets the lower and upper (x, y) boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   * @param min - Vector2 representing the lower (x, y) boundary of the box.
   * @param max - Vector2 representing the upper (x, y) boundary of the box.
   * @returns This instance.
   */
  set(min: Vector2, max: Vector2): this {
    this.min.copy(min);
    this.max.copy(max);

    return this;
  }

  /**
   * Sets the upper and lower bounds of this box to include all of the
   * points in points.
   * @param points - Array of Vector2s that the resulting box will contain.
   * @returns This instance.
   */
  setFromPoints(points: Vector2[]): this {
    this.makeEmpty();

    for (let i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }

    return this;
  }

  /**
   * Centers this box on center and sets this box's width and height
   * to the values specified in size.
   * @param center - - Desired center position of the box
   * @param size - Desired x and y dimensions of the box
   * @returns This instance.
   */
  setFromCenterAndSize(center: Vector2, size: Vector2): this {
    const halfSize = _vector.copy(size).multiplyScalar(0.5);
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);

    return this;
  }

  /**
   * Creates a new Box2 with the same min and max as this one.
   * @returns The new instance.
   */
  clone(): Box2 {
    return new Box2().copy(this);
  }

  /**
   * Copies the min and max from box to this box
   * @param box - The box to copy.
   * @returns This instance.
   */
  copy(box: Box2): this {
    this.min.copy(box.min);
    this.max.copy(box.max);

    return this;
  }

  /**
   * Makes this box empty.
   * @returns This instance.
   */
  makeEmpty(): this {
    this.min.x = +Infinity;
    this.min.y = +Infinity;
    this.max.x = -Infinity;
    this.max.y = -Infinity;

    return this;
  }

  /**
   * Determine if there is no overlap between this box and another.
   * Note that a box with equal lower and upper bounds still includes
   * one point, the one both bounds share.
   * @returns True if this box includes zero points within its bounds.
   */
  isEmpty(): boolean {
    return (this.max.x < this.min.x) || (this.max.y < this.min.y);
  }

  /**
   * Compute the center point of the box as a Vector2.
   * @param target � the result will be copied into this Vector2.
   * @returns The center point.
   */
  getCenter(target = new Vector2()): Vector2 {
    return this.isEmpty()
      ? target.set(0, 0)
      : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  }

  /**
   * The width and height of this box.
   * @param target � the result will be copied into this Vector2.
   * @returns The width and height of this box.
   */
  getSize(target = new Vector2()): Vector2 {
    return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
  }

  /**
   * Expands the boundaries of this box to include point.
   * @param point - Vector2 that should be included in the box.
   * @returns This instance.
   */
  expandByPoint(point: Vector2): this {
    this.min.min(point);
    this.max.max(point);

    return this;
  }

  /**
   * Expands this box equilaterally by vector.
   * The width of this box will be expanded by the x component of vector
   * in both directions. The height of this box will be expanded by the
   * y component of vector in both directions.
   * @param vector - Vector2 to expand the box by.
   * @returns This instance.
   */
  expandByVector(vector: Vector2): this {
    this.min.sub(vector);
    this.max.add(vector);

    return this;
  }

  /**
   * Expands each dimension of the box by scalar.
   * If negative, the dimensions of the box will be contracted.
   * @param scalar - Distance to expand the box by.
   * @returns This instance.
   */
  expandByScalar(scalar: number): this {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);

    return this;
  }

  /**
   * Test if the specified point lies within or on the boundaries of this box.
   * @param point - Vector2 to check for inclusion.
   * @returns True if point lies within or on the boundary of this box.
   */
  containsPoint(point: Vector2): boolean {
    return !(point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y);
  }

  /**
   * Test if this box includes the entirety of box.
   * If this and box are identical,this function also returns true.
   * @param box - Box2 to test for inclusion.
   * @returns True if this box includes the entirety of box.
   */
  containsBox(box: Box2): boolean {
    return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y;
  }

  /**
   * Computes a point as a proportion of this box's width and height.
   * @param point
   * @param target - the result will be copied into this Vector2.
   * @returns The target vector
   */
  getParameter(point: Vector2, target = new Vector2()): Vector2 {
    // This can potentially have a divide by zero if the box
    // has a size dimension of 0.
    return target.set(
      (point.x - this.min.x) / (this.max.x - this.min.x),
      (point.y - this.min.y) / (this.max.y - this.min.y),
    );
  }

  /**
   * Determines whether or not this box intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if this and another box2 overlap.
   */
  intersectsBox(box: Box2): boolean {
    // using 4 splitting planes to rule out intersections

    return !(box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y);
  }

  /**
   * Clamps the point within the bounds of this box.
   * @param point - Vector2 to clamp.
   * @param target -  the result will be copied into this Vector2.
   * @returns The target Vector updated with clamped dimensions.
   */
  clampPoint(point: Vector2, target = new Vector2()): Vector2 {
    return target.copy(point).clamp(this.min, this.max);
  }

  /**
   * Compute the distance from any edge of this box to the specified point.
   * If the point lies inside of this box, the distance will be 0.
   * @param point - Vector2 to measure distance to.
   * @returns The distance to point.
   */
  distanceToPoint(point: Vector2): number {
    const clampedPoint = _vector.copy(point).clamp(this.min, this.max);
    return clampedPoint.sub(point).length();
  }

  /**
   * Compute the intersection of this and box, setting the upper bound
   * of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds.
   * @param box - Box to intersect with.
   * @returns This instance.
   */
  intersect(box: Box2): this {
    this.min.max(box.min);
    this.max.min(box.max);

    return this;
  }

  /**
   * Unions this box with box, setting the upper bound of this box to the
   * greater of the two boxes' upper bounds and the lower bound of this
   * box to the lesser of the two boxes' lower bounds.
   * @param box - Box that will be unioned with this box.
   * @param This instance.
   */
  union(box: Box2): this {
    this.min.min(box.min);
    this.max.max(box.max);

    return this;
  }

  /**
   * Adds offset to both the upper and lower bounds of this box,
   * effectively moving this box offset units in 2D space.
   * @param offset - Direction and distance of offset.
   * @returns This instance.
   */
  translate(offset: Vector2): this {
    this.min.add(offset);
    this.max.add(offset);

    return this;
  }

  /**
   * Test the dimensions of this box with another box for equality.
   * @param box - Box to compare with this one.
   * @returns True if this box and box share the same lower and upper bounds.
   */
  equals(box: Box2): boolean {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
}
