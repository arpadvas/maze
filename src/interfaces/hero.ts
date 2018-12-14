import { Entity } from "./entity";
import { NonWalkableArea } from "./non-walkable-area";

export class Hero extends Entity {

    private _speed: number;
    private _walkable: boolean;
    private _nonWalkableArea: NonWalkableArea;
    private _type: string;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, acted: number, type: string, walkable: boolean) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, acted);
        this._speed = 64;
        this._type = type;
        this._walkable = walkable;
        if (!this._walkable) {
            this._nonWalkableArea = new NonWalkableArea(this.x, this.y, this.width, this.height);
        }
    }

    get nonWalkableArea(): NonWalkableArea {
        return this._nonWalkableArea;
    }

    get speed(): number {
        return this._speed;
    }

    get type(): string {
        return this._type;
    }
}