import { Card } from '../domain/entity/CardEntity';
import DeckData from './CardDeck.json';

// Fisher-Yates shuffle algorithm
const shuffle = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const DeckRepository = {
  getNewDeck: (): Card[] => {
    const freshDeck: Card[] = (DeckData.cards as Card[]).map(card => ({
      ...card,
      hidden: false,
    }));
    return shuffle(freshDeck);
  },
};