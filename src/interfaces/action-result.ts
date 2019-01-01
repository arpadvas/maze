import { Item } from "../classes/item";
import { Npc } from "../classes/npc";

export interface MessageChange {
    timeFrame: number;
    value: string;
    value2?: string
}

export interface ActionResult {
    item?: Item;
    npc?: Npc;
    msgChange: MessageChange
}