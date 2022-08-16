import { Interpolant } from '../Interpolant.js';
/**
 * Interpolant that evaluates to the sample value at the position preceding
 * the parameter.
 *
 * @examples
 * ```
 * const interpolant = new LinearInterpolant(
 * new Float32Array( 2 ),
 * new Float32Array( 2 ),
 * 1,
 * new Float32Array( 1 )
 * );
 *
 * interpolant.evaluate( 0.5 );
 * ```
 */
export class LinearInterpolant extends Interpolant {
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
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer;
        const values = this.sampleValues;
        const stride = this.valueSize;
        const offset1 = i1 * stride;
        const offset0 = offset1 - stride;
        const weight1 = (t - t0) / (t1 - t0);
        const weight0 = 1 - weight1;
        for (let i = 0; i !== stride; ++i) {
            result[i] =
                values[offset0 + i] * weight0 +
                    values[offset1 + i] * weight1;
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    intervalChanged_(i1, t0, t1) {
        // do nothing
    }
}
//# sourceMappingURL=LinearInterpolant.js.map