import { texts } from "../constants/texts";
import { Game } from "./game";

export class Message {

    text: string;
    x: number;
    y: number;

    constructor(text: string, x: number, y: number) {
        this.text = text;
        this.x = x;
        this.y = y;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.font = "10px Merienda"
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
    }
}