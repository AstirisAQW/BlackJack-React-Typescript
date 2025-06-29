import { Card, HandCard, SuitIcon } from '../domain/entities/Card';
import deckData from './deck.json';

const suitToIcon: Record<string, SuitIcon> = {
  spades: '♠',
  diamonds: '♦',
  clubs: '♣',
  hearts: '♥',
};

// Fisher-Yates shuffle algorithm
const shuffle = (deck: HandCard[]): HandCard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const deckRepository = {
  getNewDeck: (): HandCard[] => {
    const freshDeck: HandCard[] = (deckData.cards as Card[]).map(card => ({
      ...card,
      suitIcon: suitToIcon[card.suit],
      hidden: false,
    }));
    return shuffle(freshDeck);
  },
};