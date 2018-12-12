import './style.css';
import { Game } from './interfaces/game';
import { GameArea } from './interfaces/game-area';
import { Map } from './interfaces/map';
import CharacterAtlas from '../pics/characters.png';
import OtherAtlas from '../pics/things.png';
import ItemAtlas from '../pics/items.png';
import { gameSounds } from './constants/sounds';

// start game
const button: HTMLElement = document.querySelector(".button");
const container: HTMLElement = document.querySelector(".container");
button.addEventListener("click", () => {
  container.style.display = "none";
  const game: Game = new Game(
    new GameArea(document.createElement("canvas")),
    new Map(),
    CharacterAtlas,
    OtherAtlas,
    ItemAtlas,
    gameSounds
  );
});


