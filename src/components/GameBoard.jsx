//Imports
import React, { useState, useEffect, useDebugValue } from 'react';
import './GameBoard.css'; // Ensure the correct path to the CSS file
import industries from './Industries.json'; // Import industries from the JSON file
import Win from './Win.jsx'; // Import the Win component
import Lose from './Lose.jsx'; // Import the Lose component
import CTAGuessAutomotive from './CTA-GuessAutomotive.jsx'; // Import the CTAGuessAutomotive component

//UseLabelState hook to add labels to state values
const useLabeledState = (initialState, label) => {
  const [state, setState] = useState(initialState);
  useDebugValue(`${label}: ${state}`);
  return [state, setState];
};

// Shuffle the deck and set the initial industry card
const shuffleDeck = () => {
  const shuffledDeck = industries.sort(() => 0.5 - Math.random()).map((industry) => ({
    ...industry,
    state: 'Unflipped'
  }));

  // Log length of deck
  console.log('Deck Length:', shuffledDeck.length);

  // Select the initial industry card and remove it from the deck
  const startingIndustry = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];
  const filteredDeck = shuffledDeck.filter(industry => industry.id !== startingIndustry.id);

  // Log starting industry and deck
  console.log('Starting Industry:', startingIndustry);
  console.log('Filtered Deck Length:', filteredDeck.length);

  return {
    deck: filteredDeck,
    startingIndustry: startingIndustry,
  };
};

const GameBoard = () => {
  const [lives, setLives] = useLabeledState(3, 'Lives'); // Set initial lives to 3
  const [startingIndustry, setStartingIndustry] = useLabeledState(null, 'Starting Industry'); // Set the starting industry
  const [previousIndustry, setPreviousIndustry] = useLabeledState(null, 'Previous Industry'); // Set the previous industry
  const [gameStatus, setGameStatus] = useLabeledState('playing', 'Game Status'); // 'playing', 'won', 'lost'
  const [guess, setGuess] = useLabeledState(null, 'Guess'); // 'higher' or 'lower'
  const [score, setScore] = useLabeledState(0, 'Score'); // Track the score
  const [cards, setCards] = useLabeledState([], 'Cards'); // Combine industry data and card state
  const [selectedCard, setSelectedCard] = useLabeledState(null,'Selected Industry'); // Track the selected card by index
  const [roundCounter, setRoundCounter] = useLabeledState(0,'Round'); // Track the number of rounds played

  // Function to restart the game
  const restartGame = () => {
    const { deck, startingIndustry } = shuffleDeck();
    setLives(3);
    setStartingIndustry(startingIndustry);
    setPreviousIndustry(startingIndustry);
    setGameStatus('playing');
    setGuess(null);
    setScore(0);
    setCards(deck);
    setSelectedCard(null);
    setRoundCounter(0);
    console.log('Game restarted');
  };

  useEffect(() => {
    restartGame();
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
        ? selectedIndustry.dataValue > startingIndustry.dataValue
        : selectedIndustry.dataValue < startingIndustry.dataValue;
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
      if (roundCounter + 1 >= 9) {
        setGameStatus('won'); // Set game status to won if score reaches 9
        console.log('Congratulations! You have won the game!'); // Add console log
      }
    } else {
      setLives(lives - 1); // Decrement lives
      setPreviousIndustry(selectedIndustry); // Set selected industry as previous industry
      setGuess(null); // Reset guess
      if (lives - 1 === 0) {
        setGameStatus('lost'); // Set game status to lost if no lives left
        console.error('Game Over! No lives left.'); // Add console error
      }
    }

    setRoundCounter(roundCounter + 1); // Increment round counter
    setSelectedCard(null); // Reset selected card
  };

  const handleCardSelection = (index) => {
    if (gameStatus !== 'playing' || cards[index].state === 'Flipped' || cards[index].state === 'Flipping') return; // Only apply if card is not flipped or flipping

    setSelectedCard(index);
    updateCardState(index, 'Selected');
  };

  const Card = ({ industry, onClick }) => (
    <div className='card' onClick={onClick}>
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
    return (
      <div className="win-screen">
      <Win score={score} livesRemaining={lives} round={roundCounter} />
      <CTAGuessAutomotive />
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="lose-screen">
        <Lose score={score} livesRemaining={lives} round={roundCounter} />
        <CTAGuessAutomotive />
        <div className="restart">
          <button onClick={restartGame}>Restart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className='instructions'>
        <h3> Discover the Value of Data with Anmut</h3>
        <p>At Anmut, we believe many organisations miss the true value of their data because they don’t see it as a strategic asset. Our proprietary methodology values data not for selling, but for the value it drives within organisations.</p>
        <p>In this game, we've valued the data of FTSE 350 companies by sector.</p>
        <p>You start with {startingIndustry?.name}, valued at £{startingIndustry?.dataValue}bn.
          Select another industry and guess if its data value is higher or lower. The previous industry will update after each selection. 
          Keep going as long as you can! Best of luck!
        </p>
      </div>

      <div className="game-controls">
        <div className="game-info">
            {/* Lives */}
            <div className="game-info-item">
              <div className="label"><p>Lives:</p></ div>
              <div className="value-box">
                {Array.from({ length: lives }).map((_, index) => (
                  <span key={index} className="heart">❤️</span>
                ))}
              </div>
            </div>
              
            {/* Score */}
            <div className="game-info-item">
              <div className="label"><p>Score:</p></ div>
              <div className="value-box">
                  <p>{score}</p>
                </div>
            </div>

            {/* Round Counter */}
            <div className="game-info-item">
              <div className="label"><p>Round:</p></ div>
              <div className="value-box">
                <p>{roundCounter}</p>
              </div>
            </div>

            {/* Starting Industry */}
            <div className="game-info-item" id="starting-industry">
              <div className="label"><p>Starting Industry:</p></ div>
              <div className="value-box">
                <p>{startingIndustry?.name} (£{startingIndustry?.dataValue}bn)</p>
              </div>
            </div>

            {/* Previous Industry */}
            {previousIndustry?.name !== startingIndustry?.name && (
              <div className="game-info-item" id="previous-industry">
                <div className="label"><p>Previous Industry:</p></ div>
                <div className="value-box">
                  
                    <p>{previousIndustry?.name} (£{previousIndustry?.dataValue}bn)</p>
                </div>
              </div>
            )}
        </div>
        <div className='buttons'>    
          <button id="Lower-Button" onClick={() => handleGuess('lower')} disabled={selectedCard === null}>Lower</button>
          <button id="Higher-Button" onClick={() => handleGuess('higher')} disabled={selectedCard === null}>Higher</button>
        </div>   
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {cards.map((industry, index) => (
          <Card 
            key={index} 
            industry={industry} 
            onClick={() => handleCardSelection(index)} 
          />
        ))}
      </div>

      {/* Restart Button */}
      <div className="restart">
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
};

export default GameBoard;