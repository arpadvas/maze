import { Item } from "../classes/item";

export interface MessegeChange {
    timeFrame: number;
    value: string;
    value2?: string
}

export interface ActionResult {
    item: Item;
    msgChange: MessegeChange
}