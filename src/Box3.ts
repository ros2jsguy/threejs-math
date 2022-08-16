import { Vector3 } from './Vector3';
import type { Sphere } from './Sphere';
import type { Triangle } from './Triangle';
import type { Matrix4 } from './Matrix4';
import type { Plane } from './Plane';
import { Base } from './Base';

/**
 * Represents an axis-aligned bounding box (AABB) in 3D space.
 */
export class Box3 extends Base {
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
  constructor(
    min = new Vector3(+Infinity, +Infinity, +Infinity),
    max = new Vector3(-Infinity, -Infinity, -Infinity),
  ) {
    super();
    this.min = min;
    this.max = max;
  }

  /**
   * Read-only flag to check if a given object is of type Box3.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isBox3(): boolean {
    return true;
  }

  /**
   * Sets the lower and upper (x, y, z) boundaries of this box.
   * Note that this method only copies the values from the given objects.
   * @param min - Vector3 representing the lower (x, y, z) boundary of the box.
   * @param max  - Vector3 representing the upper (x, y, z) boundary of the box.
   * @returns This instance.
   */
  set(min: Vector3, max: Vector3): this {
    this.min.copy(min);
    this.max.copy(max);

    return this;
  }

  /**
   * Sets the upper and lower bounds of this box to include all of the data in array.
   * @param array - An array of position data that the resulting box will envelop.
   * @returns This instance.
   */
  setFromArray(array: number[]): this {
    let minX = +Infinity;
    let minY = +Infinity;
    let minZ = +Infinity;

    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    for (let i = 0, l = array.length; i < l; i += 3) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;

      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }

    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);

    return this;
  }

  /**
   * Sets the upper and lower bounds of this box to include all of the points in points.
   * @param points - Array of Vector3s that the resulting box will contain.
   * @returns This instance.
   */
  setFromPoints(points: Vector3[]): this {
    this.makeEmpty();

    for (let i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }

    return this;
  }

  /**
   * Centers this box on center and sets this box's width, height and
   * depth to the values specified in size.
   * @param center  - Desired center position of the box.
   * @param size - Desired x, y and z dimensions of the box.
   * @returns This instance.
   */
  setFromCenterAndSize(center: Vector3, size: Vector3): this {
    const halfSize = _vector.copy(size).multiplyScalar(0.5);

    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);

    return this;
  }

  /**
   * Returns a new Box3 with the same min and max as this one.
   * @returns A new instance.
   */
  clone(): Box3 {
    return new Box3().copy(this);
  }

  /**
   * Copies the min and max from box to this box.
   * @param box - Box3 to copy.
   * @returns This instance.
   */
  copy(box: Box3): this {
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
    this.min.z = +Infinity;

    this.max.x = -Infinity;
    this.max.y = -Infinity;
    this.max.z = -Infinity;

    return this;
  }

  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes
   * one point, the one both bounds share.
   * @returns True if box includes zero points.
   */
  isEmpty(): boolean {
    return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
  }

  /**
   * Find the center point of the box as a Vector3.
   * @param target - The result will be copied into this Vector3.
   * @returns The center point.
   */
  getCenter(target = new Vector3()): Vector3 {
    return this.isEmpty()
      ? target.set(0, 0, 0)
      : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  }

  /**
   * Get the width, height and depth of this box.
   * @param target - The result will be copied into this Vector3.
   * @returns The box dimensions.
   */
  getSize(target = new Vector3()): Vector3 {
    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  }

  /**
   * Expands the boundaries of this box to include point.
   * @param point - Vector3 that should be included in the box.
   * @returns This instance.
   */
  expandByPoint(point: Vector3): this {
    this.min.min(point);
    this.max.max(point);

    return this;
  }

  /**
   * Expands this box equilaterally by vector. The width of this box will be 
   * expanded by the x component of vector in both directions. The height of 
   * this box will be expanded by the y component of vector in both directions. 
   * The depth of this box will be expanded by the z component of vector in 
   * both directions.
   * @param vector - Vector3 to expand the box by.
   * @returns This instance.
   */
  expandByVector(vector: Vector3): this {
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
   * @param point - Vector3 to check for inclusion.
   * @returns True if the specified point lies within or on the boundaries of this box.
   */
  containsPoint(point: Vector3): boolean {
    return !(point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z);
  }

  /**
   * Test if this box includes the entirety of box.
   * @param box - Box3 to test for inclusion.
   * @returns True if this box includes the entirety of box.
   * If this and box are identical, this function also returns true.
   */
  containsBox(box: Box3): boolean {
    return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z;
  }

  /**
   * Given a point inside a box, find it's relative proportion to the box's width, height and depth.
   * @param point - A point inside the box
   * @param target - The result will be copied into this Vector3.
   * @returns The 3D propportions. 
   */
  getParameter(point: Vector3, target = new Vector3()): Vector3 {
    // This can potentially have a divide by zero if the box
    // has a size dimension of 0.

    return target.set(
      (point.x - this.min.x) / (this.max.x - this.min.x),
      (point.y - this.min.y) / (this.max.y - this.min.y),
      (point.z - this.min.z) / (this.max.z - this.min.z),
    );
  }

  /**
   * Determines whether or not this box intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if box intersects this box.
   */
  intersectsBox(box: Box3): boolean {
    // using 6 splitting planes to rule out intersections.
    return !(box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z);
  }

  /**
   * Determines whether or not this box intersects sphere.
   * @param sphere - Sphere to check for intersection against.
   * @returns True if this box overlaps any part of a sphere.
   */
  intersectsSphere(sphere: Sphere): boolean {
    // Find the point on the AABB closest to the sphere center.
    this.clampPoint(sphere.center, _vector);

    // If that point is inside the sphere, the AABB and sphere intersect.
    return _vector.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
  }


  /**
   * Determines whether or not this box intersects plane.
   * @param plane - Plane to check for intersection against.
   * @returns True if this box intersects the plane.
   */
  intersectsPlane(plane: Plane): boolean {
    // We compute the minimum and maximum dot product values. If those values
    // are on the same side (back or front) of the plane, then there is no intersection.
    let min;
    let max;

    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x;
      max = plane.normal.x * this.max.x;
    } else {
      min = plane.normal.x * this.max.x;
      max = plane.normal.x * this.min.x;
    }

    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y;
      max += plane.normal.y * this.max.y;
    } else {
      min += plane.normal.y * this.max.y;
      max += plane.normal.y * this.min.y;
    }

    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z;
      max += plane.normal.z * this.max.z;
    } else {
      min += plane.normal.z * this.max.z;
      max += plane.normal.z * this.min.z;
    }

    return (min <= -plane.constant && max >= -plane.constant);
  }

  /**
   * Determines whether or not this box intersects triangle.
   * @param triangle - Triangle to check for intersection against.
   * @returns True if this box overlaps triangle anywhere.
   */
  intersectsTriangle(triangle: Triangle): boolean {
    if (this.isEmpty()) {
      return false;
    }

    // compute box center and extents
    this.getCenter(_center);
    _extents.subVectors(this.max, _center);

    // translate triangle to aabb origin
    _v0.subVectors(triangle.a, _center);
    _v1.subVectors(triangle.b, _center);
    _v2.subVectors(triangle.c, _center);

    // compute edge vectors for triangle
    _f0.subVectors(_v1, _v0);
    _f1.subVectors(_v2, _v1);
    _f2.subVectors(_v0, _v2);

    let axes = [
      0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y,
      _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x,
      -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0,
    ];
    if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
      return false;
    }

    // test 3 face normals from the aabb
    axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
      return false;
    }

    // finally testing the face normal of the triangle
    // use already existing triangle edge vectors here
    _triangleNormal.crossVectors(_f0, _f1);
    axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];

    return satForAxes(axes, _v0, _v1, _v2, _extents);
  }

  /**
   * Clamps the point within the bounds of this box.
   * @param point - Vector3 to clamp.
   * @param target — the result will be copied into this Vector3.
   * @returns A new clamped Vector3.
   */
  clampPoint(point: Vector3, target = new Vector3()): Vector3 {
    return target.copy(point).clamp(this.min, this.max);
  }

  /**
   * Find the distance from any edge of this box to the specified point. 
   * If the point lies inside of this box, the distance will be 0.
   * @param point - Vector3 to measure distance to.
   * @returns Returns the distance.
   */
  distanceToPoint(point: Vector3): number {
    const clampedPoint = _vector.copy(point).clamp(this.min, this.max);

    return clampedPoint.sub(point).length();
  }

  /**
   * Gets a Sphere that bounds the box.
   * @param target - The result will be copied into this Sphere.
   * @returns The bounding sphere.
   */
  getBoundingSphere(target: Sphere): Sphere {
    this.getCenter(target.center);

    target.radius = this.getSize(_vector).length() * 0.5;

    return target;
  }

  /**
   * Computes the intersection of this and box, setting the upper bound
   * of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds.
   * If there's no overlap, makes this box empty.
   * @param box - Box to intersect with.
   * @returns This instance.
   */
  intersect(box: Box3): this {
    this.min.max(box.min);
    this.max.min(box.max);

    if (this.isEmpty()) this.makeEmpty();

    return this;
  }

  /**
   * Computes the union of this box and box, setting the upper bound of
   * this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   * @param box - Box that will be unioned with this box.
   * @returns This instance.
   */
  union(box: Box3): this {
    this.min.min(box.min);
    this.max.max(box.max);

    return this;
  }

  /**
   * Transforms this Box3 with the supplied matrix.
   * @param matrix - The Matrix4 to apply
   * @returns This instance.
   */
  applyMatrix4(matrix: Matrix4): this {
    // transform of empty box is an empty box.
    if (this.isEmpty()) return this;

    // NOTE: I am using a binary pattern to specify all 2^3 combinations below
    _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
    _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
    _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
    _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
    _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
    _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
    _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
    _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111

    this.setFromPoints(_points);

    return this;
  }

  /**
   * Adds offset to both the upper and lower bounds of this box,
   * effectively moving this box offset units in 3D space.
   * @param offset  - Direction and distance of offset.
   * @returns This instance.
   */
  translate(offset: Vector3): this {
    this.min.add(offset);
    this.max.add(offset);

    return this;
  }

  /**
   * Test if this box and box share the same lower and upper bounds.
   * @param box - Box to compare with this one.
   * @returns True if this box and box share the same lower and upper bounds.
   */
  equals(box: Box3): boolean {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
}

const _points = [
  new Vector3(),
  new Vector3(),
  new Vector3(),
  new Vector3(),
  new Vector3(),
  new Vector3(),
  new Vector3(),
  new Vector3(),
];

const _vector = new Vector3();

// triangle centered vertices

const _v0 = new Vector3();
const _v1 = new Vector3();
const _v2 = new Vector3();

// triangle edge vectors

const _f0 = new Vector3();
const _f1 = new Vector3();
const _f2 = new Vector3();

const _center = new Vector3();
const _extents = new Vector3();
const _triangleNormal = new Vector3();
const _testAxis = new Vector3();

function satForAxes(axes, v0, v1, v2, extents) {
  for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
    _testAxis.fromArray(axes, i);
    // project the aabb onto the seperating axis
    const r = extents.x * Math.abs(_testAxis.x)
    + extents.y * Math.abs(_testAxis.y)
    + extents.z * Math.abs(_testAxis.z);
    // project all 3 vertices of the triangle onto the seperating axis
    const p0 = v0.dot(_testAxis);
    const p1 = v1.dot(_testAxis);
    const p2 = v2.dot(_testAxis);
    // actual test, basically see if either of the most extreme of the triangle points intersects r
    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
      // points of the projected triangle are outside the projected half-length of the aabb
      // the axis is seperating and we can exit
      return false;
    }
  }

  return true;
}
