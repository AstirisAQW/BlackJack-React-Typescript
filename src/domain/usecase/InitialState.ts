import { GameState } from "../entity/GameState";


export const InitialState: GameState = {
    CardDeck: [],
    ShuffledCardDeckCount: 0,
    PlayerHand: [],
    DealerHand: [],
    PlayerScore: 0,
    DealerScore: 0,
    GamePhase: '',
    GameMessage: '',
}