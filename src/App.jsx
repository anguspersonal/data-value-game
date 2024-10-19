import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard.jsx'
import Header from './components/Header.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Header />
        <GameBoard />
    </div>
  )
}

export default App
