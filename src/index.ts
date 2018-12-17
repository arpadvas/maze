import './style.css';
import { Game } from './classes/game';
import { GameArea } from './classes/game-area';
import { Map } from './classes/map';
import CharacterAtlas from '../pics/characters.png';
import { gameSounds } from './constants/sounds';
import { Hero } from './classes/hero';
import { Npc } from './classes/npc';
import { gameItems } from './constants/items';
import { Message } from './classes/message';
import { texts } from './constants/texts';
import { collisionDetection } from './classes/collision-detection';

// start game
const button: HTMLElement = document.querySelector(".button");
const container: HTMLElement = document.querySelector(".container");
const characterAtlas = new Image();
characterAtlas.src = CharacterAtlas;
button.addEventListener("click", () => {
  container.style.display = "none";
  const game: Game = new Game(
    new GameArea(document.createElement("canvas")),
    new Map(),
    gameSounds,
    new Hero(characterAtlas, 16, 0, 16, 16, 0, 112, 16, 16, 0),
    [new Npc(characterAtlas, 64, 0, 16, 16, 272, 160, 16, 16, 0, false)],
    gameItems,
    [
      new Message(texts[0], 130, 15),
      new Message(texts[0], 130, 35)
    ],
    false,
    collisionDetection
  );
});


