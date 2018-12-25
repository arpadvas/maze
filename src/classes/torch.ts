import { NonWalkableArea } from "./non-walkable-area";
import { torchTiles } from "../constants/tiles";
import { Item } from "../classes/item";

export class Torch extends Item {

    private _nonWalkableArea: NonWalkableArea;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, walkable: boolean, canBeActioned: boolean, locked: boolean, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, walkable, canBeActioned, locked, acted);
        if (!walkable) {
            this._nonWalkableArea = new NonWalkableArea(this.x, this.y, this.width, this.height);
        }
    }

    public getnonWalkableArea(): NonWalkableArea {
        return this._nonWalkableArea;
    }

    public burn() {
       this.sourceX = torchTiles.coordinates[torchTiles.frame];
       torchTiles.frame = (torchTiles.frame + 1) % torchTiles.coordinates.length;
    }

}