import { Item } from '../classes/item';
import OtherAtlas from '../../pics/things.png';
import ItemAtlas from '../../pics/items.png';

const otherAtlas = new Image();
otherAtlas.src = OtherAtlas;

const itemAtlas = new Image();
itemAtlas.src = ItemAtlas;

export const gameItems = [
    new Item(otherAtlas, 0, 0, 16, 16, 64, 304, 16, 16, false, "door", false, 0),
    new Item(otherAtlas, 0, 0, 16, 16, 288, 192, 16, 16, false, "door", true, 0),
    new Item(otherAtlas, 96, 0, 16, 16, 464, 176, 16, 16, false, "chest", false, 0),
    new Item(otherAtlas, 48, 64, 16, 16, 320, 368, 16, 16, false, "switch", false, 0),
    new Item(otherAtlas, 144, 0, 16, 16, 48, 272, 16, 16, false, "pot", true, 0),
    new Item(otherAtlas, 0, 64, 16, 16, 176, 336, 16, 16, false, "torch", true, 0),
    new Item(otherAtlas, 0, 0, 16, 16, 416, 64, 16, 16, false, "door", false, 0),
    new Item(otherAtlas, 0, 64, 16, 16, 48, 336, 16, 16, false, "torch", true, 0),
    new Item(itemAtlas, 96, 0, 32, 32, 16, 16, 24, 24, true, "item", false, 2),
    new Item(itemAtlas, 128, 0, 32, 32, 48, 16, 24, 24, true, "item", false, 2),
    new Item(itemAtlas, 192, 32, 32, 32, 80, 16, 24, 24, true, "item", false, 2),
    new Item(otherAtlas, 0, 64, 16, 16, 256, 256, 16, 16, false, "torch", true, 0),
    new Item(otherAtlas, 0, 64, 16, 16, 304, 256, 16, 16, false, "torch", true, 0),
    new Item(otherAtlas, 0, 64, 16, 16, 176, 272, 16, 16, false, "torch", true, 0),
    new Item(otherAtlas, 144, 0, 16, 16, 240, 368, 16, 16, false, "pot", true, 0),
    new Item(otherAtlas, 144, 0, 16, 16, 240, 432, 16, 16, false, "pot", true, 0),
    new Item(otherAtlas, 96, 0, 16, 16, 240, 64, 16, 16, false, "chest", true, 0),
    new Item(otherAtlas, 96, 0, 16, 16, 464, 224, 16, 16, false, "chest", false, 0),
    new Item(otherAtlas, 48, 64, 16, 16, 336, 160, 16, 16, false, "switch", true, 0)
];