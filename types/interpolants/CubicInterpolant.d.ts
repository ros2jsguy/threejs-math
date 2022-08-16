import { Interpolant } from '../Interpolant.js';
interface CubicInterpolantSettings {
    endingStart: number;
    endingEnd: number;
}
/**
 * Fast and simple cubic spline interpolant.
 *
 * It was derived from a Hermitian construction setting the first derivative
 * at each sample position to the linear slope between neighboring positions
 * over their parameter interval.
 *
 * @examples
 * ```
 * const interpolant = new CubicInterpolant(
 * new Float32Array( 2 ),
 * new Float32Array( 2 ),
 * 1,
 * new Float32Array( 1 )
 * );
 *
 * interpolant.evaluate( 0.5 );
 * ```
 */
export declare class CubicInterpolant extends Interpolant {
    _weightPrev: number;
    _offsetPrev: number;
    _weightNext: number;
    _offsetNext: number;
    /**
     * Create a new instance.
     * @param parameterPositions - array of positions
     * @param sampleValues - array of samples
     * @param sampleSize - number of samples
     * @param resultBuffer - buffer to store the interpolation results.
     */
    constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer?: any);
    getSettings_(): CubicInterpolantSettings;
    intervalChanged_(i1: any, t0: any, t1: any): void;
    interpolate_(i1: any, t0: any, t: any, t1: any): any;
}
export {};
