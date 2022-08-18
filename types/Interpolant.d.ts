export declare const InterpolateDiscrete = 2300;
export declare const InterpolateLinear = 2301;
export declare const InterpolateSmooth = 2302;
export declare const ZeroCurvatureEnding = 2400;
export declare const ZeroSlopeEnding = 2401;
export declare const WrapAroundEnding = 2402;
export declare type InterpolantSettings = unknown;
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
export declare abstract class Interpolant {
  parameterPositions: any[];
  sampleValues: any[];
  resultBuffer?: any[] | undefined;
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
  constructor(parameterPositions: any[], sampleValues: any[], sampleSize: number, resultBuffer?: any[] | undefined);
  /**
   * Evaluate the interpolant at position t.
   * @param t - time
   * @returns An array
   */
  evaluate(t: number): Array<any>;
  getSettings_(): InterpolantSettings;
  copySampleValue_(index: number): Array<any>;
  abstract interpolate_(i1: number, t0?: number, t?: number, t1?: number): unknown;
  abstract intervalChanged_(i1: number, t0?: number, t1?: number): void;
}
