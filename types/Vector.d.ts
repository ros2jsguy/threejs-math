/**
 * Abstract interface of {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js|Vector2},
 * {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js|Vector3}
 * and {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector4.js|Vector4}.
 *
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 *
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 *
 * @example
 * const v:Vector = new Vector3();
 * v.addVectors(new Vector2(0, 1), new Vector2(2, 3)); // invalid but compiled successfully
 */
export interface Vector {
  setComponent(index: number, value: number): this;
  getComponent(index: number): number;
  set(...args: number[]): this;
  setScalar(scalar: number): this;
  /**
   * Read-only flag to check if a given object is of type Vector.
   */
  readonly isVector: boolean;
  /**
   * copy(v:T):T;
   */
  copy(v: Vector): this;
  /**
   * NOTE: The second argument is deprecated.
   *
   * add(v:T):T;
   */
  add(v: Vector): this;
  /**
   * addVectors(a:T, b:T):T;
   */
  addVectors(a: Vector, b: Vector): this;
  addScaledVector(vector: Vector, scale: number): this;
  /**
   * Adds the scalar value s to this vector's values.
   */
  addScalar(scalar: number): this;
  /**
   * sub(v:T):T;
   */
  sub(v: Vector): this;
  /**
   * subVectors(a:T, b:T):T;
   */
  subVectors(a: Vector, b: Vector): this;
  /**
   * multiplyScalar(s:number):T;
   */
  multiplyScalar(s: number): this;
  /**
   * divideScalar(s:number):T;
   */
  divideScalar(s: number): this;
  /**
   * negate():T;
   */
  negate(): this;
  /**
   * dot(v:T):T;
   */
  dot(v: Vector): number;
  /**
   * lengthSq():number;
   */
  lengthSq(): number;
  /**
   * length():number;
   */
  length(): number;
  /**
   * normalize():T;
   */
  normalize(): this;
  /**
   * NOTE: Vector4 doesn't have the property.
   *
   * distanceTo(v:T):number;
   */
  distanceTo?(v: Vector): number;
  /**
   * NOTE: Vector4 doesn't have the property.
   *
   * distanceToSquared(v:T):number;
   */
  distanceToSquared?(v: Vector): number;
  /**
   * setLength(l:number):T;
   */
  setLength(l: number): this;
  /**
   * lerp(v:T, alpha:number):T;
   */
  lerp(v: Vector, alpha: number): this;
  /**
   * equals(v:T):boolean;
   */
  equals(v: Vector): boolean;
  /**
   * clone():T;
   */
  clone(): Vector;
}
