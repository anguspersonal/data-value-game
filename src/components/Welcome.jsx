import React, { useState } from 'react'

function Welcome(props) {

    return(
        <div>
         <img id='planet' src="../anmut-planet.webp" alt="Anmut Logo" className="logo" />    
        <h1 style={{ justifyContent: 'center' }}>Welcome!</h1>
        <div className='instructions'>
        <h3> Discover the Value of Data with Anmut</h3>
        <p>At Anmut, we believe many organisations miss the true value of their data 
            because they don’t see it as a strategic asset. Our proprietary methodology 
            values data not for selling, but for the value it drives within organisations.</p>
        <p>In this game, we've valued the data of FTSE 350 companies by sector.</p>
        <p>Select an industry card below and guess if its data value is higher or lower than 
        the starting industry given. If you're right, you win a point, and move to the next 
        round. Select another industry, this time comparing to the previous industry value.
        Keep going as long as you can! Best of luck!</p>
        <button onClick={props.startGame}>Start Game</button>
      </div>
        </div>
    );

}

export default Welcome;