import { Entity } from "./entity";
import { NonWalkableArea } from "./non-walkable-area";

export class Hero extends Entity {

    speed: number;
    type: string;
    walkable: boolean;
    private _nonWalkableArea: NonWalkableArea;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, walkable: boolean, type: string, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, acted);
        this.speed = 64;
        this.type = type;
        if (!walkable) {
            this._nonWalkableArea = new NonWalkableArea(this.x, this.y, this.width, this.height);
        }
    }

    get nonWalkableArea(): NonWalkableArea {
        return this._nonWalkableArea;
    }
}