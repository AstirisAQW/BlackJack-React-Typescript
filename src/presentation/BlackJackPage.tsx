import React from "react";
import { useBlackJackGame } from "./functions/functions";
import { Hand } from "./components/Hand";
import { Controls } from "./components/Controls";
import { Result } from "./components/Result";
import "../App.css"

export function BlackJackPage() {
const { GameState, startGame, hit, stand, exit } = useBlackJackGame();
const isGameActive = GameState.GamePhase === 'StartGame';
const isGameOver = GameState.GamePhase === 'StopGame' && GameState.GameMessage !== '';
return (
    <div className="blackjack-page">
        
        <Result message={GameState.GameMessage} />
        
        <div className="game-board">
            <Hand 
                title="Dealer's Hand" 
                hand={GameState.DealerHand} 
                score={GameState.DealerScore} 
            />
            
            <hr className="divider" />
            
            <Hand 
                title="Player's Hand" 
                hand={GameState.PlayerHand} 
                score={GameState.PlayerScore} 
            />
        </div>

        <Controls
            isGameActive={isGameActive}
            isGameOver={isGameOver}
            onStart={startGame}
            onHit={hit}
            onStand={stand}
            onExit={exit}
        />
    </div>
);
}