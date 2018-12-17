import { NonWalkableArea } from "./interfaces/non-walkable-area";
import { Hero } from "./interfaces/hero";
import { Crash } from "./interfaces/crash";

export class CollisionDetection {

    private _crash: Crash = {
        left: false,
        right: false,
        top: false,
        bottom: false
    };

    public detect(nonWalkableArea: NonWalkableArea[], hero: Hero, canvas: HTMLCanvasElement): Crash {
        for (let i = 0; i < nonWalkableArea.length; i++) {
            this.crashWithLeft(nonWalkableArea[i], hero);
            if (this._crash.left === true) {
                break;
            }
        }
        for (let j = 0; j < nonWalkableArea.length; j++) {
            this.crashWithRight(nonWalkableArea[j], hero, canvas);
            if (this._crash.right === true) {
                break;
            }
        }
        for (let k = 0; k < nonWalkableArea.length; k++) {
            this.crashWithTop(nonWalkableArea[k], hero);
            if (this._crash.top === true) {
                break;
            }
        }
        for (let l = 0; l < nonWalkableArea.length; l++) {
            this.crashWithBottom(nonWalkableArea[l], hero, canvas);
            if (this._crash.bottom === true) {
                break;
            }
        }
        return this._crash;
      }
    
    private crashWithTop(wall: NonWalkableArea, hero: Hero) {
        const left = hero.x;
        const right = hero.x + (hero.width);
        const top = hero.y;
        const bottom = hero.y + (hero.height);
        const wallleft = wall.x;
        const wallright = wall.x + (wall.width);
        const wallbottom = wall.y + (wall.height);
        this._crash.top = false;
        if ((top <= wallbottom && bottom > wallbottom && right > wallleft+3 && left < wallright-3) || top < 0) {
            this._crash.top = true;
        }
    }
      
    private crashWithBottom(wall: NonWalkableArea, hero: Hero, canvas: HTMLCanvasElement) {
        const left = hero.x;
        const right = hero.x + (hero.width);
        const top = hero.y;
        const bottom = hero.y + (hero.height);
        const wallleft = wall.x;
        const wallright = wall.x + (wall.width);
        const walltop = wall.y;
        this._crash.bottom = false;  
        if ((bottom >= walltop && top < walltop && right > wallleft+5 && left < wallright-5) || bottom > canvas.height) {
            this._crash.bottom = true;
        }
    }
      
    private crashWithRight(wall: NonWalkableArea, hero: Hero, canvas: HTMLCanvasElement) {
        const left = hero.x;
        const right = hero.x + (hero.width);
        const top = hero.y;
        const bottom = hero.y + (hero.height);
        const wallleft = wall.x;
        const walltop = wall.y;
        const wallbottom = wall.y + (wall.height);
        this._crash.right = false;
        if ((right >= wallleft && bottom > walltop+3 && top < wallbottom-3 && left < wallleft) || right > canvas.width) {
            this._crash.right = true;
        }
    }
      
    private crashWithLeft(wall: NonWalkableArea, hero: Hero) {
        const left = hero.x;
        const right = hero.x + (hero.width);
        const top = hero.y;
        const bottom = hero.y + (hero.height);
        const wallright = wall.x + (wall.width);
        const walltop = wall.y;
        const wallbottom = wall.y + (wall.height);
        this._crash.left = false;
        if ((left <= wallright && bottom > walltop+3 && top < wallbottom-3 && right > wallright) || left < 0) {
            this._crash.left = true;
        }
    }
}

export const collisionDetection = new CollisionDetection();