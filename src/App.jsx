import React, { useState, useDebugValue } from 'react'
import './App.css'
import GameBoard from './components/GameBoard.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Welcome from './components/Welcome.jsx';
//Set up routing
/*import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div>
      <h1>Start Screen</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};*/

//UseLabelState hook to add labels to state values
const useLabeledState = (initialState, label) => {
  const [state, setState] = useState(initialState);
  useDebugValue(`${label}: ${state}`);
  return [state, setState];
};

function App() {
//State to control whether the game is playing or not
const [gameStatus, setGameStatus] = useLabeledState(false, 'Game Status');

  return (
    <div>
      <Header />
      {/* Display the game board only if the game is playing */}
      {gameStatus ? 
        <GameBoard gameStatus={gameStatus} /> : 
        <Welcome startGame={() => setGameStatus(true)}/>
      }
      <Footer />
    </div>
  )
}

export default App
