import React from 'react';
import '../css/Controls.css';

interface ControlsProps {
    isGameActive: boolean;
    isGameOver: boolean;
    onStart: () => void;
    onHit: () => void;
    onStand: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isGameActive, isGameOver, onStart, onHit, onStand }) => {
return (
<div className="controls">
{!isGameActive && (
<button onClick={onStart}>{isGameOver ? 'Play Again' : 'Start Game'}</button>
)}
{isGameActive && (
<>
<button onClick={onHit}>Hit</button>
<button onClick={onStand}>Stand</button>
</>
)}
</div>
);
};