import { Entity } from "./entity";
import { NonWalkableArea } from "./non-walkable-area";

export abstract class Item extends Entity {

    public walkable: boolean;
    public canBeActioned: boolean;
    public locked: boolean;
    public acted: number;

      constructor(image :HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, walkable: boolean, canBeActioned: boolean, locked: boolean, acted: number) {
        super(image, sourceX, sourceY, swidth, sheight, x, y, width, height);
        this.walkable = walkable;
        this.canBeActioned = canBeActioned;
        this.locked = locked;
        this.acted = acted;
    }

    abstract getnonWalkableArea(): NonWalkableArea;

    public burn() {
        return;
    }

    public toggle() {
        return;
    }

    public open() {
        return;
    }

    public break() {
        return;
    }

}