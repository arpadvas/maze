import { Npc } from "./npc";
import { Item } from "./item";
import { MessageChange } from "../interfaces/action-result";
import { texts } from "../constants/texts";

export class ActionEffects {

    private _stepOne: boolean = true;
    private _stepTwo: boolean = true;
    private _stepThree: boolean = true;
    private _stepFour: boolean = true;
    private _stepFive: boolean = true;

    public afterAction(npcs: Npc[], items: Item[]): MessageChange {
        if (npcs[0].acted === 1 && this._stepOne) {
            this._stepOne = false;
            items[3].locked = false;
            items[10].acted = 1;
        }
        if (items[3].acted === 1 && this._stepTwo) {
            this._stepTwo = false;
            items[0].locked = false;
            items[10].acted = 2;
        }
        if (items[4].acted === 1 && this._stepThree) {
            this._stepThree = false;
            items[2].locked = false;
            items[8].acted = 1;
            return {
                timeFrame: 0,
                value: texts[4]
            }
        }
        if (items[2].acted === 1 && this._stepFour) {
            this._stepFour = false;
            items[6].locked = false;
            items[8].acted = 2;
            items[9].acted = 1;
            return {
                timeFrame: 0,
                value: texts[5]
            }
        }
        if (items[6].acted === 1 && this._stepFive) {
            this._stepFive = false;
            items[9].acted = 2;
        }
        return null;
    }
}

export const actionEffects = new ActionEffects();