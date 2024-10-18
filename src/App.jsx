import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard.jsx'
import Welcome from './components/Welcome.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Welcome />
        <GameBoard />
    </div>
  )
}

export default App
