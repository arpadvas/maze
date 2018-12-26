import { Message } from "./message";
import { texts } from "../constants/texts";

export class Messenger {

    private _textFrame: number;
    private _msgs: Message[] = [];

    constructor(
        msgs: Message[]
    ) {
        this._textFrame = 0;
        this._msgs = msgs;
    }

    get textFrame() {
        return this._textFrame;
    }

    set textFrame(number: number) {
        this._textFrame = number;
    }

    set firstMsg(msg: string) {
        this._msgs[0].text = msg;
    }

    set secondMsg(msg: string) {
        this._msgs[1].text = msg;
    }

    private zero() {
        this._textFrame += 1;
        if (this._textFrame === 300) {
          this._textFrame = 0;
          for (let i = 0; i < this._msgs.length; i += 1) {
            this._msgs[i].text = texts[0];
          }
        }
    }

    public renderMsgs(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this._msgs.length; i++) {
            this._msgs[i].render(ctx);
            this.zero();
        }
    }
}