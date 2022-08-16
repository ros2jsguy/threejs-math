/**
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */

import { Base } from './Base';
import { MathUtils } from './MathUtils';
import type { Vector3 } from './Vector3';

/**
 * A point's [spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).
 */
export class Spherical extends Base {
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
  constructor(radius = 1, phi = 0, theta = 0) {
    super();
    this.radius = radius;
    this.phi = phi; // polar angle
    this.theta = theta; // azimuthal angle

    return this;
  }

  /**
   * Read-only flag to check if a given object is of type Spherical.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isSpherical(): boolean {
    return true;
  }

  /**
   * Sets values of this spherical's radius, phi and theta properties.
   * @param radius - The radius, or the Euclidean distance 
   *    (straight-line distance) from the point to the origin.
   * @param phi - Polar angle in radians from the y (up) axis. 
   * @param theta - Equator angle in radians around the y (up) axis.
   * @returns This instance.
   */
  set(radius: number, phi: number, theta: number): this {
    this.radius = radius;
    this.phi = phi;
    this.theta = theta;

    return this;
  }

  /**
   * Copies the values of the passed Spherical's radius, phi and
   * theta properties to this spherical.
   * @param other - A spherical to copy properties from.
   * @returns This instance.
   */
  copy(other: Spherical): this {
    this.radius = other.radius;
    this.phi = other.phi;
    this.theta = other.theta;

    return this;
  }

  // restrict phi to be betwee EPS and PI-EPS
  /**
   * Restricts the polar angle phi to be between 0.000001 and pi - 0.000001.
   * @returns This instance.
   */
  makeSafe(): this {
    const EPS = 0.000001;
    this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));

    return this;
  }

  /**
   * Sets values of this spherical's radius, phi and theta properties from the Vector3.
   * @param v - The source vector.
   * @returns This instance.
   */
  setFromVector3(v: Vector3): this {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  }

  /**
   * Sets values of this spherical's radius, phi and theta
   * properties from Cartesian coordinates.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @param z - The Z coordinate.
   * @returns This instance.
   */
  setFromCartesianCoords(x: number, y: number, z: number): this {
    this.radius = Math.sqrt(x * x + y * y + z * z);

    if (this.radius === 0) {
      this.theta = 0;
      this.phi = 0;
    } else {
      this.theta = Math.atan2(x, z);
      this.phi = Math.acos(MathUtils.clamp(y / this.radius, -1, 1));
    }

    return this;
  }

  /**
   * Create a new spherical with the same radius, phi and theta properties as this one.
   * @returns A new Spherical instance
   */
  clone(): Spherical {
    return new Spherical().copy(this);
  }
}

