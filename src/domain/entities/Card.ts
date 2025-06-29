export type Suit = 'spades' | 'diamonds' | 'clubs' | 'hearts';
export type SuitIcon = '♠' | '♦' | '♣' | '♥';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  value: Value;
  suit: Suit;
}

export interface HandCard extends Card {
  suitIcon: SuitIcon;
  hidden: boolean;
}