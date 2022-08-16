import type { Box3 } from './Box3';
import type { Matrix4 } from './Matrix4';
import type { Sphere } from './Sphere';
import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Base } from './Base';

const _vector = new Vector3();
const _segCenter = new Vector3();
const _segDir = new Vector3();
const _diff = new Vector3();

const _edge1 = new Vector3();
const _edge2 = new Vector3();
const _normal = new Vector3();

/**
 * A ray that emits from an origin in a certain direction.
 */
export class Ray extends Base {
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
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
    super();
    this.origin = origin;
    this.direction = direction;
  }

  /**
   * Read-only flag to check if a given object is of type Ray.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isRay(): boolean {
    return true;
  }

  /**
   * Sets this ray's origin and direction properties by copying the
   * values from the given objects.
   * @param origin - the origin of the Ray.
   * @param direction - the direction of the Ray. 
   *  This must be normalized (with Vector3.normalize) 
   *  for the methods to operate properly.
   * @returns This instance.
   */
  set(origin: Vector3, direction: Vector3): this {
    this.origin.copy(origin);
    this.direction.copy(direction);

    return this;
  }

  /**
   * Copies the origin and direction properties of ray into this ray.
   * @param ray - The source Ray to copy from.
   * @returns This instance.
   */
  copy(ray: Ray): this {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);

    return this;
  }

  /**
   * Compute a Vector3 that is a given distance along this Ray.
   * @param t - the distance along the Ray to retrieve a position for.
   * @param target — the result will be copied into this Vector3.
   * @returns The computed vector.
   */
  at(t: number, target = new Vector3()): Vector3 {
    return target.copy(this.direction).multiplyScalar(t).add(this.origin);
  }

  /**
   * Adjusts the direction of the ray to point at the vector in world coordinates.
   * @param v - The Vector3 to look at.
   * @returns This instance.
   */
  lookAt(v: Vector3): this {
    this.direction.copy(v).sub(this.origin).normalize();

    return this;
  }

  /**
   * Shift the origin of this Ray along its direction by the distance given.
   * @param t - The distance along the Ray to interpolate.
   * @returns This instance.
   */
  recast(t: number): this {
    this.origin.copy(this.at(t, _vector));

    return this;
  }

  /**
   * Get the point along this Ray that is closest to the Vector3 provided.
   * @param point - the point to get the closest approach to.
   * @param target - the result will be copied into this Vector3.
   * @returns The closest point.
   */
  closestPointToPoint(point: Vector3, target = new Vector3()): Vector3 {
    target.subVectors(point, this.origin);

    const directionDistance = target.dot(this.direction);

    if (directionDistance < 0) {
      return target.copy(this.origin);
    }

    return target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
  }

  /**
   * Compute the distance of the closest approach between the Ray and the point.
   * @param point - Vector3 The Vector3 to compute a distance to.
   * @returns The distance.
   */
  distanceToPoint(point: Vector3): number {
    return Math.sqrt(this.distanceSqToPoint(point));
  }

  /**
   * Compute the squared distance of the closest approach between the Ray and the Vector3.
   * @param point - The Vector3 to compute a distance to.
   * @returns The squared distance.
   */
  distanceSqToPoint(point: Vector3): number {
    const directionDistance = _vector.subVectors(point, this.origin).dot(this.direction);

    // point behind the ray

    if (directionDistance < 0) {
      return this.origin.distanceToSquared(point);
    }

    _vector.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

    return _vector.distanceToSquared(point);
  }

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
  distanceSqToSegment(v0: Vector3, v1: Vector3,
    optionalPointOnRay: Vector3, optionalPointOnSegment: Vector3): number {
    // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
    // It returns the min distance between the ray and the segment
    // defined by v0 and v1
    // It can also set two optional targets :
    // - The closest point on the ray
    // - The closest point on the segment

    _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
    _segDir.copy(v1).sub(v0).normalize();
    _diff.copy(this.origin).sub(_segCenter);

    const segExtent = v0.distanceTo(v1) * 0.5;
    const a01 = -this.direction.dot(_segDir);
    const b0 = _diff.dot(this.direction);
    const b1 = -_diff.dot(_segDir);
    const c = _diff.lengthSq();
    const det = Math.abs(1 - a01 * a01);
    let s0: number;
    let s1: number;
    let sqrDist: number;
    let extDet: number;

    if (det > 0) {
      // The ray and segment are not parallel.

      s0 = a01 * b1 - b0;
      s1 = a01 * b0 - b1;
      extDet = segExtent * det;

      if (s0 >= 0) {
        if (s1 >= -extDet) {
          if (s1 <= extDet) {
            // region 0
            // Minimum at interior points of ray and segment.

            const invDet = 1 / det;
            s0 *= invDet;
            s1 *= invDet;
            sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
          } else {
            // region 1

            s1 = segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          }
        } else {
          // region 5

          s1 = -segExtent;
          s0 = Math.max(0, -(a01 * s1 + b0));
          sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        }
      } else if (s1 <= -extDet) {
        // region 4

        s0 = Math.max(0, -(-a01 * segExtent + b0));
        s1 = (s0 > 0) ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
      } else if (s1 <= extDet) {
        // region 3

        s0 = 0;
        s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
        sqrDist = s1 * (s1 + 2 * b1) + c;
      } else {
        // region 2

        s0 = Math.max(0, -(a01 * segExtent + b0));
        s1 = (s0 > 0) ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
      }
    } else {
      // Ray and segment are parallel.

      s1 = (a01 > 0) ? -segExtent : segExtent;
      s0 = Math.max(0, -(a01 * s1 + b0));
      sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
    }

    if (optionalPointOnRay) {
      optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
    }

    if (optionalPointOnSegment) {
      optionalPointOnSegment.copy(_segDir).multiplyScalar(s1).add(_segCenter);
    }

    return sqrDist;
  }

  /**
   * Intersect this Ray with a Sphere.
   * @param sphere - The Sphere to intersect with.
   * @param target - The result will be copied into this Vector3.
   * @returns The intersection point or null 
   *  if there is no intersection.
   */
  intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null {
    _vector.subVectors(sphere.center, this.origin);
    const tca = _vector.dot(this.direction);
    const d2 = _vector.dot(_vector) - tca * tca;
    const radius2 = sphere.radius * sphere.radius;

    if (d2 > radius2) return null;

    const thc = Math.sqrt(radius2 - d2);

    // t0 = first intersect point - entrance on front of sphere
    const t0 = tca - thc;

    // t1 = second intersect point - exit point on back of sphere
    const t1 = tca + thc;

    // test to see if both t0 and t1 are behind the ray - if so, return null
    if (t0 < 0 && t1 < 0) return null;

    // test to see if t0 is behind the ray:
    // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
    // in order to always return an intersect point that is in front of the ray.
    if (t0 < 0) return this.at(t1, target);

    // else t0 is in front of the ray, so return the first collision point scaled by t0
    return this.at(t0, target);
  }

  /**
   * Determine if this Ray intersects with the Sphere.
   * @param sphere - the Sphere to intersect with.
   * @returns True if ray intersects the sphere.
   */
  intersectsSphere(sphere: Sphere): boolean {
    return this.distanceSqToPoint(sphere.center) <= (sphere.radius * sphere.radius);
  }

  /**
   * Get the distance from origin to the Plane, or null
   * if the Ray doesn't intersect the Plane.
   * @param plane - The Plane to get the distance to.
   * @returns The distance to the plane.
   */
  distanceToPlane(plane: Plane): number | null {
    const denominator = plane.normal.dot(this.direction);
    if (denominator === 0) {
      // line is coplanar, return origin
      if (plane.distanceToPoint(this.origin) === 0) {
        return 0;
      }

      // Null is preferable to undefined since undefined means.... it is undefined
      return null;
    }

    const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;

    // Return if the ray never intersects the plane
    return t >= 0 ? t : null;
  }

  /**
   * Intersect this Ray with a Plane.
   * @param plane - the Plane to intersect with.
   * @param target - the result will be copied into this Vector3. 
   * @returns Tthe intersection point or null if there is no intersection.
   */
  intersectPlane(plane: Plane, target): Vector3 | null {
    const t = this.distanceToPlane(plane);
    if (t === null) {
      return null;
    }

    return this.at(t, target);
  }

  /**
   * Determine if this Ray intersects with the Plane.
   * @param plane - the Plane to intersect with.
   * @returns True if plane intersects this ray.
   */
  intersectsPlane(plane: Plane): boolean {
    // check if the ray lies on the plane first
    const distToPoint = plane.distanceToPoint(this.origin);
    if (distToPoint === 0) {
      return true;
    }

    const denominator = plane.normal.dot(this.direction);
    if (denominator * distToPoint < 0) {
      return true;
    }

    // ray origin is behind the plane (and is pointing behind it)
    return false;
  }

  /**
   * Intersect this Ray with a Box.
   * @param box - The Box3 to intersect with.
   * @param target - The result will be copied into this Vector3.
   * @returns The intersection point or null if there is no intersection.
   */
  intersectBox(box: Box3, target: Vector3): Vector3 | null {
    let tmin; let tmax; let tymin; let tymax; let tzmin; let
      tzmax;

    const invdirx = 1 / this.direction.x;
    const invdiry = 1 / this.direction.y;
    const invdirz = 1 / this.direction.z;

    const { origin } = this;

    if (invdirx >= 0) {
      tmin = (box.min.x - origin.x) * invdirx;
      tmax = (box.max.x - origin.x) * invdirx;
    } else {
      tmin = (box.max.x - origin.x) * invdirx;
      tmax = (box.min.x - origin.x) * invdirx;
    }

    if (invdiry >= 0) {
      tymin = (box.min.y - origin.y) * invdiry;
      tymax = (box.max.y - origin.y) * invdiry;
    } else {
      tymin = (box.max.y - origin.y) * invdiry;
      tymax = (box.min.y - origin.y) * invdiry;
    }

    if ((tmin > tymax) || (tymin > tmax)) return null;

    // These lines also handle the case where tmin or tmax is NaN
    // (result of 0 * Infinity). x !== x returns true if x is NaN

    if (tymin > tmin || isNaN(tmin)) tmin = tymin;

    if (tymax < tmax || isNaN(tmax)) tmax = tymax;

    if (invdirz >= 0) {
      tzmin = (box.min.z - origin.z) * invdirz;
      tzmax = (box.max.z - origin.z) * invdirz;
    } else {
      tzmin = (box.max.z - origin.z) * invdirz;
      tzmax = (box.min.z - origin.z) * invdirz;
    }

    if ((tmin > tzmax) || (tzmin > tmax)) return null;

    if (tzmin > tmin || isNaN(tmin)) tmin = tzmin;

    if (tzmax < tmax || isNaN(tmax)) tmax = tzmax;

    // return point closest to the ray (positive side)

    if (tmax < 0) return null;

    return this.at(tmin >= 0 ? tmin : tmax, target);
  }

  /**
   * Determine if this Ray intersects with the Box3.
   * @param box - The Box3 to intersect with.
   * @returns True if this Ray intersects with the Box3.
   */
  intersectsBox(box: Box3): boolean {
    return this.intersectBox(box, _vector) !== null;
  }

  /**
   * Intersect this Ray with a triangle. 
   * @param a - A Vector3 point making up the triangle.
   * @param b - A Vector3 point making up the triangle.
   * @param c - A Vector3 point making up the triangle.
   * @param backfaceCulling - whether to use backface culling.
   * @param target - the result will be copied into this Vector3.
   * @returns The intersection point or null if there is no intersection.
   */
  intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3): Vector3 | null {
    // Compute the offset origin, edges, and normal.

    // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

    _edge1.subVectors(b, a);
    _edge2.subVectors(c, a);
    _normal.crossVectors(_edge1, _edge2);

    // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
    // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
    //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
    //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
    //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
    let DdN = this.direction.dot(_normal);
    let sign;

    if (DdN > 0) {
      if (backfaceCulling) return null;
      sign = 1;
    } else if (DdN < 0) {
      sign = -1;
      DdN = -DdN;
    } else {
      return null;
    }

    _diff.subVectors(this.origin, a);
    const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));

    // b1 < 0, no intersection
    if (DdQxE2 < 0) {
      return null;
    }

    const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));

    // b2 < 0, no intersection
    if (DdE1xQ < 0) {
      return null;
    }

    // b1+b2 > 1, no intersection
    if (DdQxE2 + DdE1xQ > DdN) {
      return null;
    }

    // Line intersects triangle, check if ray does.
    const QdN = -sign * _diff.dot(_normal);

    // t < 0, no intersection
    if (QdN < 0) {
      return null;
    }

    // Ray intersects triangle.
    return this.at(QdN / DdN, target);
  }

  /**
   * Transform this Ray by the Matrix4.
   * @param matrix4 - The Matrix4 to apply to this Ray.
   * @returns This instance
   */
  applyMatrix4(matrix4: Matrix4): this {
    this.origin.applyMatrix4(matrix4);
    this.direction.transformDirection(matrix4);

    return this;
  }

  /**
   * Determine if this and the other ray have equal origin and direction.
   * @param ray - The Ray to compare to.
   * @returns True if equal.
   */
  equals(ray: Ray): boolean {
    return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
  }

  /**
   * Creates a new Ray with identical origin and direction to this one.
   * @returns A new instance just like this ray.
   */
  clone(): Ray {
    return new Ray().copy(this);
  }
}

