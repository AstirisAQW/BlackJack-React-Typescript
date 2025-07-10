import { GameState } from "../entity/GameState";
import { DealerDrawCards } from "./DealerDrawCards";
import { DetermineWinner } from "./DetermineWinner";

export const Stand = (currentState: GameState): GameState => {
    // Cannot stand if game is not active
    if (currentState.GamePhase !== 'StartGame') return currentState;

    // Reveal dealer's hand and let them play
    const revealedDealerHand = currentState.DealerHand.map(card => ({
        ...card,
        isCardHidden: false
    }));

    const { FinalHand: finalDealerHand, UpdatedDeck } = DealerDrawCards(revealedDealerHand, currentState.CardDeck);

    // Determine the result
    const { PlayerScore, DealerScore, GameMessage } = DetermineWinner(currentState.PlayerHand, finalDealerHand);

    return {
        ...currentState,
        CardDeck: UpdatedDeck,
        DealerHand: finalDealerHand,
        PlayerScore: PlayerScore,
        DealerScore: DealerScore,
        GamePhase: 'StopGame',
        GameMessage: GameMessage,
    };
};