import type { Quaternion } from './Quaternion';

const _lut: string[] = [];

for (let i = 0; i < 256; i++) {
  _lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

let _seed = 1234567;

export const MathUtils = {

  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,

  /**
   * Generate a UUID (universally unique identifier).
   * @returns The UUID string.
   */
  generateUUID(): string {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

    /* eslint-disable */
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    const uuid = `${_lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] }-${
      _lut[d1 & 0xff] }${_lut[d1 >> 8 & 0xff] }-${ _lut[d1 >> 16 & 0x0f | 0x40] }${_lut[d1 >> 24 & 0xff] }-${
      _lut[d2 & 0x3f | 0x80] }${_lut[d2 >> 8 & 0xff] }-${ _lut[d2 >> 16 & 0xff] }${_lut[d2 >> 24 & 0xff]
    }${_lut[d3 & 0xff] }${_lut[d3 >> 8 & 0xff] }${_lut[d3 >> 16 & 0xff] }${_lut[d3 >> 24 & 0xff]}`;
    /* eslint-enable */

    // .toUpperCase() here flattens concatenated strings to save heap memory space.
    return uuid.toUpperCase();
  },

  /**
   * Clamps the x to be between a and b.
   *
   * @param value Value to be clamped.
   * @param min Minimum value
   * @param max Maximum value.
   */
  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Compute euclidian modulo of m % n
   * ( ( n % m ) + m ) % m
   * https://en.wikipedia.org/wiki/Modulo_operation
   * @param n - target
   * @param m - modulus
   * @returns The Euclidean modulo
   */
  euclideanModulo(n: number, m: number): number {
    return ((n % m) + m) % m;
  },

  /**
   * Linear mapping of x from range [a1, a2] to range [b1, b2].
   *
   * @param x Value to be mapped.
   * @param a1 Minimum value for range A.
   * @param a2 Maximum value for range A.
   * @param b1 Minimum value for range B.
   * @param b2 Maximum value for range B.
   */
  mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
  },

  /**
   * https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/ 
  */
 /**
  * Calculate the percentage in the closed interval [0, 1] 
  * of the given value between the start and end point.
  * @param x - Start point.
  * @param y - End point.
  * @param value - A value between start and end.
  * @returns The resulting percentage value.
  */
  inverseLerp(x: number, y: number, value: number): number {
    if (x !== y) {
      return (value - x) / (y - x);
    }
    return 0;
  },

  /**
   * Returns a value linearly interpolated from two known points based
   * on the given interval - t = 0 will return x and t = 1 will return y.
   * https://en.wikipedia.org/wiki/Linear_interpolation
   * @param x Start point.
   * @param y End point.
   * @param t interpolation factor in the closed interval [0, 1]
   */
  lerp(x: number, y: number, t: number): number {
    return (1 - t) * x + t * y;
  },

  /**
   * Smoothly interpolate a number from x toward y in a spring-like
   * manner using the dt to maintain frame rate independent movement.
   * http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
   * @param x Current point.
   * @param y Target point.
   * @param lambda A higher lambda value will make the movement more sudden, and a lower value will make the movement more gradual.
   * @param dt Delta time in seconds.
   */
  damp(x: number, y: number, lambda: number, dt: number): number {
    return MathUtils.lerp(x, y, 1 - Math.exp(-lambda * dt));
  },

  /**
   * Returns a value that alternates between 0 and length.
   * https://www.desmos.com/calculator/vcsjnyz7x4
   * @param x The value to pingpong.
   * @param length The positive value the export function will pingpong to. Default is 1.
   */
  pingpong(x: number, length = 1): number {
    return length - Math.abs(MathUtils.euclideanModulo(x, length * 2) - length);
  },

  /**
   * Calculate a value between 0-1 that represents the percentage 
   * that x has moved between min and max, but smoothed or slowed 
   * down the closer X is to the min and max.
   * http://en.wikipedia.org/wiki/Smoothstep
   * @param x - The value to evaluate based on its position between min and max.
   * @param min - Any x value below min will be 0.
   * @param max - Any x value above max will be 1.
   * @returns The value.
   */
  smoothstep(x: number, min: number, max: number): number {
    if (x <= min) return 0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * (3 - 2 * x);
  },

  /**
   * Compute a value between 0-1. A variation on smoothstep that has 
   * zero 1st and 2nd order derivatives at x=0 and x=1.
   * @param x - The value to evaluate based on its position between min and max.
   * @param min - Any x value below min will be 0.
   * @param max - Any x value above max will be 1.
   * @returns The step value.
   */
  smootherstep(x: number, min: number, max: number): number {
    if (x <= min) return 0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * x * (x * (x * 6 - 15) + 10);
  },

  /**
   * Random integer in the interval [low, high].
   * @param low 
   * @param high 
   * @returns The random integer.
   */
  randInt(low: number, high: number): number {
    return low + Math.floor(Math.random() * (high - low + 1));
  },

  /**
   * Random float in the interval [low, high].
   * @param low 
   * @param high 
   * @returns The random float.
   */
  randFloat(low: number, high: number): number {
    return low + Math.random() * (high - low);
  },

  /**
   * Random float in the interval [- range / 2, range / 2].
   * @param range - 
   * @returns The random float.
   */
  randFloatSpread(range: number): number {
    return range * (0.5 - Math.random());
  },

  /**
   * Deterministic pseudo-random float in the interval [ 0, 1 ].
   * @param s - The seed
   * @returns The random number
   */
  seededRandom(s?: number): number {
    if (s !== undefined) _seed = s % 2147483647;

    // Park-Miller algorithm

    _seed = (_seed * 16807) % 2147483647;

    return (_seed - 1) / 2147483646;
  },

  /**
   * Converts degrees to radians.
   * @param degrees 
   * @returns Radians
   */
  degToRad(degrees: number): number {
    return degrees * MathUtils.DEG2RAD;
  },

  /**
   * Convert radians to degrees.
   * @param radians - The radians to convert
   * @returns The degrees.
   */
  radToDeg(radians: number): number {
    return radians * MathUtils.RAD2DEG;
  },

  /**
   * Determine if a value is a power of 2.
   * @param value - The value to test.
   * @returnsvTrue if n is a power of 2.
   */
  isPowerOfTwo(value: number): boolean {
    // eslint-disable-next-line
    return (value & (value - 1)) === 0 && value !== 0;
  },

  /**
   * Compute the smallest power of 2 that is greater than or equal to n.
   * @param value 
   * @returns The power of 2.
   */
  ceilPowerOfTwo(value: number): number {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  },

  /**
   * Compute the largest power of 2 that is less than or equal to n.
   * @param value 
   * @returns The power of 2. 
   */
  floorPowerOfTwo(value: number): number {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  },

  /**
   * Sets quaternion q from the intrinsic Proper Euler Angles defined by 
   * angles a, b, and c, and order order. Rotations are applied to the 
   * axes in the order specified by order: rotation by angle a is applied first, 
   * then by angle b, then by angle c. Angles are in radians.
   * @param q - the quaternion to be set
   * @param a - the rotation applied to the first axis, in radians
   * @param b - the rotation applied to the second axis, in radians
   * @param c - the rotation applied to the third axis, in radians
   * @param order - a string specifying the axes order: 'XYX', 'XZX', 'YXY', 'YZY', 'ZXZ', or 'ZYZ'
   */
  setQuaternionFromProperEuler(q: Quaternion, a: number, b: number, c: number, 
        order: 'XYX' | 'XZX' | 'YXY' | 'YZY' | 'ZXZ' | 'ZYZ'): void {
          
    // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

    // rotations are applied to the axes in the order specified by 'order'
    // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
    // angles are in radians

    const { cos } = Math;
    const { sin } = Math;

    const c2 = cos(b / 2);
    const s2 = sin(b / 2);

    const c13 = cos((a + c) / 2);
    const s13 = sin((a + c) / 2);

    const c1_3 = cos((a - c) / 2);
    const s1_3 = sin((a - c) / 2);

    const c3_1 = cos((c - a) / 2);
    const s3_1 = sin((c - a) / 2);

    switch (order) {
      case 'XYX':
        q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
        break;

      case 'YZY':
        q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
        break;

      case 'ZXZ':
        q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
        break;

      case 'XZX':
        q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
        break;

      case 'YXY':
        q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
        break;

      case 'ZYZ':
        q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
        break;

      default:
        console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ${ order}`);
    }
  },

};

