import { Entity } from "./entity";

export class Hero extends Entity {

    private _speed: number;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, acted);
        this._speed = 64;
    }

    get speed(): number {
        return this._speed;
    }
}