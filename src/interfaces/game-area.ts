export class GameArea {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    key: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    start(main: FrameRequestCallback) {
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.context = this.canvas.getContext("2d");
        //this.context.mozImageSmoothingEnabled = false;
        //this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.requestAnimationFrame(main);
        window.addEventListener('keydown', (e) => {
            this.key = e.keyCode;
        })
        window.addEventListener('keyup', (e) => {
            this.key = undefined;
        })
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}