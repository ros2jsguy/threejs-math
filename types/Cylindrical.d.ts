/**
 * Ref: https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
 */
import { Base } from './Base';
import type { Vector3 } from './Vector3';
export declare class Cylindrical extends Base {
    radius: number;
    theta: number;
    y: number;
    constructor(radius?: number, theta?: number, y?: number);
    get isCylindrical(): boolean;
    set(radius: number, theta: number, y: number): this;
    copy(other: Cylindrical): this;
    setFromVector3(v: Vector3): this;
    setFromCartesianCoords(x: number, y: number, z: number): this;
    clone(): Cylindrical;
}
