import { Npc } from "./npc";
import { Hero } from "./hero";
import { Item } from "./item";
import { texts } from "../constants/texts";
import { Sound } from "./sound";
import { Toggle } from "./toggle";
import { GameSoundType } from "../constants/sounds";
import { find } from 'lodash';
import { Door } from "./door";
import { Chest } from "./chest";
import { Pot } from "./pot";
import { ActionResult, MessegeChange } from "../interfaces/action-result";

export class ActionOnEntities {

    public tryActionOnEntity(key: number, items: Item[], hero: Hero, sounds: Sound[]): ActionResult {
        for (let i = 0; i < items.length; i++) {
            if (key === 79) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Door) {
                    if (items[i].canBeActioned) {
                        const doorActionResult: [boolean, MessegeChange] = this.performDoorAction(items[i], sounds);
                        if (doorActionResult) {
                            if (doorActionResult[0]) {
                                return {
                                    item: items[i],
                                    msgChange: null
                                }
                            } else if (doorActionResult[1]) {
                                return {
                                    item: null,
                                    msgChange: doorActionResult[1]
                                }
                            }
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Chest) {
                    if (items[i].canBeActioned) {
                        const chestActionResult: [boolean, MessegeChange] = this.performChestAction(items[i], sounds);
                        if (chestActionResult) {
                            if (chestActionResult[1]) {
                                return {
                                    item: null,
                                    msgChange: chestActionResult[1]
                                }
                            }
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Chest) && !(items[i] instanceof Door)) {
                    return {
                        item: null,
                        msgChange: {
                            timeFrame: 0,
                            value: texts[1]
                        }
                    }
                }
            } else if (key === 84) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Toggle) {
                    if (items[i].canBeActioned) {
                        const toggleActionResult: [boolean, MessegeChange] = this.performToggleAction(items[i], sounds);
                        if (toggleActionResult) {
                            if (toggleActionResult[1]) {
                                return {
                                    item: null,
                                    msgChange: toggleActionResult[1]
                                }
                            }
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Toggle)) {
                    return {
                        item: null,
                        msgChange: {
                            timeFrame: 0,
                            value: texts[2]
                        }
                    }
                }
            } else if (key === 66) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Pot) {
                    if (items[i].canBeActioned) {
                        const potActionResult: [boolean, MessegeChange] = this.performPotAction(items[i], sounds);
                        if (potActionResult) {
                            if (potActionResult[0]) {
                                return {
                                    item: items[i],
                                    msgChange: null
                                }
                            } else if (potActionResult[1]) {
                                return {
                                    item: null,
                                    msgChange: potActionResult[1]
                                }
                            }
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Pot)) {
                    return {
                        item: null,
                        msgChange: {
                            timeFrame: 0,
                            value: texts[3]
                        }
                    }
                }
            }
        }
        return null;
    }

    private performPotAction(item: Item, sounds: Sound[]): [boolean, MessegeChange] {
        if (!item.locked) {
            if (item.acted === 0) {
                const jarbreakSound: Sound = find(sounds, ['type', GameSoundType.JarbreakSound]);
                if (jarbreakSound) {
                    jarbreakSound.play();
                }
                item.break();
                return [true, null];
            }
        } else {
            return [
                false,
                {
                    timeFrame: 0,
                    value: texts[9]
                }
            ]
        }
    }

    private performChestAction(item: Item, sounds: Sound[]): [boolean, MessegeChange] {
        if (!item.locked) {
            if (item.acted === 0) {
                const chestSound: Sound = find(sounds, ['type', GameSoundType.ChestSound]);
                if (chestSound) {
                    chestSound.play();
                }
                item.open();
            }
        } else {
            return [
                false,
                {
                    timeFrame: 0,
                    value: texts[9]
                }
            ]
        }
        return [false, null];
    }

    private performDoorAction(item: Item, sounds: Sound[]): [boolean, MessegeChange] {
        if (!item.locked) {
            if (item.acted === 0) {
                const doorSound: Sound = find(sounds, ['type', GameSoundType.DoorSound]);
                if (doorSound) {
                    doorSound.play();
                }
                item.open();
                return [true, null];
            }
        } else {
            return [
                false,
                {
                    timeFrame: 0,
                    value: texts[9]
                }
            ]
        }
    }

    private performToggleAction(item: Item, sounds: Sound[]): [boolean, MessegeChange] {
        if (!item.locked) {
            if (item.acted === 0) {
                const toggleSound: Sound = find(sounds, ['type', GameSoundType.SwitchSound]);
                if (toggleSound) {
                    toggleSound.play();
                }
                item.toggle();
            }
        } else {
            return [
                false,
                {
                    timeFrame: 0,
                    value: texts[10]
                }
            ]
        }
        return [false, null];
    }

    private checkIfItemClose(item: Item | Npc, hero: Hero) {
        const left = hero.x;
        const right = hero.x + (hero.width);
        const top = hero.y;
        const bottom = hero.y + (hero.height);
        const itemleft = item.x;
        const itemright = item.x + (item.width);
        const itemtop = item.y;
        const itembottom = item.y + (item.height);
        if ((top >= itembottom-3 && right < itemright+10 && left > itemleft-10 && bottom < itembottom+25) ||
            (right < itemright+10 && left > itemleft-10 && bottom <= itemtop+3 && top > itemtop-25 ) || 
            (top > itemtop-10 && bottom < itembottom+10 && left >= itemright-3 && right < itemright+25) ||
            (top > itemtop-10 && bottom < itembottom+10 && right <= itemleft+3 && left > itemleft-25)) {
            return true;   
        }
        return false;
    }

    public tryTalkToNpc(npcs: Npc[], hero: Hero): ActionResult {
        for (let i = 0; i < npcs.length; i++) {
            if (this.checkIfItemClose(npcs[i], hero) && npcs[i].acted === 0) {
                npcs[i].acted = 1;
                return {
                    item: null,
                    msgChange: {
                        timeFrame: -600,
                        value: texts[6],
                        value2: texts[7]
                    }
                }
            } else if (this.checkIfItemClose(npcs[i], hero) && npcs[i].acted === 1) {
                return {
                    item: null,
                    msgChange: {
                        timeFrame: 0,
                        value: texts[15]
                    }
                }
            }
        }
    }

}

export const actionOnEntities = new ActionOnEntities();