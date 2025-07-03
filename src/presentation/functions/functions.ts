import { useState, useEffect, useCallback } from "react";
import { GameState } from "../../domain/entity/GameState";
import { CardDeck } from "../../data/CardDeck";
import { DealerLogic } from "../../domain/usecase/DealerLogic";
import { CalculateScore } from "../../domain/usecase/CalculateScore";

const INITIAL_STATE: GameState = {
    CardDeck: [],
    ShuffledCardDeckCount: 0,
    PlayerHand: [],
    DealerHand: [],
    PlayerScore: 0,
    DealerScore: 0,
    GamePhase: '',
    GameMessage: '',
};

export const useBlackJackGame = () => {
    const [GameState, setGameState] = useState<GameState>(INITIAL_STATE);

    // Initialize deck on first load
    useEffect(() => {
        setGameState(prev => ({
            ...prev,
            CardDeck: CardDeck.getShuffledCardDeck(),
            ShuffledCardDeckCount: 1
         }));
    }, []);

    const startGame = useCallback(() => {
        setGameState(currentState => {
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

            return {
                ...INITIAL_STATE, // Reset scores, hands, messages
                CardDeck: deck,
                ShuffledCardDeckCount: shuffleCount,
                PlayerHand: [playerCard1, playerCard2],
                DealerHand: [{ ...dealerCard1, isCardHidden: true }, dealerCard2],
                GamePhase: 'StartGame',
            };
        });
    }, []);

    const hit = useCallback(() => {
        if (GameState.GamePhase !== 'StartGame') return;

        setGameState(prev => {
            const newDeck = [...prev.CardDeck];
            const newCard = newDeck.pop()!;
            const newPlayerHand = [...prev.PlayerHand, newCard];

            return {
                ...prev,
                CardDeck: newDeck,
                PlayerHand: newPlayerHand,
            };
        });
    }, [GameState.GamePhase]);

    const stand = useCallback(() => {
        if (GameState.GamePhase !== 'StartGame') return;

        setGameState(prev => {
            const revealedDealerHand = prev.DealerHand.map(card => ({
                ...card,
                isCardHidden: false
            }));

            const { FinalHand, UpdatedDeck } = DealerLogic(revealedDealerHand, prev.CardDeck);

            return {
                ...prev,
                CardDeck: UpdatedDeck,
                DealerHand: FinalHand,
                GamePhase: 'StopGame',
            };
        });
    }, [GameState.GamePhase]);

    const exit = useCallback(() => {
        setGameState(INITIAL_STATE);
    }, []);

    // Effect to calculate scores whenever hands change
    useEffect(() => {
        const newPlayerScore = CalculateScore(GameState.PlayerHand);
        const newDealerScore = CalculateScore(GameState.DealerHand);
        if (newPlayerScore !== GameState.PlayerScore || newDealerScore !== GameState.DealerScore) {
            setGameState(prev => ({
                ...prev,
                PlayerScore: newPlayerScore,
                DealerScore: newDealerScore
            }));
        }
    }, [GameState.PlayerHand, GameState.DealerHand, GameState.PlayerScore, GameState.DealerScore]);

    // Effect to check for player bust
    useEffect(() => {
        if (GameState.GamePhase !== 'StartGame') return;

        if (GameState.PlayerScore > 21) {
            setGameState(prev => ({
                ...prev,
                GamePhase: 'StopGame',
                GameMessage: 'Bust!'
            }));
        }
    }, [GameState.PlayerScore, GameState.GamePhase]);

    useEffect(() => {
        if (GameState.GamePhase !== 'StopGame' || GameState.GameMessage) return;

        const { PlayerScore, DealerScore } = GameState;

        setGameState(prev => {
            if (DealerScore > 21 || (PlayerScore <= 21 && PlayerScore > DealerScore)) {
                return { ...prev, GameMessage: 'You Win!' };
            }
            if (DealerScore > PlayerScore) {
                return { ...prev, GameMessage: 'Dealer Wins!' };
            }
            if (DealerScore === PlayerScore) {
                 return { ...prev, GameMessage: 'Tie!' };
            }
            return prev;
        });
    }, [GameState.GamePhase, GameState.GameMessage, GameState.PlayerScore, GameState.DealerScore]);

    return { GameState, startGame, hit, stand, exit };
};