import { Card } from '../domain/entity/Card';
import DeckData from './CardDeck.json';

// Fisher-Yates shuffle algorithm
const ShuffleCardDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const CardDeck = {
  getShuffledCardDeck: (): Card[] => {
    const CardDeck: Card[] = (DeckData.cards as Card[]).map(card => ({
      ...card,
      hidden: false,
    }));
    return ShuffleCardDeck(CardDeck);
  },
};