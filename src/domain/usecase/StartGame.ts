import { GameState } from "../entity/GameState";
import { CardDeck } from "../../data/CardDeck";
import { CalculateScore } from "./CalculateScore";
import { DetermineWinner } from "./DetermineWinner";
import { InitialState } from "./InitialState";

export const StartGame = (currentState: GameState): GameState => {
    let deck = [...currentState.CardDeck];
    let shuffleCount = currentState.ShuffledCardDeckCount;

    // Reshuffle if deck is low
    if (deck.length < 15) {
        deck = CardDeck.getShuffledCardDeck();
        shuffleCount++;
    }

    const playerCard1 = deck.pop()!;
    const dealerCard1 = deck.pop()!;
    const playerCard2 = deck.pop()!;
    const dealerCard2 = deck.pop()!;

    const playerHand = [playerCard1, playerCard2];
    const dealerHand = [{ ...dealerCard1, isCardHidden: true }, dealerCard2];

    const newState = {
        ...InitialState,
        CardDeck: deck,
        ShuffledCardDeckCount: shuffleCount,
        PlayerHand: playerHand,
        DealerHand: dealerHand,
        GamePhase: 'StartGame' as const,
        PlayerScore: CalculateScore(playerHand),
        DealerScore: CalculateScore(dealerHand),
    };

    // Check for initial player Blackjack to end the game immediately
    if (newState.PlayerScore === 21) {
        const revealedDealerHand = dealerHand.map(card => ({...card, isCardHidden: false}));
        const { PlayerScore, DealerScore, GameMessage } = DetermineWinner(playerHand, revealedDealerHand);
        return {
            ...newState,
            DealerHand: revealedDealerHand,
            PlayerScore: PlayerScore,
            DealerScore: DealerScore,
            GameMessage: GameMessage,
            GamePhase: 'StopGame',
        };
    }
    
    return newState;
};