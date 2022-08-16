import { Interpolant } from '../Interpolant.js';
import { Quaternion } from '../Quaternion.js';
/**
 * Spherical linear unit quaternion interpolant.
 *
 * @examples
 * ```
 * const interpolant = new QuaternionLinearInterpolant(
 * new Float32Array( 2 ),
 * new Float32Array( 2 ),
 * 1,
 * new Float32Array( 1 )
 * );
 *
 * interpolant.evaluate( 0.5 );
 * ```
 */
export class QuaternionLinearInterpolant extends Interpolant {
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
        const alpha = (t - t0) / (t1 - t0);
        let offset = i1 * stride;
        for (let end = offset + stride; offset !== end; offset += 4) {
            Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    intervalChanged_(i1, t0, t1) {
        // do nothing
    }
}
//# sourceMappingURL=QuaternionLinearInterpolant.js.map