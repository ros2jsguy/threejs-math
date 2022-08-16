import { Vector3 } from './Vector3';
import { MathUtils } from './MathUtils';
import type { Matrix4 } from './Matrix4';
import { Base } from './Base';

const _startP = new Vector3();
const _startEnd = new Vector3();

/**
 * A geometric line segment represented by a start and end point.
 */
export class Line3 extends Base {
  start: Vector3;
  end: Vector3;

  /**
   * Create a new instance.
   * @param start - Start of the line segment. Default is (0, 0, 0).
   * @param end - End of the line segment. Default is (0, 0, 0).
   */
  constructor(start = new Vector3(), end = new Vector3()) {
    super();
    this.start = start;
    this.end = end;
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isLine3(): boolean {
    return true;
  }

  /**
   * Update the start and end values by copying the provided vectors.
   * @param start - set the start point of the line.
   * @param end  - set the end point of the line.
   * @returns This instance.
   */
  set(start: Vector3, end: Vector3): this {
    this.start.copy(start);
    this.end.copy(end);

    return this;
  }

  /**
   * Copies the passed line's start and end vectors to this line.
   * @param line - The line.
   * @returns This instance.
   */
  copy(line: Line3): this {
    this.start.copy(line.start);
    this.end.copy(line.end);

    return this;
  }

  /**
   * Compute the center of the line segment.
   * @param target - The result will be copied into this Vector3.
   * @returns The center point
   */
  getCenter(target = new Vector3()): Vector3 {
    return target.addVectors(this.start, this.end).multiplyScalar(0.5);
  }

  /**
   * Compute the delta vector of the line segment (end vector minus the start vector).
   * @param target - The result will be copied into this Vector3.
   * @returns The resulting vector.
   */
  delta(target = new Vector3()): Vector3 {
    return target.subVectors(this.end, this.start);
  }

  /**
   * Compute the square of the Euclidean distance (straight-line distance)
   * between the line's start and end vectors.
   * @returns The distance squared.
   */
  distanceSq(): number {
    return this.start.distanceToSquared(this.end);
  }

  /**
   * Compute the Euclidean distance (straight-line distance) between the line's start and end points.
   * @returns The Euclidean distance.
   */
  distance(): number {
    return this.start.distanceTo(this.end);
  }

  /**
   * Compute the scaled position along the line. 
   * When t = 0, it returns the start vector.
   * When t = 1 it returns the end vector.
   * @param t - Use values 0-1 to return a position along the line segment.
   * @param target — the result will be copied into this Vector3.
   * @returns The position on the line.
   */
  at(t: number, target = new Vector3()): Vector3 {
    return this.delta(target).multiplyScalar(t).add(this.start);
  }

  /**
   * Compute a point parameter based on the closest point as projected on the line segment. 
   * If clampToLine is true, then the returned value will be between 0 and 1.
   * @param point - the point for which to return a point parameter.
   * @param clampToLine - Whether to clamp the result to the range [0, 1].
   * @returns The scaled proportion.
   */
  closestPointToPointParameter(point: Vector3, clampToLine?: boolean): number {
    _startP.subVectors(point, this.start);
    _startEnd.subVectors(this.end, this.start);

    const startEnd2 = _startEnd.dot(_startEnd);
    const startEnd_startP = _startEnd.dot(_startP);

    let t = startEnd_startP / startEnd2;

    if (clampToLine) {
      t = MathUtils.clamp(t, 0, 1);
    }

    return t;
  }

  /**
   * Find the closest point on the line. 
   * If clampToLine is true, then the returned value will be clamped to the line segment.
   * @param point - return the closest point on the line to this point.
   * @param clampToLine - whether to clamp the returned value to the line segment.
   * @param target - The result will be copied into this Vector3.
   * @returns The closest point.
   */
  closestPointToPoint(point: Vector3, clampToLine?: boolean, target = new Vector3()): Vector3 {
    const t = this.closestPointToPointParameter(point, clampToLine);
    return this.delta(target).multiplyScalar(t).add(this.start);
  }

  /**
   * Applies a matrix transform to the line segment.
   * @param matrix - The transform.
   * @returns This instance.
   */
  applyMatrix4(matrix: Matrix4): this {
    this.start.applyMatrix4(matrix);
    this.end.applyMatrix4(matrix);

    return this;
  }

  /**
   * Test for value equality.
   * @param line - Line3 to compare with this one.
   * @returns True if both line's start and end points are equal.
   */
  equals(line: Line3): boolean {
    return line.start.equals(this.start) && line.end.equals(this.end);
  }

  /**
   * Create a new Line3 with the same start and end vectors as this one.
   * @returns The new instance.
   */
  clone(): Line3 {
    return new Line3().copy(this);
  }
}
