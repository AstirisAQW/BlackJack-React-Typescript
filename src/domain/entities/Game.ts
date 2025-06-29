import { HandCard } from './Card';

export type GamePhase = 'betting' | 'playing' | 'gameOver';
export type Message = 'Place a Bet!' | 'Hit or Stand?' | 'Bust!' | 'You Win!' | 'Dealer Wins!' | 'Tie!';

export interface GameState {
  deck: HandCard[];
  playerHand: HandCard[];
  dealerHand: HandCard[];
  playerScore: number;
  dealerScore: number;
  balance: number;
  currentBet: number;
  phase: GamePhase;
  message: Message;
}