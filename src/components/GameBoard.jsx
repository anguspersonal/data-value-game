import React, { useState, useEffect, useDebugValue } from 'react';
import './GameBoard.css'; // Ensure the correct path to the CSS file
import industries from './industries.json'; // Import industries from the JSON file

const generateHearts = (lives) => {
  return Array.from({ length: lives }).map((_, index) => (
    <span key={index} className="heart">❤️</span>
  ));
};

const useLabeledState = (initialState, label) => {
  const [state, setState] = useState(initialState);
  useDebugValue(`${label}: ${state}`);
  return [state, setState];
};

// Shuffle industries and select 9 for the card grid
const shuffledIndustries = industries.sort(() => 0.5 - Math.random()).slice(0, 9).map(industry => ({
  ...industry,
  state: 'Unselected' // Add initial state to each industry
}));

const GameBoard = () => {
  const [lives, setLives] = useLabeledState(3, 'Lives'); // Set initial lives to 3
  const [startingIndustry, setStartingIndustry] = useLabeledState(null, 'Starting Industry'); // Set the starting industry
  const [previousIndustry, setPreviousIndustry] = useLabeledState(null, 'Previous Industry'); // Set the previous industry
  const [gameStatus, setGameStatus] = useLabeledState('playing', 'Game Status'); // 'playing', 'won', 'lost'
  const [guess, setGuess] = useLabeledState(null, 'Guess'); // 'higher' or 'lower'
  const [score, setScore] = useLabeledState(0, 'Score'); // Track the score
  const [cards, setCards] = useLabeledState(shuffledIndustries, 'Cards'); // Combine industry data and card state
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card by index

  // Set the initial starting and previous industry when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const initialIndustry = cards[randomIndex];
    setStartingIndustry(initialIndustry);
    setPreviousIndustry(initialIndustry);
    setCards(prevCards => prevCards.filter(card => card.id !== initialIndustry.id)); // Remove the starting industry card
    console.log('Starting Industry:', initialIndustry); // Add console log
  }, []); // Empty dependency array ensures this runs only once

  const updateCardState = (index, newState) => {
    setCards(prevCards => prevCards.map((card, i) => ({
      ...card,
      state: i === index ? newState : card.state
    })));
  };

  const handleGuess = (selectedGuess) => {
    if (gameStatus !== 'playing' || selectedCard === null) return;
    setGuess(selectedGuess);

    const selectedIndustry = cards[selectedCard];
    let isCorrect;

    if (roundCounter === 0) {
      isCorrect = selectedGuess === 'higher'
        ? selectedIndustry.dataValue > initialIndustry.dataValue
        : selectedIndustry.dataValue < initialIndustry.dataValue;
    } else {
      isCorrect = selectedGuess === 'higher'
        ? selectedIndustry.dataValue > previousIndustry.dataValue
        : selectedIndustry.dataValue < previousIndustry.dataValue;
    }

    updateCardState(selectedCard, 'Flipping');

    setTimeout(() => {
      updateCardState(selectedCard, 'Flipped');
    }, 600); // Duration of the flip animation

    if (isCorrect) {
      setScore(score + 1); // Increment score
      setPreviousIndustry(selectedIndustry); // Set selected industry as previous industry
      setGuess(null); // Reset guess
      console.log('Correct Guess! New Previous Industry:', selectedIndustry); // Add console log
    } else {
      setLives(lives - 1); // Decrement lives
      if (lives - 1 === 0) {
        setGameStatus('lost'); // Set game status to lost if no lives left
        console.error('Game Over! No lives left.'); // Add console error
      }
    }

    setSelectedCard(null); // Reset selected card
  };

  const handleCardSelection = (index) => {
    if (gameStatus !== 'playing' || cards[index].state === 'Flipped' || cards[index].state === 'Flipping') return; // Only apply if card is not flipped or flipping

    setSelectedCard(index);
    updateCardState(index, 'Selected');
    console.log('Card Selected:', cards[index]); // Add console log
  };

  const Card = ({ industry, onClick }) => (
    <div className='card' key={industry.id} onClick={onClick}>
      <div className={`card-inner ${industry.state === 'Selected' ? 'selected' : ''} ${industry.state === 'Flipping' ? 'flipping' : ''} ${industry.state === 'Flipped' ? 'flipped' : ''}`}>
        <div className="card-front">
          <p>{industry.name}</p>
        </div>
        <div className="card-back">
          <p>{industry.name}</p>
          <p>£{industry.dataValue}bn</p>
        </div>
      </div>
    </div>
  );

  if (gameStatus === 'won') {
    return <div className="win-screen">You Win!</div>;
  }

  if (gameStatus === 'lost') {
    return <div className="lose-screen">You Lose!</div>;
  }

  return (
    <div className="game-board">
      <div className="lives">
        {generateHearts(lives)}
      </div>

      <div className="starting-industry">
        <p>Starting Industry: {startingIndustry?.name} (£{startingIndustry?.dataValue}bn)</p>
      </div>

      <div className="previous-industry">
        {previousIndustry?.name !== startingIndustry?.name && (
          <p>Previous Industry: {previousIndustry?.name} (£{previousIndustry?.dataValue}bn)</p>
        )}
      </div>

      <div className="controls">
        <button onClick={() => handleGuess('higher')} disabled={selectedCard === null}>Higher</button>
        <button onClick={() => handleGuess('lower')} disabled={selectedCard === null}>Lower</button>
      </div>

      {/* Card Grid */}
      <div className="cards-grid">
        {cards.map((industry, index) => (
          <Card 
            key={index} 
            industry={industry}
            onClick={() => handleCardSelection(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;