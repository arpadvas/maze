import { NonWalkableArea } from "./non-walkable-area";
import { GameArea } from "./game-area";
import { Map } from "./map";
import { Hero } from "./hero";
import { Message } from "./message";
import { Sound } from "./sound";
import { Item } from "./item";
import { Crash } from "./crash";
import { texts } from "../constants/texts";
import { Atlas } from './atlas';
import { collisionDetection } from '../collision';
import { spriteTiles } from '../constants/tiles';
import { talkToNpc, checkIfItemActionable } from '../action';
import { GameSound, GameSoundType } from "../constants/sounds";
import { find } from 'lodash';

export class Game {

    private _isGameOver: boolean = false;
    private _textFrame: number;
    private _now: any;
    private _then: number;
    private _sounds: Sound[] = [];
    private _hero: Hero;
    private _npcs: Hero[] = [];
    private _gameArea: GameArea;
    private _items: Item[] = [];
    private _msgs: Message[] = [];
    private _crash: Crash;
    private _isNonWalkableAreaFilled: boolean;
    private _gameSounds: Array<GameSound>;
    private _map: Map;
    private _nonWalkableArea: NonWalkableArea[];
    private _isNpcTalked: boolean;

    constructor(
            gameArea: GameArea,
            map: Map,
            gameSounds: Array<GameSound>,
            hero: Hero,
            npcs: Hero[],
            items: Item[],
            msgs: Message[]
        ) {
        this._nonWalkableArea = [];
        this._textFrame = 0;
        this._gameArea = gameArea;
        this._map = map;

        this._crash = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        this._isNonWalkableAreaFilled = false;
        this._isNpcTalked = false;
        this._gameSounds = gameSounds;
        this._hero = hero;
        this._npcs = npcs;
        this._items = items;
        this._msgs = msgs;
        this.startGame();
    }

    get textFrame() {
        return this._textFrame;
    }

    set textFrame(number: number) {
        this._textFrame = number;
    }

    private startGame() {
        this.createSounds(this._gameSounds);
        // this.playBackgroundSound(this._sounds);
        this._then = Date.now();
        this._msgs[0].text = texts[11];
        this._textFrame = -300;
        this._gameArea.start(this.main);
    }

    private createSounds(gameSounds: Array<GameSound>) {
        for (let i = 1; i < gameSounds.length; i++) {
            let newSound: Sound;
            if (gameSounds[i].type === GameSoundType.JarbreakSound) {
                newSound = new Sound(gameSounds[i].src, 1, true, gameSounds[i].type);
            } else {
                newSound = new Sound(gameSounds[i].src, 1, false, gameSounds[i].type);
            }
            this._sounds = [...this._sounds, newSound]
        }
    }

    private playBackgroundSound(sounds: Sound[]) {
        const backgroundSound: Sound = find(sounds, ['type', GameSoundType.BackgroundSound]);
        if (backgroundSound) {
            backgroundSound.play();
        }
    }

    private main = () => {
        this._now = Date.now();
        const delta = this._now - this._then;
        this._gameArea.clear();
        this._map.tileCreator(0, this._gameArea.context, this._isNonWalkableAreaFilled);
        this._map.tileCreator(1, this._gameArea.context, this._isNonWalkableAreaFilled);
        if (!this._isNonWalkableAreaFilled) {
            this._nonWalkableArea = this._map.nonWalkableArea;
            this.collectNonWalkableArea(this._npcs);
            this.collectNonWalkableArea(this._items);
        }
        this._isNonWalkableAreaFilled = true;
        collisionDetection(this._nonWalkableArea, this._hero, this._crash, this._gameArea.canvas);
        this.update(delta/1000);
        this.renderItems();
        this._hero.render(this._gameArea.context);
        this._npcs[0].render(this._gameArea.context);
        this.renderMsgs();
        this._then = this._now;
        if (this._isGameOver === false) {
          window.requestAnimationFrame(this.main);
        }
    }

    collectNonWalkableArea(array: Item[] | Hero[]) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].nonWalkableArea) {
                this._nonWalkableArea.push(array[i].nonWalkableArea);
            }
        }
    }
    
    renderItems() {
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].acted === 0 || this._items[i].acted === 1) {
                this._items[i].render(this._gameArea.context);
              if (this._items[i].type === "torch") {
                this._items[i].burn();
              }
            }  
        }
    }
    
    renderMsgs() {
        for (let i = 0; i < this._msgs.length; i++) {
            this._msgs[i].render(this._gameArea.context);
            this._msgs[i].zero(this, this._msgs);
        }
    }
    
    makeItemWalkable(item: Item) {
        for (let i = 0; i < this._nonWalkableArea.length; i++) {
            if (this._nonWalkableArea[i].x === item.x && this._nonWalkableArea[i].y === item.y) {
                this._nonWalkableArea.splice(i, 1);
            }
          }
    }
    
    update(modifier: number) {
        const footSound: Sound = find(this._sounds, ['type', GameSoundType.FootSound]);
        if (this._hero.y < 0) {
            this._isGameOver = true;
            this._msgs[0].text = texts[14];
        }
        if (this._gameArea.key && this._gameArea.key == 37 && this._crash.left === false) {
            this._hero.sourceY = 16;
            this._hero.sourceX = spriteTiles.coordinatesLeft[spriteTiles.frameLeft];
            this._hero.x -= this._hero.speed * modifier;
            spriteTiles.frameLeft = (spriteTiles.frameLeft + 1) % spriteTiles.coordinatesLeft.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this._gameArea.key && this._gameArea.key == 39 && this._crash.right === false) {
            this._hero.sourceY = 32;
            this._hero.sourceX = spriteTiles.coordinatesRight[spriteTiles.frameRight];
            this._hero.x += this._hero.speed * modifier;
            spriteTiles.frameRight = (spriteTiles.frameRight + 1) % spriteTiles.coordinatesRight.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this._gameArea.key && this._gameArea.key == 38 && this._crash.top === false) {
            this._hero.sourceY = 48;
            this._hero.sourceX = spriteTiles.coordinatesTop[spriteTiles.frameTop];
            this._hero.y -= this._hero.speed * modifier; 
            spriteTiles.frameTop = (spriteTiles.frameTop + 1) % spriteTiles.coordinatesTop.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this._gameArea.key && this._gameArea.key == 40 && this._crash.bottom === false) {
            this._hero.sourceY = 0;
            this._hero.sourceX = spriteTiles.coordinatesBottom[spriteTiles.frameBottom];
            this._hero.y += this._hero.speed * modifier; 
            spriteTiles.frameBottom = (spriteTiles.frameBottom + 1) % spriteTiles.coordinatesBottom.length;
            if (footSound) {
                footSound.play();
            }
        } 
        if (this._gameArea.key && (this._gameArea.key == 79 || this._gameArea.key == 83 || this._gameArea.key == 75)) {
            checkIfItemActionable(this._gameArea.key, this._items, this._hero, this._msgs, this, this._sounds, this._npcs, this.makeItemWalkable);
        }
        if (this._gameArea.key && this._gameArea.key == 84) {
            if (this._isNpcTalked === false) {
              talkToNpc(this._npcs, this._hero, this._msgs, this, this._items);
              this._isNpcTalked = true;
            }
        }
        if (this._gameArea.key && this._gameArea.key == 72) {
            this._msgs[0].text = texts[12];
            this._msgs[1].text = texts[13];
            this._textFrame = -600;
        }
        if (this._gameArea.key === undefined) {
            this._hero.sourceX = 16;
            this._hero.sourceY = 0;
            this._isNpcTalked = false;
        }
    }
}