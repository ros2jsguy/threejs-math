/**
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */
import { Base } from './Base';
import type { Vector3 } from './Vector3';
/**
 * A point's [spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).
 */
export declare class Spherical extends Base {
  /**
   * The radius, or the Euclidean distance (straight-line distance)
   * from the point to the origin. Default is 1.0.
   */
  radius: number;
  /**
   * Equator angle in radians around the y (up) axis. Default is 0.
   */
  theta: number;
  /**
   * Polar angle in radians from the y (up) axis. Default is 0.
   */
  phi: number;
  /**
   * Create a new instance.
   * The poles (phi) are at the positive and negative y axis.
   * The equator (theta) starts at positive z..
   * @param radius - The radius, or the Euclidean distance
   *    (straight-line distance) from the point to the origin. Default is 1.0
   * @param phi - Polar angle in radians from the y (up) axis. Default is 0.
   * @param theta - Equator angle in radians around the y (up) axis. Default is 0.
   */
  constructor(radius?: number, phi?: number, theta?: number);
  /**
   * Read-only flag to check if a given object is of type Spherical.
   */
  get isSpherical(): boolean;
  /**
   * Sets values of this spherical's radius, phi and theta properties.
   * @param radius - The radius, or the Euclidean distance
   *    (straight-line distance) from the point to the origin.
   * @param phi - Polar angle in radians from the y (up) axis.
   * @param theta - Equator angle in radians around the y (up) axis.
   * @returns This instance.
   */
  set(radius: number, phi: number, theta: number): this;
  /**
   * Copies the values of the passed Spherical's radius, phi and
   * theta properties to this spherical.
   * @param other - A spherical to copy properties from.
   * @returns This instance.
   */
  copy(other: Spherical): this;
  /**
   * Restricts the polar angle phi to be between 0.000001 and pi - 0.000001.
   * @returns This instance.
   */
  makeSafe(): this;
  /**
   * Sets values of this spherical's radius, phi and theta properties from the Vector3.
   * @param v - The source vector.
   * @returns This instance.
   */
  setFromVector3(v: Vector3): this;
  /**
   * Sets values of this spherical's radius, phi and theta
   * properties from Cartesian coordinates.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @param z - The Z coordinate.
   * @returns This instance.
   */
  setFromCartesianCoords(x: number, y: number, z: number): this;
  /**
   * Create a new spherical with the same radius, phi and theta properties as this one.
   * @returns A new Spherical instance
   */
  clone(): Spherical;
}
