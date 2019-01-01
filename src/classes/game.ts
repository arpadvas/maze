import { NonWalkableArea } from "./non-walkable-area";
import { GameArea } from "./game-area";
import { Map } from "./map";
import { Hero } from "./hero";
import { Sound } from "./sound";
import { Item } from "./item";
import { Crash } from "../interfaces/crash";
import { texts } from "../constants/texts";
import { CollisionDetection } from './collision-detection';
import { spriteTiles } from '../constants/tiles';
import { GameSound, GameSoundType } from "../constants/sounds";
import { find, once } from 'lodash';
import { Npc } from "./npc";
import { Torch } from "./torch";
import { ActionOnEntities } from "./action-on-entities";
import { Messenger } from "./messenger";
import { ActionEffects } from "./action-effects";
import { ActionResult, MessageChange } from "../interfaces/action-result";

export class Game {

    private _isGameOver: boolean = false;
    private _now: any;
    private _then: number;
    private _sounds: Sound[] = [];
    private _hero: Hero;
    private _npcs: Npc[] = [];
    private _gameArea: GameArea;
    private _items: Item[] = [];
    private _crash: Crash;
    private _isNonWalkableAreaFilled: boolean;
    private _gameSounds: Array<GameSound>;
    private _map: Map;
    private _nonWalkableArea: NonWalkableArea[];
    private _collisionDetection: CollisionDetection;
    private _isNeedToPlayBackgroundSound: boolean;
    private _actionOnEntities: ActionOnEntities;
    private _messenger: Messenger;
    private _actionEffects: ActionEffects;

    constructor(
            gameArea: GameArea,
            map: Map,
            gameSounds: Array<GameSound>,
            hero: Hero,
            npcs: Npc[],
            items: Item[],
            isNeedToPlayBackgroundSound: boolean,
            collisionDetection: CollisionDetection,
            actionOnEntities: ActionOnEntities,
            messenger: Messenger,
            actionEffects: ActionEffects
        ) {
        this._nonWalkableArea = [];
        this._gameArea = gameArea;
        this._map = map;

        this._crash = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        this._isNonWalkableAreaFilled = false;
        this._isNeedToPlayBackgroundSound = isNeedToPlayBackgroundSound;
        this._gameSounds = gameSounds;
        this._hero = hero;
        this._npcs = npcs;
        this._items = items;
        this._collisionDetection = collisionDetection;
        this._actionOnEntities = actionOnEntities;
        this._messenger = messenger;
        this._actionEffects = actionEffects
        this.startGame();
    }

    private startGame() {
        this.createSounds(this._gameSounds);
        if (this._isNeedToPlayBackgroundSound) {
            this.playBackgroundSound(this._sounds);
        }
        this._then = Date.now();
        this._messenger.firstMsg = texts[11];
        this._messenger.textFrame = -300;
        this._gameArea.start(this.main);
    }

    private createSounds(gameSounds: Array<GameSound>) {
        for (let i = 0; i < gameSounds.length; i++) {
            let newSound: Sound;
            if (gameSounds[i].type === GameSoundType.BackgroundSound) {
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

    private collectNonWalkableArea(array: Item[] | Npc[]) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].getnonWalkableArea()) {
                this._nonWalkableArea.push(array[i].getnonWalkableArea());
            }
        }
    }
    
    private renderItems() {
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].acted === 0 || this._items[i].acted === 1) {
                this._items[i].render(this._gameArea.context);
              if (this._items[i] instanceof Torch) {
                this._items[i].burn();
              }
            }  
        }
    }

    private renderHero() {
        this._hero.render(this._gameArea.context);
    }

    private renderNpcs() {
        for (let i = 0; i < this._npcs.length; i++) {
            this._npcs[i].render(this._gameArea.context);
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
        this._crash = this._collisionDetection.detect(this._nonWalkableArea, this._hero, this._gameArea.canvas);
        this.updateScreen(delta/1000);
        this.renderItems();
        this.renderHero();
        this.renderNpcs();
        this._messenger.renderMsgs(this._gameArea.context);
        this._then = this._now;
        if (this._isGameOver === false) {
          window.requestAnimationFrame(this.main);
        }
    }
    
    private makeItemWalkable(item: Item) {
        for (let i = 0; i < this._nonWalkableArea.length; i++) {
            if (this._nonWalkableArea[i].x === item.x && this._nonWalkableArea[i].y === item.y) {
                this._nonWalkableArea.splice(i, 1);
            }
          }
    }
    
    private updateScreen(modifier: number) {
        const footSound: Sound = find(this._sounds, ['type', GameSoundType.FootSound]);
        if (this._hero.y < 0) {
            this._isGameOver = true;
            this._messenger.firstMsg = texts[14];
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
        if (this._gameArea.key && (this._gameArea.key == 79 || this._gameArea.key == 84 || this._gameArea.key == 66)) {
            const actionResult: ActionResult = this._actionOnEntities.tryActionOnEntity(this._gameArea.key, this._items, this._hero, this._sounds);
            if (actionResult) {
                if (actionResult.item) {
                    this.makeItemWalkable(actionResult.item);
                }
                if (actionResult.msgChange) {
                    this._messenger.textFrame = actionResult.msgChange.timeFrame;
                    this._messenger.firstMsg = actionResult.msgChange.value;
                }
            }
            const afterAction: MessageChange = this._actionEffects.afterAction(this._npcs, this._items);
            if (afterAction) {
                this._messenger.textFrame = afterAction.timeFrame;
                this._messenger.firstMsg = afterAction.value;
            }
        }
        if (this._gameArea.key && this._gameArea.key == 83) {
            const talkResult: ActionResult = this._actionOnEntities.tryTalkToNpc(this._npcs, this._hero);
            if (talkResult) {
                if (talkResult.msgChange) {
                    this._messenger.textFrame = talkResult.msgChange.timeFrame;
                    this._messenger.firstMsg = talkResult.msgChange.value;
                    if (talkResult.msgChange.value2) {
                        this._messenger.secondMsg = talkResult.msgChange.value2;
                    }
                }
                const afterAction: MessageChange = this._actionEffects.afterAction(this._npcs, this._items);
                if (afterAction) {
                    this._messenger.textFrame = afterAction.timeFrame;
                    this._messenger.firstMsg = afterAction.value;
                }
            }
            this._gameArea.key = undefined;
        }
        if (this._gameArea.key && this._gameArea.key == 72) {
            this._messenger.firstMsg = texts[12];
            this._messenger.secondMsg = texts[13];
            this._messenger.textFrame = -600;
        }
        if (this._gameArea.key === undefined) {
            this._hero.sourceX = 16;
            this._hero.sourceY = 0;
        }
    }
}