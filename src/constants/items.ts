import OtherAtlas from '../../pics/things.png';
import ItemAtlas from '../../pics/items.png';
import { Torch } from '../classes/torch';
import { Toggle } from '../classes/toggle';
import { Door } from '../classes/door';
import { Chest } from '../classes/chest';
import { Pot } from '../classes/pot';
import { InventoryItem } from '../classes/inventory-item';

const otherAtlas = new Image();
otherAtlas.src = OtherAtlas;

const itemAtlas = new Image();
itemAtlas.src = ItemAtlas;

export const gameItems = [
    new Door(otherAtlas, 0, 0, 16, 16, 64, 304, 16, 16, false, true, true, 0),
    new Door(otherAtlas, 0, 0, 16, 16, 288, 192, 16, 16, false, true, false, 0),
    new Chest(otherAtlas, 96, 0, 16, 16, 464, 176, 16, 16, false, true, true, 0),
    new Toggle(otherAtlas, 48, 64, 16, 16, 320, 368, 16, 16, false, true, true, 0),
    new Pot(otherAtlas, 144, 0, 16, 16, 48, 272, 16, 16, false, true, false, 0),
    new Torch(otherAtlas, 0, 64, 16, 16, 176, 336, 16, 16, false, false, true, 1),
    new Door(otherAtlas, 0, 0, 16, 16, 416, 64, 16, 16, false, true, true, 0),
    new Torch(otherAtlas, 0, 64, 16, 16, 48, 336, 16, 16, false, false, true, 1),
    new InventoryItem(itemAtlas, 96, 0, 32, 32, 16, 16, 24, 24, false, false, true, 2),
    new InventoryItem(itemAtlas, 128, 0, 32, 32, 48, 16, 24, 24, false, false, true, 2),
    new InventoryItem(itemAtlas, 192, 32, 32, 32, 80, 16, 24, 24, false, false, true, 2),
    new Torch(otherAtlas, 0, 64, 16, 16, 256, 256, 16, 16, false, false, true, 1),
    new Torch(otherAtlas, 0, 64, 16, 16, 304, 256, 16, 16, false, false, true, 1),
    new Torch(otherAtlas, 0, 64, 16, 16, 176, 272, 16, 16, false, false, true, 1),
    new Pot(otherAtlas, 144, 0, 16, 16, 240, 368, 16, 16, false, true, false, 0),
    new Pot(otherAtlas, 144, 0, 16, 16, 240, 432, 16, 16, false, true, false, 0),
    new Chest(otherAtlas, 96, 0, 16, 16, 240, 64, 16, 16, false, true, false, 0),
    new Chest(otherAtlas, 96, 0, 16, 16, 464, 224, 16, 16, false, true, true, 0),
    new Toggle(otherAtlas, 48, 64, 16, 16, 336, 160, 16, 16, false, true, false, 0)
];