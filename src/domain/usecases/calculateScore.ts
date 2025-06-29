import { HandCard } from '../entities/Card';

export function calculateScore(hand: HandCard[]): number {
  let total = 0;
  const aces: HandCard[] = [];

  // Calculate score for non-Ace cards first
  hand.forEach((card) => {
    if (card.hidden) return;

    if (card.value === 'A') {
      aces.push(card);
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      total += 10;
    } else {
      total += Number(card.value);
    }
  });

  // Calculate score for Aces
  aces.forEach(() => {
    if (total + 11 > 21) {
      total += 1;
    } else {
      total += 11;
    }
  });

  return total;
}