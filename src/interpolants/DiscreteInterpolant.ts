import { Interpolant } from '../Interpolant.js';

/**
 * Interpolant that evaluates to the sample value at the position preceding
 * the parameter.
 *
 * @examples
 * ```
 * const interpolant = new DiscreteInterpolant(
 * new Float32Array( 2 ),
 * new Float32Array( 2 ),
 * 1,
 * new Float32Array( 1 )
 * );
 *
 * interpolant.evaluate( 0.5 );
 * ```
 */
export class DiscreteInterpolant extends Interpolant {
  /**
   * Create a new instance.
   * @param parameterPositions - array of positions
   * @param sampleValues - array of samples
   * @param sampleSize - number of samples
   * @param resultBuffer - buffer to store the interpolation results.
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }

  interpolate_(i1: number): number[] {
    return this.copySampleValue_(i1 - 1);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intervalChanged_(i1: number, t0: number, t1: number): void {
    // do nothing
  }
}

