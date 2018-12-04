import JarbreakSound from '../sounds/jarbreak.wav';
import DoorSound from '../sounds/door.wav';
import ChestSound from '../sounds/chestbig.wav';
import SwitchSound from '../sounds/switch.wav';
import FootSound from '../sounds/foot.wav';
import BackgroundSound from '../sounds/background.mp3';
import CharacterAtlas from '../pics/characters.png';
import OtherAtlas from '../pics/things.png';
import ItemAtlas from '../pics/items.png';
import { Sound } from './interfaces/sound';
import { Hero } from './interfaces/hero';
import { Message } from './interfaces/message';
import { Item } from './interfaces/item';
import { GameArea } from './interfaces/game-area';
import { texts } from './constants/texts';
import { Map } from './interfaces/map';
import { collisionDetection } from './collision';
import { Crash } from './interfaces/crash';
import { spriteTiles } from './constants/tiles';
import { checkIfItemActionable, talkToNpc } from './action';
import { Game } from './interfaces/game';

// game variables
let hero: Hero;
const msgs: Message[] = [];
const sounds: Sound[] = [];
const npcs: Hero[] = [];
const items: Item[] = [];
let then: number;
let isNonWalkableAreaFilled = false;
let now: any;
let isNpcTalked = false;
let crash: Crash = {
    left: false,
    right: false,
    top: false,
    bottom: false
};
let game: Game = new Game(
    [],
    0,
    new GameArea(document.createElement("canvas")),
    new Map()
);

// initialize atlases
const characterAtlas = new Image();
characterAtlas.src = CharacterAtlas;
const otherAtlas = new Image();
otherAtlas.src = OtherAtlas;
const itemAtlas = new Image();
itemAtlas.src = ItemAtlas;

// initialize game
export function startGame() {
    sounds[0] = new Sound(JarbreakSound, 1, false);
    sounds[1] = new Sound(DoorSound, 1, false);
    sounds[2] = new Sound(ChestSound, 1, false);
    sounds[3] = new Sound(SwitchSound, 1, false);
    sounds[4] = new Sound(FootSound, 1, false);
    // sounds[5] = new Sound(BackgroundSound, 1, true);
    // sounds[5].play();
    then = Date.now();
    hero = new Hero(characterAtlas, 16, 0, 16, 16, 0, 112, 16, 16, true, "hero", 0);
    npcs[0] = new Hero(characterAtlas, 64, 0, 16, 16, 272, 160, 16, 16, false, "npc", 0);
    items[0] = new Item(otherAtlas, 0, 0, 16, 16, 64, 304, 16, 16, false, "door", false, 0);
    items[1] = new Item(otherAtlas, 0, 0, 16, 16, 288, 192, 16, 16, false, "door", true, 0);
    items[2] = new Item(otherAtlas, 96, 0, 16, 16, 464, 176, 16, 16, false, "chest", false, 0);
    items[3] = new Item(otherAtlas, 48, 64, 16, 16, 320, 368, 16, 16, false, "switch", false, 0);
    items[4] = new Item(otherAtlas, 144, 0, 16, 16, 48, 272, 16, 16, false, "pot", true, 0);
    items[5] = new Item(otherAtlas, 0, 64, 16, 16, 176, 336, 16, 16, false, "torch", true, 0);
    items[6] = new Item(otherAtlas, 0, 0, 16, 16, 416, 64, 16, 16, false, "door", false, 0);
    items[7] = new Item(otherAtlas, 0, 64, 16, 16, 48, 336, 16, 16, false, "torch", true, 0);
    items[8] = new Item(itemAtlas, 96, 0, 32, 32, 16, 16, 24, 24, true, "item", false, 2);
    items[9] = new Item(itemAtlas, 128, 0, 32, 32, 48, 16, 24, 24, true, "item", false, 2);
    items[10] = new Item(itemAtlas, 192, 32, 32, 32, 80, 16, 24, 24, true, "item", false, 2);
    items[11] = new Item(otherAtlas, 0, 64, 16, 16, 256, 256, 16, 16, false, "torch", true, 0);
    items[12] = new Item(otherAtlas, 0, 64, 16, 16, 304, 256, 16, 16, false, "torch", true, 0);
    items[13] = new Item(otherAtlas, 0, 64, 16, 16, 176, 272, 16, 16, false, "torch", true, 0);
    items[14] = new Item(otherAtlas, 144, 0, 16, 16, 240, 368, 16, 16, false, "pot", true, 0);
    items[15] = new Item(otherAtlas, 144, 0, 16, 16, 240, 432, 16, 16, false, "pot", true, 0);
    items[16] = new Item(otherAtlas, 96, 0, 16, 16, 240, 64, 16, 16, false, "chest", true, 0);
    items[17] = new Item(otherAtlas, 96, 0, 16, 16, 464, 224, 16, 16, false, "chest", false, 0);
    items[18] = new Item(otherAtlas, 48, 64, 16, 16, 336, 160, 16, 16, false, "switch", true, 0);
    msgs[0] = new Message(texts[0], 130, 15);
    msgs[1] = new Message(texts[0], 130, 35);
    msgs[0].text = texts[11];
    game.textFrame = -300;
    game.gameArea.start(main);
  }

function collectNonWalkableArea(array: Item[] | Hero[]) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].nonWalkableArea) {
            game.nonWalkableArea.push(array[i].nonWalkableArea);
        }
    }
}

function renderItems() {
    for (let i = 0; i < items.length; i++) {
        if (items[i].acted === 0 || items[i].acted === 1) {
          items[i].render(game.gameArea.context);
          if (items[i].type === "torch") {
            items[i].burn();
          }
        }  
    }
}

function renderMsgs() {
    for (let i = 0; i < msgs.length; i++) {
        msgs[i].render(game.gameArea.context);
        msgs[i].zero(game, msgs);
    }
}

function makeItemWalkable(item: Item) {
    for (let i = 0; i < game.nonWalkableArea.length; i++) {
        if (game.nonWalkableArea[i].x === item.x && game.nonWalkableArea[i].y === item.y) {
            game.nonWalkableArea.splice(i, 1);
        }
      }
}

function update(modifier: number) {
    if (hero.y < 0) {
        game.isGameOver = true;
        msgs[0].text = texts[14];
    }
    if (game.gameArea.key && game.gameArea.key == 37 && crash.left === false) {
        hero.sourceY = 16;
        hero.sourceX = spriteTiles.coordinatesLeft[spriteTiles.frameLeft];
        hero.x -= hero.speed * modifier;
        spriteTiles.frameLeft = (spriteTiles.frameLeft + 1) % spriteTiles.coordinatesLeft.length;
        sounds[4].play();
    }
    if (game.gameArea.key && game.gameArea.key == 39 && crash.right === false) {
        hero.sourceY = 32;
        hero.sourceX = spriteTiles.coordinatesRight[spriteTiles.frameRight];
        hero.x += hero.speed * modifier;
        spriteTiles.frameRight = (spriteTiles.frameRight + 1) % spriteTiles.coordinatesRight.length;
        sounds[4].play();
    }
    if (game.gameArea.key && game.gameArea.key == 38 && crash.top === false) {
        hero.sourceY = 48;
        hero.sourceX = spriteTiles.coordinatesTop[spriteTiles.frameTop];
        hero.y -= hero.speed * modifier; 
        spriteTiles.frameTop = (spriteTiles.frameTop + 1) % spriteTiles.coordinatesTop.length;
        sounds[4].play();
    }
    if (game.gameArea.key && game.gameArea.key == 40 && crash.bottom === false) {
        hero.sourceY = 0;
        hero.sourceX = spriteTiles.coordinatesBottom[spriteTiles.frameBottom];
        hero.y += hero.speed * modifier; 
        spriteTiles.frameBottom = (spriteTiles.frameBottom + 1) % spriteTiles.coordinatesBottom.length;
        sounds[4].play();
    } 
    if (game.gameArea.key && (game.gameArea.key == 79 || game.gameArea.key == 83 || game.gameArea.key == 75)) {
        checkIfItemActionable(game.gameArea.key, items, hero, msgs, game, sounds, npcs, makeItemWalkable);
    }
    if (game.gameArea.key && game.gameArea.key == 84) {
        if (isNpcTalked === false) {
          talkToNpc(npcs, hero, msgs, game, items);
          isNpcTalked = true;
        }
    }
    if (game.gameArea.key && game.gameArea.key == 72) {
        msgs[0].text = texts[12];
        msgs[1].text = texts[13];
        game.textFrame = -600;
    }
    if (game.gameArea.key === undefined) {
        hero.sourceX = 16;
        hero.sourceY = 0;
        isNpcTalked = false;
    }
}
  
function main() {
    now = Date.now();
    const delta = now - then;
    game.gameArea.clear();
    game.map.tileCreator(0, game.gameArea.context, isNonWalkableAreaFilled);
    game.map.tileCreator(1, game.gameArea.context, isNonWalkableAreaFilled);
    if (!isNonWalkableAreaFilled) {
        game.nonWalkableArea = game.map.nonWalkableArea;
        collectNonWalkableArea(npcs);
        collectNonWalkableArea(items);
    }
    isNonWalkableAreaFilled = true;
    collisionDetection(game.nonWalkableArea, hero, crash, game.gameArea.canvas);
    update(delta/1000);
    renderItems();
    hero.render(game.gameArea.context);
    npcs[0].render(game.gameArea.context);
    renderMsgs();
    then = now;
    if (game.isGameOver === false) {
      window.requestAnimationFrame(main);
    }
}