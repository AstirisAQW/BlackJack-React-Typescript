import { useState, useEffect, useCallback } from "react";
import { GameState } from "../../domain/entity/GameState";
import { InitialState } from "../../domain/usecase/InitialState";
import { ShuffleDeck } from "../../domain/usecase/ShuffleDeck";
import { StartGame as startGameLogic } from "../../domain/usecase/StartGame";
import { Hit as hitLogic } from "../../domain/usecase/Hit";
import { Stand as standLogic } from "../../domain/usecase/Stand";

export const useBlackJackGame = () => {
    const [gameState, setGameState] = useState<GameState>(InitialState);

    // Initial shuffle on component mount
    useEffect(() => {
        setGameState(ShuffleDeck());
    }, []);

    const startGame = useCallback(() => {
        setGameState(currentState => startGameLogic(currentState));
    }, []);

    const hit = useCallback(() => {
        setGameState(currentState => hitLogic(currentState));
    }, []);

    const stand = useCallback(() => {
        setGameState(currentState => standLogic(currentState));
    }, []);

    const exit = useCallback(() => {
        // Reset to a fresh shuffled state, ready for a new game
        setGameState(ShuffleDeck());
    }, []);

    return { GameState: gameState, startGame, hit, stand, exit };
};