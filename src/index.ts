import './style.css';
import { Game } from './interfaces/game';
import { GameArea } from './interfaces/game-area';
import { Map } from './interfaces/map';
import CharacterAtlas from '../pics/characters.png';
import { gameSounds } from './constants/sounds';
import { Hero } from './interfaces/hero';
import { gameItems } from './constants/items';
import { Message } from './interfaces/message';
import { texts } from './constants/texts';
import { collisionDetection } from './collision';

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
    new Hero(characterAtlas, 16, 0, 16, 16, 0, 112, 16, 16, 0, "hero", true),
    [new Hero(characterAtlas, 64, 0, 16, 16, 272, 160, 16, 16, 0, "npc", false)],
    gameItems,
    [
      new Message(texts[0], 130, 15),
      new Message(texts[0], 130, 35)
    ],
    collisionDetection
  );
});


