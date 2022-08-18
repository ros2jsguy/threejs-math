/**
 * ( interface Matrix<T> )
 */
export interface Matrix {
  /**
   * Array with matrix values.
   */
  elements: number[];
  /**
   * Read-only flag to check if a given object is of type Matrix.
   */
  readonly isMatrix: boolean;
  /**
   * identity():T;
   */
  identity: () => this;
  /**
   * copy(m:T):T;
   */
  copy: (m: this) => this;
  /**
   * multiplyScalar(s:number):T;
   */
  multiplyScalar: (s: number) => this;
  /**
   * Computes and returns the determinant of this matrix.
   */
  determinant: () => number;
  /**
   * transpose():T;
   */
  transpose: () => this;
  /**
   * invert():T;
   */
  invert: () => this;

}
