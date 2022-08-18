import type { Box3 } from './Box3';
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Base } from './Base';
/**
 * A geometric triangle as defined by three Vector3s representing its three corners.
 */
export declare class Triangle extends Base {
  /**
   *
   * @param a
   * @param b
   * @param c
   * @param target
   * @returns
   */
  static getNormal(a: Vector3, b: Vector3, c: Vector3, target?: Vector3): Vector3;
  /**
   *
   * @param point
   * @param a
   * @param b
   * @param c
   * @param target
   * @returns
   */
  static getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target?: Vector3): Vector3;
  static containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3): boolean;
  static getUV(point: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2): Vector2;
  static isFrontFacing(a: Vector3, b: Vector3, c: Vector3, direction: Vector3): boolean;
  /**
   * The first corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  a: Vector3;
  /**
   * The second corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  b: Vector3;
  /**
   * The final corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  c: Vector3;
  /**
   * Creates a new Triangle.
   * @param a - The first corner of the triangle. Default is a Vector3 at (0, 0, 0).
   * @param b - The second corner of the triangle. Default is a Vector3 at (0, 0, 0).
   * @param c - The third corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  constructor(a?: Vector3, b?: Vector3, c?: Vector3);
  /**
   * Read-only flag to check if a given object is of type Triangle.
   */
  get isTriangle(): boolean;
  /**
   * Sets the triangle's a, b and c properties to the passed vector3s.
   * Please note that this method only copies the values from the given objects.
   * @param a - The first point
   * @param b - The second point
   * @param c - The third point.
   * @returns This instance.
   */
  set(a: Vector3, b: Vector3, c: Vector3): this;
  /**
   * Sets the triangle's vectors to the vectors in the array.
   * @param points - Array of Vector3s
   * @param i0 - index into points array
   * @param i1 - index into points array
   * @param i2 - index into points array
   * @returns This instance
   */
  setFromPointsAndIndices(points: Vector3[], i0: number, i1: number, i2: number): this;
  /**
   * Create a new triangle with the same a, b and c properties as this one.
   * @returns A new Triangle instance equal to this triangle.
   */
  clone(): Triangle;
  /**
   * Copies the values of the passed triangles's a, b and c properties to this triangle.
   * @param triangle - The source triangle.
   * @returns This instance.
   */
  copy(triangle: Triangle): this;
  /**
   * Copmute the area of the triangle.
   * @returns The area of the triangle.
   */
  getArea(): number;
  /**
   * Calculate the midpoint of the triangle.
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The midpoint.
   */
  getMidpoint(target?: Vector3): Vector3;
  /**
   * Calculate the normal vector of the triangle.
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The normal vector.
   */
  getNormal(target?: Vector3): Vector3;
  /**
   * Calculate a plane based on the triangle. .
   * @param target - (Optional) The result will be copied into this Plane.
   * @returns The plane.
   */
  getPlane(target?: Plane): Plane;
  /**
   * Compute a barycentric coordinate from the given vector.
   * @param point - Vector3
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The barycentric coordinate.
   */
  getBarycoord(point: Vector3, target?: Vector3): Vector3;
  /**
   * Compute the uv coordinates for the given point on the triangle.
   * @param point - The point on the triangle.
   * @param uv1 - The uv coordinate of the triangle's first vertex.
   * @param uv2 - The uv coordinate of the triangle's second vertex.
   * @param uv3 - The uv coordinate of the triangle's third vertex.
   * @param target — (optional) The result will be copied into this Vector2
   * @returns The UV coordinate
   */
  getUV(point: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target?: Vector2): Vector2;
  /**
   * Determine if a point, when projected onto the
   * plane of the triangle, lies within the triangle.
   * @param point - Vector3 to check.
   * @returns True if the triangle contains the point.
   */
  containsPoint(point: Vector3): boolean;
  /**
   * Determine if the triangle is oriented towards the given direction or not.
   * @param direction  - The direction to test.
   * @returns True if the triangle is oriented towards the direction parameter.
   */
  isFrontFacing(direction: Vector3): boolean;
  /**
   * Determines whether or not this triangle intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if the box intersects this triangle.
   */
  intersectsBox(box: Box3): boolean;
  /**
   * Returns the closest point on the triangle to point.
   *
   * Algorithm thanks to Real-Time Collision Detection by Christer Ericson,
   * published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
   * under the accompanying license; see chapter 5.1.5 for detailed explanation.
   * basically, we're distinguishing which of the voronoi regions of the triangle
   * the point lies in with the minimum amount of redundant computation.

    * @param pt - Vector3
    * @param target — (Optional) The result will be copied into this Vector3.
    * @returns The closest point.
    */
  closestPointToPoint(pt: Vector3, target?: Vector3): Vector3;
  /**
   * Determing if the two triangles have identical a, b and c properties.
   * @param triangle - The source triangle
   * @returns True if triangle has the same component values as this triangle.
   */
  equals(triangle: Triangle): boolean;
}
