import { Card } from "./CardEntity";

export interface GameState{
    deck: Card[];
    PlayerHand: Card[];
    DealerHand: Card[];
    PlayerScore: number;
    DealerScore: number;
}