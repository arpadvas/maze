import './style.css';
import { startGame } from './game';

// start game
const button: HTMLElement = document.querySelector(".button");
const container: HTMLElement = document.querySelector(".container");
button.addEventListener("click", function() {
  container.style.display = "none";
  startGame();
});


