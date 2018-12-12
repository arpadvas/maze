import { GameSoundType } from "../constants/sounds";

export class Sound {

    sound: HTMLAudioElement;
    type: GameSoundType;

    constructor(src: string, volume: number, loop: boolean, type: GameSoundType) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = volume;
        this.sound.loop = loop;
        this.type = type;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }    
}