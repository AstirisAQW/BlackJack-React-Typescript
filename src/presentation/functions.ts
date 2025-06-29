import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../domain/entities/Game';
import { deckRepository } from '../data/deckRepository';
import {DealerLogic} from '../domain/usecases/DealerLogic';
import {calculateScore} from '../domain/usecases/calculateScore';

const INITIAL_STATE: GameState = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  balance: 100,
  currentBet: 0,
  phase: 'betting',
  message: 'Place a Bet!',
};

export const useBlackjackGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  // Initialize deck on first load
  useEffect(() => {
    setGameState(prev => ({ ...prev, deck: deckRepository.getNewDeck() }));
  }, []);

  const resetHand = useCallback(() => {
    let currentDeck = gameState.deck;
    // Reshuffle if deck is low
    if (currentDeck.length < 15) {
      currentDeck = deckRepository.getNewDeck();
    }
    setGameState(prev => ({
      ...prev,
      deck: currentDeck,
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      phase: 'betting',
      message: 'Place a Bet!',
    }));
  }, [gameState.deck]);

  const placeBet = (amount: number) => {
    if (amount > gameState.balance) return;

    const deck = [...gameState.deck];
    const playerHand = [deck.pop()!, deck.pop()!];
    const dealerHand = [deck.pop()!, { ...deck.pop()!, hidden: true }];

    setGameState(prev => ({
      ...prev,
      deck,
      playerHand,
      dealerHand,
      balance: prev.balance - amount,
      currentBet: amount,
      phase: 'playing',
      message: 'Hit or Stand?',
    }));
  };

  const hit = () => {
    if (gameState.phase !== 'playing') return;

    const deck = [...gameState.deck];
    const playerHand = [...gameState.playerHand, deck.pop()!];

    setGameState(prev => ({
      ...prev,
      deck,
      playerHand,
    }));
  };

  const stand = () => {
    if (gameState.phase !== 'playing') return;

    // Reveal dealer's hidden card
    const revealedDealerHand = gameState.dealerHand.map(card => ({ ...card, hidden: false }));
    
    // Get final dealer hand using the use case
    const { finalHand, updatedDeck } = DealerLogic(revealedDealerHand, gameState.deck);

    setGameState(prev => ({
      ...prev,
      deck: updatedDeck,
      dealerHand: finalHand,
      phase: 'gameOver',
    }));
  };

  // Effect to calculate scores whenever hands change
  useEffect(() => {
    const playerScore = calculateScore(gameState.playerHand);
    const dealerScore = calculateScore(gameState.dealerHand);
    setGameState(prev => ({ ...prev, playerScore, dealerScore }));
  }, [gameState.playerHand, gameState.dealerHand]);


  // Effect to handle game logic based on phase and score changes
  useEffect(() => {
    if (gameState.phase === 'playing') {
      if (gameState.playerScore > 21) {
        setGameState(prev => ({ ...prev, phase: 'gameOver', message: 'Bust!' }));
      } else if (gameState.playerScore === 21) {
        stand();
      }
    } else if (gameState.phase === 'gameOver' && gameState.message !== 'Bust!') {
        const { playerScore, dealerScore, balance, currentBet } = gameState;
        if (dealerScore > 21 || playerScore > dealerScore) {
          setGameState(prev => ({ ...prev, message: 'You Win!', balance: balance + currentBet * 2 }));
        } else if (dealerScore > playerScore) {
          setGameState(prev => ({ ...prev, message: 'Dealer Wins!' }));
        } else {
          setGameState(prev => ({ ...prev, message: 'Tie!', balance: balance + currentBet }));
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.phase, gameState.playerScore, gameState.dealerScore]);


  return { gameState, placeBet, hit, stand, resetHand };
};