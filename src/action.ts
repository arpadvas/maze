import { Item } from "./interfaces/item";
import { Hero } from "./interfaces/hero";
import { texts } from "./constants/texts";
import { Message } from "./interfaces/message";
import { Sound } from "./interfaces/sound";
import { NonWalkableArea } from "./interfaces/non-walkable-area";
import { Game } from "./interfaces/game";

export function checkIfItemActionable(key: number, items: Item[], hero: Hero, msgs: Message[], game: Game, sounds: Sound[], npcs: Hero[], callback: Function) {
    for (let i = 0; i < items.length; i++) {
        if (checkIfItemClose(items[i], hero) && (items[i].type === "door" || items[i].type === "chest") && key === 79) {
            items[i].opened = true;
            performAction(items[i], sounds, game, msgs, items, npcs, callback);
            break;
        } 
        else if (checkIfItemClose(items[i], hero) && key === 79 && (items[i].type !== "door" || items[i].type !== "chest")) {
            msgs[0].text = texts[1];
            game.textFrame = 0;
        }
        if (checkIfItemClose(items[i], hero) && items[i].type === "switch" && key === 83) {
            items[i].switched = true;
            performAction(items[i], sounds, game, msgs, items, npcs, callback);
            break;
        }
        else if (checkIfItemClose(items[i], hero) && items[i].type != "switch" && key === 83) {
            msgs[0].text = texts[2];
            game.textFrame = 0;
        }
        if (checkIfItemClose(items[i], hero) && items[i].type === "pot" && key === 75) {
            items[i].broken = true;
            performAction(items[i], sounds, game, msgs, items, npcs, callback);
            break;
        }
        else if (checkIfItemClose(items[i], hero) && items[i].type != "pot" && key === 75) {
            msgs[0].text = texts[3];
            game.textFrame = 0;
        }
    } 
}

function checkIfItemClose(item: Item | Hero, hero: Hero) {
    var left = hero.x;
    var right = hero.x + (hero.width);
    var top = hero.y;
    var bottom = hero.y + (hero.height);
    var itemleft = item.x;
    var itemright = item.x + (item.width);
    var itemtop = item.y;
    var itembottom = item.y + (item.height);
    if ((top >= itembottom-3 && right < itemright+10 && left > itemleft-10 && bottom < itembottom+25) ||
        (right < itemright+10 && left > itemleft-10 && bottom <= itemtop+3 && top > itemtop-25 ) || 
        (top > itemtop-10 && bottom < itembottom+10 && left >= itemright-3 && right < itemright+25) ||
        (top > itemtop-10 && bottom < itembottom+10 && right <= itemleft+3 && left > itemleft-25)) {
        return true;   
    }
    return false;
}

function performAction(item: Item, sounds: Sound[], game: Game, msgs: Message[], items: Item[], npcs: Hero[], callback: Function) {
    if (item.opened === true && (item.type === "door" || item.type === "chest")) {
        if (item.doable === true) {
            item.open();
            item.acter();
            afterActon(npcs, items, msgs, game);
            if (item.type === "door") {
                sounds[1].play();
            }
            if (item.type === "chest") {
                sounds[2].play();
            }
            if (item.type === "door") {
                callback(item);
            }
            // break;
        } else {
            item.opened = false;
            msgs[0].text = texts[9];
            game.textFrame = 0;
        }
    }
    if (item.type === "switch" && item.switched === true) {
        if (item.doable === true) {
            sounds[3].play();
            item.switch();
            item.acter();
            afterActon(npcs, items, msgs, game);
        } else {
            item.switched = false;
            msgs[0].text = texts[10];
            game.textFrame = 0;
        }
    }
    if (item.type === "pot" && item.broken === true) {
        sounds[0].play();
        item.kick();
        item.acter();
        afterActon(npcs, items, msgs, game);
        callback(item);
        // break;
    }

}
  
var stepOne = true;
var stepTwo = true;
var stepThree = true;
var stepFour = true;
var stepFive = true;

function afterActon(npcs: Hero[], items: Item[], msgs: Message[], game: Game) {
    if (npcs[0].acted === 1 && stepOne) {
      stepOne = false;
      items[3].doable = true;
      items[10].acted = 1;
      msgs[0].text = texts[6];
      msgs[1].text = texts[7];
      game.textFrame = -600;
    }
    if (items[3].acted === 1 && stepTwo) {
      stepTwo = false;
      items[0].doable = true;
      items[10].acted = 2;
    }
    if (items[4].acted === 1 && stepThree) {
      stepThree = false;
      items[2].doable = true;
      items[8].acted = 1;
      msgs[0].text = texts[4];
      game.textFrame = 0;
    }
    if (items[2].acted === 1 && stepFour) {
      stepFour = false;
      items[6].doable = true;
      items[8].acted = 2;
      items[9].acted = 1;
      msgs[0].text = texts[5];
      game.textFrame = 0;
    }
    if (items[6].acted === 1 && stepFive) {
      stepFive = false;
      items[9].acted = 2;
    }
}
  
export function talkToNpc(npcs: Hero[], hero: Hero, msgs: Message[], game: Game, items: Item[]) {
    for (let i = 0; i < npcs.length; i++) {
        if (checkIfItemClose(npcs[i], hero) && npcs[i].type === "npc" && npcs[i].acted === 0) {
          npcs[i].acter();
          afterActon(npcs, items, msgs, game);
          msgs[0].text = texts[6];
          msgs[1].text = texts[7];
          game.textFrame = -600;
        }
        else if (checkIfItemClose(npcs[i], hero) && npcs[i].type === "npc" && npcs[i].acted === 1) {
          msgs[0].text = texts[15];
          game.textFrame = 0;
        }
      }
}
  