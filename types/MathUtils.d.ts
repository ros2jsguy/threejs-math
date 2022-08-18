import type { Quaternion } from './Quaternion';

export declare const MathUtils: {
  DEG2RAD: number;
  RAD2DEG: number;
  /**
   * Generate a UUID (universally unique identifier).
   * @returns The UUID string.
   */
  generateUUID: () => string;
  /**
   * Clamps the x to be between a and b.
   *
   * @param value Value to be clamped.
   * @param min Minimum value
   * @param max Maximum value.
   */
  clamp: (value: number, min: number, max: number) => number;
  /**
   * Compute euclidian modulo of m % n
   * ( ( n % m ) + m ) % m
   * https://en.wikipedia.org/wiki/Modulo_operation
   * @param n - target
   * @param m - modulus
   * @returns The Euclidean modulo
   */
  euclideanModulo: (n: number, m: number) => number;
  /**
   * Linear mapping of x from range [a1, a2] to range [b1, b2].
   *
   * @param x Value to be mapped.
   * @param a1 Minimum value for range A.
   * @param a2 Maximum value for range A.
   * @param b1 Minimum value for range B.
   * @param b2 Maximum value for range B.
   */
  mapLinear: (x: number, a1: number, a2: number, b1: number, b2: number) => number;
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
  inverseLerp: (x: number, y: number, value: number) => number;
  /**
   * Returns a value linearly interpolated from two known points based
   * on the given interval - t = 0 will return x and t = 1 will return y.
   * https://en.wikipedia.org/wiki/Linear_interpolation
   * @param x Start point.
   * @param y End point.
   * @param t interpolation factor in the closed interval [0, 1]
   */
  lerp: (x: number, y: number, t: number) => number;
  /**
   * Smoothly interpolate a number from x toward y in a spring-like
   * manner using the dt to maintain frame rate independent movement.
   * http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
   * @param x Current point.
   * @param y Target point.
   * @param lambda A higher lambda value will make the movement more sudden, and a lower value will make the movement more gradual.
   * @param dt Delta time in seconds.
   */
  damp: (x: number, y: number, lambda: number, dt: number) => number;
  /**
   * Returns a value that alternates between 0 and length.
   * https://www.desmos.com/calculator/vcsjnyz7x4
   * @param x The value to pingpong.
   * @param length The positive value the export function will pingpong to. Default is 1.
   */
  pingpong: (x: number, length?: number) => number;
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
  smoothstep: (x: number, min: number, max: number) => number;
  /**
   * Compute a value between 0-1. A variation on smoothstep that has
   * zero 1st and 2nd order derivatives at x=0 and x=1.
   * @param x - The value to evaluate based on its position between min and max.
   * @param min - Any x value below min will be 0.
   * @param max - Any x value above max will be 1.
   * @returns The step value.
   */
  smootherstep: (x: number, min: number, max: number) => number;
  /**
   * Random integer in the interval [low, high].
   * @param low
   * @param high
   * @returns The random integer.
   */
  randInt: (low: number, high: number) => number;
  /**
   * Random float in the interval [low, high].
   * @param low
   * @param high
   * @returns The random float.
   */
  randFloat: (low: number, high: number) => number;
  /**
   * Random float in the interval [- range / 2, range / 2].
   * @param range -
   * @returns The random float.
   */
  randFloatSpread: (range: number) => number;
  /**
   * Deterministic pseudo-random float in the interval [ 0, 1 ].
   * @param s - The seed
   * @returns The random number
   */
  seededRandom: (s?: number) => number;
  /**
   * Converts degrees to radians.
   * @param degrees
   * @returns Radians
   */
  degToRad: (degrees: number) => number;
  /**
   * Convert radians to degrees.
   * @param radians - The radians to convert
   * @returns The degrees.
   */
  radToDeg: (radians: number) => number;
  /**
   * Determine if a value is a power of 2.
   * @param value - The value to test.
   * @returnsvTrue if n is a power of 2.
   */
  isPowerOfTwo: (value: number) => boolean;
  /**
   * Compute the smallest power of 2 that is greater than or equal to n.
   * @param value
   * @returns The power of 2.
   */
  ceilPowerOfTwo: (value: number) => number;
  /**
   * Compute the largest power of 2 that is less than or equal to n.
   * @param value
   * @returns The power of 2.
   */
  floorPowerOfTwo: (value: number) => number;
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
  setQuaternionFromProperEuler: (q: Quaternion, a: number, b: number, c: number, order: 'XYX' | 'XZX' | 'YXY' | 'YZY' | 'ZXZ' | 'ZYZ') => void;
};
