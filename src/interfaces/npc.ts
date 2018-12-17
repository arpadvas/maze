import { NonWalkableArea } from "./non-walkable-area";
import { Entity } from "./entity";

export class Npc extends Entity {

    private _speed: number;
    private _walkable: boolean;
    private _nonWalkableArea: NonWalkableArea;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, acted: number, walkable: boolean) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, acted);
        this._speed = 64;
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
}