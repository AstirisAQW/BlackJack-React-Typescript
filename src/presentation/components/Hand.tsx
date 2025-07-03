import React from 'react';
import { Card as CardType } from '../../domain/entity/Card';
import { Card } from './Card';
import '../css/Hand.css';

interface HandProps {
title: string;
hand: CardType[];
score: number;
}

export const Hand: React.FC<HandProps> = ({ title, hand, score }) => {
// Only show score if the hand is revealed (i.e., no hidden cards)
const showScore = !hand.some(card => card.isCardHidden);
return (
    <div className="hand-container">
        <h2>{title} {showScore && hand.length > 0 && `- Score: ${score}`}</h2>
        <div className="hand-cards">
            {hand.length === 0 && <div className="card-placeholder"></div>}
            {hand.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    </div>
);
};