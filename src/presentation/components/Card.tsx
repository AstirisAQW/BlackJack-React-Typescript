import React from 'react';
import { Card as CardType } from '../../domain/entity/Card';
import '../css/Card.css';

interface CardProps {
    card: CardType;
}

const suitSymbols: { [key in CardType['CardSuit']]: string } = {
    Hearts: '♥',
    Diamonds: '♦',
    Clubs: '♣',
    Spades: '♠',
};

export const Card: React.FC<CardProps> = ({ card }) => {
    if (card.isCardHidden) {
        return <div className="card card-hidden"></div>;
    }

    return (
        <div className={`card-color`}>
            <div className="card-value-suit top">{card.CardValue}{suitSymbols[card.CardSuit]}</div>
            <div className="card-suit-center">{suitSymbols[card.CardSuit]}</div>
            <div className="card-value-suit bottom">{card.CardValue}{suitSymbols[card.CardSuit]}</div>
        </div>
    );
};