import { GameState } from "../entity/GameState";
import { CalculateScore } from "./CalculateScore";

export const Hit = (CurrentState: GameState): GameState => {
    // Cannot hit if game is not active
    if (CurrentState.GamePhase !== 'StartGame') return CurrentState;

    const Deck = [...CurrentState.CardDeck];
    const Card = Deck.pop()!;
    const PlayerHand = [...CurrentState.PlayerHand, Card];
    const PlayerScore = CalculateScore(PlayerHand);

    // Player busts
    if (PlayerScore > 21) {
        const ShowDealerHand = CurrentState.DealerHand.map(card => ({...card, isCardHidden: false}));
        const DealerScore = CalculateScore(ShowDealerHand);
        return {
            ...CurrentState,
            CardDeck: Deck,
            PlayerHand: PlayerHand,
            DealerHand: ShowDealerHand,
            PlayerScore: PlayerScore,
            DealerScore: DealerScore,
            GamePhase: 'StopGame',
            GameMessage: 'Bust!',
        };
    }

    // Continue game
    return {
        ...CurrentState,
        CardDeck: Deck,
        PlayerHand: PlayerHand,
        PlayerScore: PlayerScore,
    };
};