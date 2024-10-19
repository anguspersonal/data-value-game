import React from 'react';

const Lose = (props) => {
    const { score, livesRemaining, round } = props;

    return (
        <div className="lose-screen">
            <h1>Game Over</h1>
            <p>Sorry, you lost the game. Better luck next time!</p>
            <p>Final Score: {score}</p>
            <p>Lives Remaining: {livesRemaining}</p>
            <p>Final Round: {round}</p>
        </div>
    );
};

export default Lose;