export class Sound {

    sound: HTMLAudioElement;

    constructor(src: string, volume: number, loop: boolean) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = volume;
        this.sound.loop = loop;
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