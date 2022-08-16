/* eslint-disable no-labels */
/* eslint-disable no-bitwise */
/* eslint-disable padded-blocks */

export const InterpolateDiscrete = 2300;
export const InterpolateLinear = 2301;
export const InterpolateSmooth = 2302;
export const ZeroCurvatureEnding = 2400;
export const ZeroSlopeEnding = 2401;
export const WrapAroundEnding = 2402;

export type InterpolantSettings = unknown;

/**
 * Abstract base class of interpolants over parametric samples.
 *
 * The parameter domain is one dimensional, typically the time or a path
 * along a curve defined by the data.
 *
 * The sample values can have any dimensionality and derived classes may
 * apply special interpretations to the data.
 *
 * This class provides the interval seek in a Template Method, deferring
 * the actual interpolation to derived classes.
 *
 * Time complexity is O(1) for linear access crossing at most two points
 * and O(log N) for random access, where N is the number of positions.
 *
 * References:
 *
 * 		http://www.oodesign.com/template-method-pattern.html
 *
 */
export abstract class Interpolant {
  _cachedIndex: number;
  valueSize: number;
  settings: InterpolantSettings | null;
  DefaultSettings_: unknown;

  /**
   * Create a new instance.
   *
   * Note: This is not designed to be called directly.
   *
   * @param parameterPositions - array of positions
   * @param sampleValues - array of samples
   * @param sampleSize - number of samples
   * @param resultBuffer - buffer to store the interpolation results.
   */
  constructor(public parameterPositions: any[], public sampleValues: any[],
    sampleSize: number, public resultBuffer?: any[]) {
    this.resultBuffer = resultBuffer ?? new (sampleValues as any).constructor(sampleSize);
    this._cachedIndex = 0;
    this.valueSize = sampleSize;
    this.settings = null;
    this.DefaultSettings_ = {};
  }

  /**
   * Evaluate the interpolant at position t.
   * @param t - time
   * @returns An array
   */
  evaluate(t: number): Array<any> {
    const pp = this.parameterPositions;
    let i1 = this._cachedIndex;
    let t1 = pp[i1];
    let t0 = pp[i1 - 1];

    validate_interval: {
      seek: {
        let right;
        linear_scan: {

          // - See http://jsperf.com/comparison-to-undefined/3
          // - slower code:
          //-
          // - 				if ( t >= t1 || t1 === undefined ) {
          forward_scan: if (!(t < t1)) {

            for (let giveUpAt = i1 + 2; ;) {
              if (t1 === undefined) {
                if (t < t0) break forward_scan;
                // after end
                i1 = pp.length;
                this._cachedIndex = i1;
                return this.copySampleValue_(i1 - 1);
              }

              if (i1 === giveUpAt) break; // this loop

              t0 = t1;
              t1 = pp[++i1];
              if (t < t1) {
                // we have arrived at the sought interval
                break seek;
              }
            }

            // prepare binary search on the right side of the index
            right = pp.length;
            break linear_scan;
          }

          // - slower code:
          // -					if ( t < t0 || t0 === undefined ) {
          if (!(t >= t0)) {
            // looping?
            const t1global = pp[1];
            if (t < t1global) {
              i1 = 2; // + 1, using the scan for the details
              t0 = t1global;
            }

            // linear reverse scan
            for (let giveUpAt = i1 - 2; ;) {
              if (t0 === undefined) {
                // before start
                this._cachedIndex = 0;
                return this.copySampleValue_(0);
              }

              if (i1 === giveUpAt) break; // this loop

              t1 = t0;
              t0 = pp[--i1 - 1];
              if (t >= t0) {
                // we have arrived at the sought interval
                break seek;
              }
            }

            // prepare binary search on the left side of the index
            right = i1;
            i1 = 0;
            break linear_scan;
          }

          // the interval is valid
          // eslint-disable-next-line no-labels
          break validate_interval;
        } // linear scan

        // binary search
        while (i1 < right) {

          const mid = (i1 + right) >>> 1;
          if (t < pp[mid]) {
            right = mid;
          } else {
            i1 = mid + 1;
          }
        }

        t1 = pp[i1];
        t0 = pp[i1 - 1];

        // check boundary cases, again
        if (t0 === undefined) {
          this._cachedIndex = 0;
          return this.copySampleValue_(0);
        }

        if (t1 === undefined) {
          i1 = pp.length;
          this._cachedIndex = i1;
          return this.copySampleValue_(i1 - 1);
        }
      } // seek

      this._cachedIndex = i1;
      this.intervalChanged_(i1, t0, t1);
    } // validate_interval

    return this.interpolate_(i1, t0, t, t1) as Array<number>;
  }

  getSettings_(): InterpolantSettings {
    return this.settings || this.DefaultSettings_;
  }

  copySampleValue_(index: number): Array<any> {
    // copies a sample value to the result buffer
    const result = this.resultBuffer!;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const offset = index * stride;

    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset + i];
    }

    return result;
  }

  // Template methods for derived classes:
  abstract interpolate_(i1: number, t0?: number, t?: number, t1?: number): unknown;

  abstract intervalChanged_(i1: number, t0?: number, t1?: number): void;
}
