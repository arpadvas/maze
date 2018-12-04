import { Entity } from "./entity";
import { NonWalkableArea } from "./non-walkable-area";
import { doorTiles, torchTiles, switchTiles, potTiles } from "../constants/tiles";

export class Item extends Entity {

    type: string;
    doable: boolean;
    opened: boolean;
    switched: boolean;
    broken: boolean; 
    private _nonWalkableArea: NonWalkableArea;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, walkable: boolean, type: string, doable: boolean, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height, acted);
        this.type = type;
        this.doable = doable;
        this.opened = false;
        this.switched = false;
        this.broken = false;
        if (!walkable) {
            this._nonWalkableArea = new NonWalkableArea(this.x, this.y, this.width, this.height);
        }
    }

    get nonWalkableArea(): NonWalkableArea {
        return this._nonWalkableArea;
    }

    open() {
       this.sourceY = doorTiles.coordinates[doorTiles.frame];
       if (doorTiles.frame != 5) {
         doorTiles.frame = (doorTiles.frame + 1);
       } 
       else {
         doorTiles.frame = 5;
         this.opened = false;
       }
    }

    burn() {
       this.sourceX = torchTiles.coordinates[torchTiles.frame];
       torchTiles.frame = (torchTiles.frame + 1) % torchTiles.coordinates.length;
    }

    switch() {
       this.sourceX = switchTiles.coordinates[switchTiles.frame];
       if (switchTiles.frame != 3) {
         switchTiles.frame = (switchTiles.frame + 1);
       } 
       else {
         switchTiles.frame = 3;
         this.switched = false;
       }
    }

    kick() {
       this.sourceY = potTiles.coordinates[potTiles.frame];
       if (potTiles.frame != 5) {
         potTiles.frame = (potTiles.frame + 1);
       } 
       else {
         potTiles.frame = 5;
         this.broken = false;
       }
    }
}