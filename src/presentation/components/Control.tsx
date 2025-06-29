import React, { useState, useEffect } from 'react';
import styles from '../css/Controls.module.css';

type ControlsProps = {
  balance: number,
  isBetting: boolean,
  isPlaying: boolean,
  onBet: (amount: number) => void,
  onHit: () => void,
  onStand: () => void,
  onReset: () => void,
};

const Controls: React.FC<ControlsProps> = ({ balance, isBetting, isPlaying, onBet, onHit, onStand, onReset }) => {
  const [amount, setAmount] = useState(10);
  const [isAmountValid, setIsAmountValid] = useState(true);

  useEffect(() => {
    setIsAmountValid(amount > 0 && amount <= balance);
  }, [amount, balance]);

  const onBetClick = () => {
    if (isAmountValid) {
      onBet(Math.round(amount * 100) / 100);
    }
  }

  if (isBetting) {
    return (
      <div className={styles.controlsContainer}>
        <div className={styles.betContainer}>
          <h4>Amount:</h4>
          <input
            autoFocus
            type='number'
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={isAmountValid ? styles.input : styles.inputError}
          />
        </div>
        <button onClick={onBetClick} className={styles.button} disabled={!isAmountValid}>Bet</button>
      </div>
    );
  }

  return (
    <div className={styles.controlsContainer}>
      <button onClick={onHit} disabled={!isPlaying} className={styles.button}>Hit</button>
      <button onClick={onStand} disabled={!isPlaying} className={styles.button}>Stand</button>
      <button onClick={onReset} disabled={isPlaying} className={styles.button}>New Hand</button>
    </div>
  );
}

export default Controls;
// Renamed for clarity
export { Controls };