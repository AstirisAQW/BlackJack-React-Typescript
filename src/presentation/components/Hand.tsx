import React from 'react';
import styles from '../css/Hand.module.css';
import { Card } from './Card';
import { HandCard } from '../../domain/entities/Card';

type HandProps = {
  title: string,
  cards: HandCard[]
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  return (
    <div className={styles.handContainer}>
      {cards.length > 0 && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suitIcon} hidden={card.hidden} />
        ))}
      </div>
    </div>
  );
}
export default Hand;

export { Hand };