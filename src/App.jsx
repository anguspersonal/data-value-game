import React, { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <div>
      <Header />
      <GameBoard />
      <Footer />
    </div>
  )
}

export default App
