import { NonWalkableArea } from "./non-walkable-area";
import { GameArea } from "./game-area";
import { Map } from "./map";

export class Game {

    nonWalkableArea: NonWalkableArea[];
    isGameOver: boolean = false;
    private _textFrame: number;
    gameArea: GameArea;
    map: Map;

    constructor(
            nonWalkableArea: NonWalkableArea[],
            textFrame: number,
            gameArea: GameArea,
            map: Map
        ) {
        this.nonWalkableArea = nonWalkableArea;
        this._textFrame = textFrame;
        this.gameArea = gameArea;
        this.map = map;
    }

    get textFrame() {
        return this._textFrame;
    }

    set textFrame(number: number) {
        this._textFrame = number;
    }
}