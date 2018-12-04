import { NonWalkableArea } from "./interfaces/non-walkable-area";
import { Hero } from "./interfaces/hero";
import { Crash } from "./interfaces/crash";

export function collisionDetection(nonWalkableArea: NonWalkableArea[], hero: Hero, crash: Crash, canvas: HTMLCanvasElement) {
    for (let i = 0; i < nonWalkableArea.length; i++) {
        crashWithLeft(nonWalkableArea[i], hero, crash);
        if (crash.left === true) {
            break;
        }
    }
    for (let j = 0; j < nonWalkableArea.length; j++) {
        crashWithRight(nonWalkableArea[j], hero, crash, canvas);
        if (crash.right === true) {
            break;
        }
    }
    for (let k = 0; k < nonWalkableArea.length; k++) {
        crashWithTop(nonWalkableArea[k], hero, crash);
        if (crash.top === true) {
            break;
        }
    }
    for (let l = 0; l < nonWalkableArea.length; l++) {
        crashWithBottom(nonWalkableArea[l], hero, crash, canvas);
        if (crash.bottom === true) {
            break;
        }
    }
  }

function crashWithTop(wall: NonWalkableArea, hero: Hero, crash: Crash) {
    var left = hero.x;
    var right = hero.x + (hero.width);
    var top = hero.y;
    var bottom = hero.y + (hero.height);
    var wallleft = wall.x;
    var wallright = wall.x + (wall.width);
    var walltop = wall.y;
    var wallbottom = wall.y + (wall.height);
    crash.top = false;
    if ((top <= wallbottom && bottom > wallbottom && right > wallleft+3 && left < wallright-3) || top < 0) {
        crash.top = true;
    }
}
  
function crashWithBottom(wall: NonWalkableArea, hero: Hero, crash: Crash, canvas: HTMLCanvasElement) {
    var left = hero.x;
    var right = hero.x + (hero.width);
    var top = hero.y;
    var bottom = hero.y + (hero.height);
    var wallleft = wall.x;
    var wallright = wall.x + (wall.width);
    var walltop = wall.y;
    var wallbottom = wall.y + (wall.height);
    crash.bottom = false;  
    if ((bottom >= walltop && top < walltop && right > wallleft+5 && left < wallright-5) || bottom > canvas.height) {
        crash.bottom = true;
    }
}
  
function crashWithRight(wall: NonWalkableArea, hero: Hero, crash: Crash, canvas: HTMLCanvasElement) {
    var left = hero.x;
    var right = hero.x + (hero.width);
    var top = hero.y;
    var bottom = hero.y + (hero.height);
    var wallleft = wall.x;
    var wallright = wall.x + (wall.width);
    var walltop = wall.y;
    var wallbottom = wall.y + (wall.height);
    crash.right = false;
    if ((right >= wallleft && bottom > walltop+3 && top < wallbottom-3 && left < wallleft) || right > canvas.width) {
        crash.right = true;
    }
}
  
function crashWithLeft(wall: NonWalkableArea, hero: Hero, crash: Crash) {
    var left = hero.x;
    var right = hero.x + (hero.width);
    var top = hero.y;
    var bottom = hero.y + (hero.height);
    var wallleft = wall.x;
    var wallright = wall.x + (wall.width);
    var walltop = wall.y;
    var wallbottom = wall.y + (wall.height);
    crash.left = false;
    if ((left <= wallright && bottom > walltop+3 && top < wallbottom-3 && right > wallright) || left < 0) {
        crash.left = true;
    }
}