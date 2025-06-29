import React from 'react';
import { useBlackjackGame } from './functions';
import { Status } from './components/Status';
import { Controls } from './components/Control';
import { Hand } from './components/Hand';

export function SinglePage() {
  const { gameState, placeBet, hit, stand, resetHand } = useBlackjackGame();

  const isPlaying = gameState.phase === 'playing';
  const isBetting = gameState.phase === 'betting';

  return (
    <>
      <Status message={gameState.message} balance={gameState.balance} />
      <Controls
        balance={gameState.balance}
        isBetting={isBetting}
        isPlaying={isPlaying}
        onBet={placeBet}
        onHit={hit}
        onStand={stand}
        onReset={resetHand}
      />
      <Hand title={`Dealer's Hand (${gameState.dealerScore})`} cards={gameState.dealerHand} />
      <Hand title={`Your Hand (${gameState.playerScore})`} cards={gameState.playerHand} />
    </>
  );
}