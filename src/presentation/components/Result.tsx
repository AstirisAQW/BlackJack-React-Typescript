import React from 'react';
import { GameMessage } from '../../domain/entity/GameState';
import '../css/Results.css';

interface ResultProps {
    message: GameMessage;
}

export const Result: React.FC<ResultProps> = ({ message }) => {
    if (!message) {
        return <div className="result"></div>;
    }
    return (
        <div className="result">
        <h1>{message}</h1>
        </div>
    );
};