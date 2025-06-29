import { HandCard } from '../entities/Card';
import { calculateScore } from './calculateScore';

export function DealerLogic(dealerHand: HandCard[], deck: HandCard[]): { finalHand: HandCard[], updatedDeck: HandCard[] } {
  let currentHand = [...dealerHand];
  let currentDeck = [...deck];
  let score = calculateScore(currentHand);

  while (score < 17) {
    const card = currentDeck.pop();
    if (card) {
      currentHand.push(card);
      score = calculateScore(currentHand);
    } else {
      break; // No more cards in the deck
    }
  }

  return {
    finalHand: currentHand,
    updatedDeck: currentDeck,
  };
}