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
    public nonWalkableArea: NonWalkableArea[];
    public gameArea: GameArea;
    public map: Map;
    public hero: Hero;
    public msgs: Message[] = [];
    public sounds: Sound[] = [];
    public npcs: Hero[] = [];
    public items: Item[] = [];
    public isNonWalkableAreaFilled = false;
    public isNpcTalked = false;
    public crash: Crash = {
        left: false,
        right: false,
        top: false,
        bottom: false
    }
    public atlas: Atlas;
    public gameSounds: Array<GameSound>;

    constructor(
            gameArea: GameArea,
            map: Map,
            characterAtlas: HTMLImageElement,
            otherAtlas: HTMLImageElement,
            itemAtlas: HTMLImageElement,
            gameSounds: Array<GameSound>
        ) {
        this.nonWalkableArea = [];
        this._textFrame = 0;
        this.gameArea = gameArea;
        this.map = map;
        this.atlas = {
            characterAtlas: new Image(),
            otherAtlas: new Image(),
            itemAtlas: new Image()
        };
        this.atlas.characterAtlas.src = characterAtlas;
        this.atlas.otherAtlas.src = otherAtlas;
        this.atlas.itemAtlas.src = itemAtlas;
        this.gameSounds = gameSounds;
        this.startGame();
    }

    get textFrame() {
        return this._textFrame;
    }

    set textFrame(number: number) {
        this._textFrame = number;
    }

    private startGame() {
        this.createSounds(this.gameSounds);
        // this.playBackgroundSound(this.sounds);
        this._then = Date.now();
        this.hero = new Hero(this.atlas.characterAtlas, 16, 0, 16, 16, 0, 112, 16, 16, true, "hero", 0);
        this.npcs[0] = new Hero(this.atlas.characterAtlas, 64, 0, 16, 16, 272, 160, 16, 16, false, "npc", 0);
        this.items[0] = new Item(this.atlas.otherAtlas, 0, 0, 16, 16, 64, 304, 16, 16, false, "door", false, 0);
        this.items[1] = new Item(this.atlas.otherAtlas, 0, 0, 16, 16, 288, 192, 16, 16, false, "door", true, 0);
        this.items[2] = new Item(this.atlas.otherAtlas, 96, 0, 16, 16, 464, 176, 16, 16, false, "chest", false, 0);
        this.items[3] = new Item(this.atlas.otherAtlas, 48, 64, 16, 16, 320, 368, 16, 16, false, "switch", false, 0);
        this.items[4] = new Item(this.atlas.otherAtlas, 144, 0, 16, 16, 48, 272, 16, 16, false, "pot", true, 0);
        this.items[5] = new Item(this.atlas.otherAtlas, 0, 64, 16, 16, 176, 336, 16, 16, false, "torch", true, 0);
        this.items[6] = new Item(this.atlas.otherAtlas, 0, 0, 16, 16, 416, 64, 16, 16, false, "door", false, 0);
        this.items[7] = new Item(this.atlas.otherAtlas, 0, 64, 16, 16, 48, 336, 16, 16, false, "torch", true, 0);
        this.items[8] = new Item(this.atlas.itemAtlas, 96, 0, 32, 32, 16, 16, 24, 24, true, "item", false, 2);
        this.items[9] = new Item(this.atlas.itemAtlas, 128, 0, 32, 32, 48, 16, 24, 24, true, "item", false, 2);
        this.items[10] = new Item(this.atlas.itemAtlas, 192, 32, 32, 32, 80, 16, 24, 24, true, "item", false, 2);
        this.items[11] = new Item(this.atlas.otherAtlas, 0, 64, 16, 16, 256, 256, 16, 16, false, "torch", true, 0);
        this.items[12] = new Item(this.atlas.otherAtlas, 0, 64, 16, 16, 304, 256, 16, 16, false, "torch", true, 0);
        this.items[13] = new Item(this.atlas.otherAtlas, 0, 64, 16, 16, 176, 272, 16, 16, false, "torch", true, 0);
        this.items[14] = new Item(this.atlas.otherAtlas, 144, 0, 16, 16, 240, 368, 16, 16, false, "pot", true, 0);
        this.items[15] = new Item(this.atlas.otherAtlas, 144, 0, 16, 16, 240, 432, 16, 16, false, "pot", true, 0);
        this.items[16] = new Item(this.atlas.otherAtlas, 96, 0, 16, 16, 240, 64, 16, 16, false, "chest", true, 0);
        this.items[17] = new Item(this.atlas.otherAtlas, 96, 0, 16, 16, 464, 224, 16, 16, false, "chest", false, 0);
        this.items[18] = new Item(this.atlas.otherAtlas, 48, 64, 16, 16, 336, 160, 16, 16, false, "switch", true, 0);
        this.msgs[0] = new Message(texts[0], 130, 15);
        this.msgs[1] = new Message(texts[0], 130, 35);
        this.msgs[0].text = texts[11];
        this._textFrame = -300;
        this.gameArea.start(this.main);
    }

    private createSounds(gameSounds: Array<GameSound>) {
        for (let i = 1; i < gameSounds.length; i++) {
            let newSound: Sound;
            if (gameSounds[i].type === GameSoundType.JarbreakSound) {
                newSound = new Sound(gameSounds[i].src, 1, true, gameSounds[i].type);
            } else {
                newSound = new Sound(gameSounds[i].src, 1, false, gameSounds[i].type);
            }
            this.sounds = [...this.sounds, newSound]
        }
    }

    private playBackgroundSound(sounds: Sound[]) {
        const backgroundSound: Sound = find(sounds, ['type', GameSoundType.BackgroundSound]);
        if (backgroundSound) {
            backgroundSound.play();
        }
    }

    main = () => {
        this._now = Date.now();
        const delta = this._now - this._then;
        this.gameArea.clear();
        this.map.tileCreator(0, this.gameArea.context, this.isNonWalkableAreaFilled);
        this.map.tileCreator(1, this.gameArea.context, this.isNonWalkableAreaFilled);
        if (!this.isNonWalkableAreaFilled) {
            this.nonWalkableArea = this.map.nonWalkableArea;
            this.collectNonWalkableArea(this.npcs);
            this.collectNonWalkableArea(this.items);
        }
        this.isNonWalkableAreaFilled = true;
        collisionDetection(this.nonWalkableArea, this.hero, this.crash, this.gameArea.canvas);
        this.update(delta/1000);
        this.renderItems();
        this.hero.render(this.gameArea.context);
        this.npcs[0].render(this.gameArea.context);
        this.renderMsgs();
        this._then = this._now;
        if (this._isGameOver === false) {
          window.requestAnimationFrame(this.main);
        }
    }

    collectNonWalkableArea(array: Item[] | Hero[]) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].nonWalkableArea) {
                this.nonWalkableArea.push(array[i].nonWalkableArea);
            }
        }
    }
    
    renderItems() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].acted === 0 || this.items[i].acted === 1) {
                this.items[i].render(this.gameArea.context);
              if (this.items[i].type === "torch") {
                this.items[i].burn();
              }
            }  
        }
    }
    
    renderMsgs() {
        for (let i = 0; i < this.msgs.length; i++) {
            this.msgs[i].render(this.gameArea.context);
            this.msgs[i].zero(this, this.msgs);
        }
    }
    
    makeItemWalkable(item: Item) {
        for (let i = 0; i < this.nonWalkableArea.length; i++) {
            if (this.nonWalkableArea[i].x === item.x && this.nonWalkableArea[i].y === item.y) {
                this.nonWalkableArea.splice(i, 1);
            }
          }
    }
    
    update(modifier: number) {
        const footSound: Sound = find(this.sounds, ['type', GameSoundType.FootSound]);
        if (this.hero.y < 0) {
            this._isGameOver = true;
            this.msgs[0].text = texts[14];
        }
        if (this.gameArea.key && this.gameArea.key == 37 && this.crash.left === false) {
            this.hero.sourceY = 16;
            this.hero.sourceX = spriteTiles.coordinatesLeft[spriteTiles.frameLeft];
            this.hero.x -= this.hero.speed * modifier;
            spriteTiles.frameLeft = (spriteTiles.frameLeft + 1) % spriteTiles.coordinatesLeft.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this.gameArea.key && this.gameArea.key == 39 && this.crash.right === false) {
            this.hero.sourceY = 32;
            this.hero.sourceX = spriteTiles.coordinatesRight[spriteTiles.frameRight];
            this.hero.x += this.hero.speed * modifier;
            spriteTiles.frameRight = (spriteTiles.frameRight + 1) % spriteTiles.coordinatesRight.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this.gameArea.key && this.gameArea.key == 38 && this.crash.top === false) {
            this.hero.sourceY = 48;
            this.hero.sourceX = spriteTiles.coordinatesTop[spriteTiles.frameTop];
            this.hero.y -= this.hero.speed * modifier; 
            spriteTiles.frameTop = (spriteTiles.frameTop + 1) % spriteTiles.coordinatesTop.length;
            if (footSound) {
                footSound.play();
            }
        }
        if (this.gameArea.key && this.gameArea.key == 40 && this.crash.bottom === false) {
            this.hero.sourceY = 0;
            this.hero.sourceX = spriteTiles.coordinatesBottom[spriteTiles.frameBottom];
            this.hero.y += this.hero.speed * modifier; 
            spriteTiles.frameBottom = (spriteTiles.frameBottom + 1) % spriteTiles.coordinatesBottom.length;
            if (footSound) {
                footSound.play();
            }
        } 
        if (this.gameArea.key && (this.gameArea.key == 79 || this.gameArea.key == 83 || this.gameArea.key == 75)) {
            checkIfItemActionable(this.gameArea.key, this.items, this.hero, this.msgs, this, this.sounds, this.npcs, this.makeItemWalkable);
        }
        if (this.gameArea.key && this.gameArea.key == 84) {
            if (this.isNpcTalked === false) {
              talkToNpc(this.npcs, this.hero, this.msgs, this, this.items);
              this.isNpcTalked = true;
            }
        }
        if (this.gameArea.key && this.gameArea.key == 72) {
            this.msgs[0].text = texts[12];
            this.msgs[1].text = texts[13];
            this._textFrame = -600;
        }
        if (this.gameArea.key === undefined) {
            this.hero.sourceX = 16;
            this.hero.sourceY = 0;
            this.isNpcTalked = false;
        }
    }
}