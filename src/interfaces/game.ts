import { NonWalkableArea } from "./non-walkable-area";

export class Game {

    nonWalkableArea: NonWalkableArea[];
    private _textFrame: number;

    constructor(
            nonWalkableArea: NonWalkableArea[],
            textFrame: number
        ) {
        this.nonWalkableArea = nonWalkableArea;
        this._textFrame = textFrame;
    }

    get textFrame() {
        return this._textFrame;
    }

    set textFrame(number: number) {
        this._textFrame = number;
    }
}