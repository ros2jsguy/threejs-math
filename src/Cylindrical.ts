/**
 * Ref: https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
 */

import { Base } from './Base';
import type { Vector3 } from './Vector3';

export class Cylindrical extends Base {
  radius: number;
  theta: number;
  y: number;

  constructor(radius = 1, theta = 0, y = 0) {
    super();
    // distance from the origin to a point in the x-z plane
    this.radius = radius;
    // counterclockwise angle in the x-z plane measured in radians from the positive z-axis
    this.theta = theta;
    // height above the x-z plane
    this.y = y;

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isCylindrical(): boolean {
    return true;
  }

  set(radius: number, theta: number, y: number): this {
    this.radius = radius;
    this.theta = theta;
    this.y = y;

    return this;
  }

  copy(other: Cylindrical): this {
    this.radius = other.radius;
    this.theta = other.theta;
    this.y = other.y;

    return this;
  }

  setFromVector3(v: Vector3): this {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  }

  setFromCartesianCoords(x: number, y: number, z: number): this {
    this.radius = Math.sqrt(x * x + z * z);
    this.theta = Math.atan2(x, z);
    this.y = y;

    return this;
  }

  clone(): Cylindrical {
    return new Cylindrical().copy(this);
  }
}

