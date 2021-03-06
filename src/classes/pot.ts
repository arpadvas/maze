import { NonWalkableArea } from "./non-walkable-area";
import { potTiles } from "../constants/tiles";
import { Item } from "./item";

export class Pot extends Item {

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

    public break() {
       this.sourceY = potTiles.coordinates[potTiles.frame];
       if (potTiles.frame != 5) {
         potTiles.frame = (potTiles.frame + 1);
       } 
       else {
         potTiles.frame = 5;
         this.acted = 1;
       }
    }

}