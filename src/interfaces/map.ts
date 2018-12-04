import TileAtlas from '../../pics/basictiles.png';
import { NonWalkableArea } from "./non-walkable-area";
import { mapTiles } from '../constants/tiles';

const tileAtlas = new Image();
tileAtlas.src = TileAtlas;

export class Map {
    private cols = 32;
    private rows = 32;
    private tsize = 16;
    private _nonWalkableArea: NonWalkableArea[] = [];
    private layers = [[
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,15,4,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,15,2,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,15,2,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,16,16,16,16,16,16,0,0,0,0,0,0,0,0,0,2,15,2,0,0,0,0,
              0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,23,0,0,0,0,0,0,0,0,3,15,3,0,0,0,0,
              16,16,16,16,16,16,16,16,16,16,15,15,15,15,15,15,16,16,16,16,16,16,16,16,16,15,15,15,23,0,0,0,
              15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              23,23,23,23,23,4,15,15,15,4,23,23,23,23,23,4,1,1,1,1,4,1,1,1,1,15,15,15,23,0,0,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,15,15,15,15,2,15,15,15,15,15,15,15,16,16,0,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,15,15,15,15,2,15,15,15,15,15,15,15,15,15,23,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,1,1,15,1,1,15,15,15,15,15,15,15,15,15,23,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,
              0,0,0,0,0,2,15,15,15,2,0,0,0,0,0,2,15,15,15,15,4,1,1,1,1,15,15,15,23,23,23,0,
              0,0,4,1,1,2,15,15,15,1,1,1,4,0,0,2,15,15,15,15,2,0,0,0,23,15,15,15,23,0,0,0,
              0,0,2,15,15,2,15,15,15,15,15,15,2,0,0,3,1,1,1,1,3,0,0,0,23,15,15,15,23,0,0,0,
              0,0,2,15,15,2,15,15,15,15,15,15,2,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,2,3,15,3,15,15,15,15,15,15,2,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,2,15,15,15,15,15,15,15,15,15,2,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,2,15,15,15,15,15,15,15,15,15,2,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,3,1,1,1,1,1,1,1,1,1,3,0,0,16,16,16,16,16,16,16,16,16,16,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,15,15,15,15,15,15,15,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,23,23,23,23,23,23,23,23,23,23,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,15,15,15,23,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,23,23,23,23,0,0,0
    ],
    [
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,25,26,26,26,26,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
              26,26,26,26,26,26,26,26,26,26,0,0,0,0,0,0,26,26,26,26,26,26,26,26,26,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              42,42,42,42,42,0,0,0,0,0,42,42,42,42,42,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,43,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,57,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,26,26,26,26,26,26,26,26,26,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,41,42,42,42,42,42,42,42,42,42,0,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,35,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,41,42,32,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

    ]];

    getTile(layer:number, col: number, row: number) {
        return this.layers[layer][row * this.cols + col];
    };

    tileCreator(layer: number, context: CanvasRenderingContext2D, isNonWalkableAreaFilled: boolean) {
        for (var c = 0; c < this.cols; c++) {
            for (var r = 0; r < this.rows; r++) {
                var tile = this.getTile(layer, c, r);
                if (tile !== 0) {
                    context.drawImage(tileAtlas, mapTiles[tile-1].x, mapTiles[tile-1].y, 16, 16, c * this.tsize, r * this.tsize, this.tsize, this.tsize);
                    if ((tile === 1 || tile === 2 || tile === 3 || tile === 4 || tile === 16 || tile === 23 || tile === 32 || tile === 57 || tile === 58) && isNonWalkableAreaFilled === false) {
                        this._nonWalkableArea.push(new NonWalkableArea(c * this.tsize, r * this.tsize, this.tsize, this.tsize));
                    }
                }
            }
        }
    }

    get nonWalkableArea(): NonWalkableArea[] {
        return this._nonWalkableArea;
    }
};