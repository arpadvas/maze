import { NonWalkableArea } from "./non-walkable-area";
import { Entity } from "./entity";

export class Npc extends Entity {

    private _walkable: boolean;
    private _nonWalkableArea: NonWalkableArea;
    public canBeActioned: boolean;
    public locked: boolean;
    public acted: number;

    constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, walkable: boolean, canBeActioned: boolean, locked: boolean, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height);
        this._walkable = walkable;
        this.canBeActioned = canBeActioned;
        this.locked = locked;
        this.acted = acted;
        if (!this._walkable) {
            this._nonWalkableArea = new NonWalkableArea(this.x, this.y, this.width, this.height);
        }
    }

    public getnonWalkableArea(): NonWalkableArea {
        return this._nonWalkableArea;
    }

}