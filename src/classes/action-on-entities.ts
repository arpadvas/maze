import { Npc } from "./npc";
import { Hero } from "./hero";
import { Message } from "./message";
import { Game } from "./game";
import { Item } from "./item";
import { texts } from "../constants/texts";
import { Sound } from "./sound";
import { Toggle } from "./toggle";
import { GameSoundType } from "../constants/sounds";
import { find } from 'lodash';
import { Door } from "./door";
import { Chest } from "./chest";
import { Pot } from "./pot";

export class ActionOnEntities {

    public tryActionOnEntity(key: number, items: Item[], hero: Hero, msgs: Message[], game: Game, sounds: Sound[], npcs: Npc[]): Item {
        for (let i = 0; i < items.length; i++) {
            if (key === 79) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Door) {
                    if (items[i].canBeActioned) {
                        const doorActionResult: boolean = this.performDoorAction(items[i], sounds, game, msgs, items, npcs);
                        if (doorActionResult) {
                            return items[i];
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Chest) {
                    if (items[i].canBeActioned) {
                        this.performChestAction(items[i], sounds, game, msgs, items, npcs);
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Chest) && !(items[i] instanceof Door)) {
                    msgs[0].text = texts[1];
                    game.textFrame = 0;
                }
            } else if (key === 84) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Toggle) {
                    if (items[i].canBeActioned) {
                        this.performToggleAction(items[i], sounds, game, msgs, items, npcs);
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Toggle)) {
                    msgs[0].text = texts[2];
                    game.textFrame = 0;
                }
            } else if (key === 66) {
                if (this.checkIfItemClose(items[i], hero) && items[i] instanceof Pot) {
                    if (items[i].canBeActioned) {
                        const potActionResult: boolean = this.performPotAction(items[i], sounds, game, msgs, items, npcs);
                        if (potActionResult) {
                            return items[i];
                        }
                    }
                } else if (this.checkIfItemClose(items[i], hero) && !(items[i] instanceof Pot)) {
                    msgs[0].text = texts[3];
                    game.textFrame = 0;
                }
            }
        }
        return null;
    }

    private performPotAction(item: Item, sounds: Sound[], game: Game, msgs: Message[], items: Item[], npcs: Npc[]): boolean {
        if (!item.locked) {
            if (item.acted === 0) {
                const jarbreakSound: Sound = find(sounds, ['type', GameSoundType.JarbreakSound]);
                if (jarbreakSound) {
                    jarbreakSound.play();
                }
                item.break();
                return true;
            }
        } else {
            msgs[0].text = texts[9];
            game.textFrame = 0;
        }
        return false;
    }

    private performChestAction(item: Item, sounds: Sound[], game: Game, msgs: Message[], items: Item[], npcs: Npc[]): boolean {
        if (!item.locked) {
            if (item.acted === 0) {
                const chestSound: Sound = find(sounds, ['type', GameSoundType.ChestSound]);
                if (chestSound) {
                    chestSound.play();
                }
                item.open();
                return true;
            }
        } else {
            msgs[0].text = texts[9];
            game.textFrame = 0;
        }
        return false;
    }

    private performDoorAction(item: Item, sounds: Sound[], game: Game, msgs: Message[], items: Item[], npcs: Npc[]): boolean {
        if (!item.locked) {
            if (item.acted === 0) {
                const doorSound: Sound = find(sounds, ['type', GameSoundType.DoorSound]);
                if (doorSound) {
                    doorSound.play();
                }
                item.open();
                return true;
            }
        } else {
            msgs[0].text = texts[9];
            game.textFrame = 0;
        }
        return false;
    }

    private performToggleAction(item: Item, sounds: Sound[], game: Game, msgs: Message[], items: Item[], npcs: Npc[]): boolean {
        if (!item.locked) {
            if (item.acted === 0) {
                const toggleSound: Sound = find(sounds, ['type', GameSoundType.SwitchSound]);
                if (toggleSound) {
                    toggleSound.play();
                }
                item.toggle();
                return true;
            }
        } else {
            msgs[0].text = texts[10];
            game.textFrame = 0;
        }
        return false;
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

    public tryTalkToNpc(npcs: Npc[], hero: Hero, msgs: Message[], game: Game, items: Item[]): any {
        for (let i = 0; i < npcs.length; i++) {
            if (this.checkIfItemClose(npcs[i], hero) && npcs[i].acted === 0) {
                npcs[i].acted = 1;
                //   afterActon(npcs, items, msgs, game);
                msgs[0].text = texts[6];
                msgs[1].text = texts[7];
                game.textFrame = -600;
            } else if (this.checkIfItemClose(npcs[i], hero) && npcs[i].acted === 1) {
                msgs[0].text = texts[15];
                game.textFrame = 0;
            }
        }
    }

}

export const actionOnEntities = new ActionOnEntities();