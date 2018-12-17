import { GameSoundType } from "../constants/sounds";

export class Sound {

    private _sound: HTMLAudioElement;
    public type: GameSoundType;

    constructor(src: string, volume: number, loop: boolean, type: GameSoundType) {
        this._sound = document.createElement("audio");
        this._sound.src = src;
        this._sound.volume = volume;
        this._sound.loop = loop;
        this.type = type;
        this._sound.setAttribute("preload", "auto");
        this._sound.setAttribute("controls", "none");
        this._sound.style.display = "none";
        document.body.appendChild(this._sound);
    }

    play() {
        this._sound.play();
    }
    stop() {
        this._sound.pause();
    }    
}