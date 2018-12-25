import { NonWalkableArea } from "./non-walkable-area";
import { Item } from "./item";
import { chestTiles } from "../constants/tiles";

export class Chest extends Item {

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

    public open() {
        this.sourceY = chestTiles.coordinates[chestTiles.frame];
        if (chestTiles.frame != 5) {
            chestTiles.frame = (chestTiles.frame + 1);
        } 
        else {
            chestTiles.frame = 5;
            this.acted = 1;
        }
     }

}