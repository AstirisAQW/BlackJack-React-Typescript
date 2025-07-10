import { GameMessage } from "../entity/GameState";
import { Card } from "../entity/Card";
import { CalculateScore } from "./CalculateScore";

interface Result {
    PlayerScore: number;
    DealerScore: number;
    GameMessage: GameMessage;
}

export function CheckPlayerBust(playerHand: Card[]): boolean {
    const score = CalculateScore(playerHand);
    return score > 21;
}

export function DetermineWinner(playerHand: Card[], dealerHand: Card[]): Result {
    const PlayerScore = CalculateScore(playerHand);
    const DealerScore = CalculateScore(dealerHand);

    let GameMessage: GameMessage = '';

    if (PlayerScore > 21) {
        GameMessage = 'Bust!';
    } else if (DealerScore > 21) {
        GameMessage = 'You Win!';
    } else if (PlayerScore > DealerScore) {
        GameMessage = 'You Win!';
    } else if (DealerScore > PlayerScore) {
        GameMessage = 'Dealer Wins!';
    } else {
        GameMessage = 'Tie!';
    }

    return { PlayerScore, DealerScore, GameMessage };
}
