import { Card } from "./Card";

export type GamePhase = 'StartGame' | 'StopGame' | '';
export type GameMessage = 'Tie!' | 'Bust!' | 'You Win!' | 'Dealer Wins!' | '';


export interface GameState{
    CardDeck: Card[];
    ShuffledCardDeckCount: number;
    PlayerHand: Card[];
    DealerHand: Card[];
    PlayerScore: number;
    DealerScore: number;
    GamePhase: GamePhase;
    GameMessage: GameMessage;
}