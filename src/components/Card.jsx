import React, { useState, useDebugValue } from 'react';
import './Card.css'; // Ensure the correct path to the CSS file

const Card = ({ industry, onClick, flipped, disabled, selected }) => {
  return (
    <div className={`card ${selected ? 'selected' : ''}`} onClick={disabled ? null : onClick}>
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <p>{industry.name}</p>
        </div>
        <div className="card-back">
          <p>£{industry.dataValue}bn</p>
        </div>
      </div>
    </div>
  );
};

export default Card;