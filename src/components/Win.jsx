import React, {useEffect} from 'react';
import '../index.css';

const Win = ({ score, livesRemaining, round }) => {

    useEffect(() => {
        // Scroll to top when the component renders
        window.scrollTo(0, 0);
      }, []);


    return (
        <div className="win-screen">
            <h1 id="winScreenTitle">Congratulations!</h1>
            <h3>You Win!</h3>
            <p>Your Score: {score}</p>
            <p>Lives Remaining: {livesRemaining}</p>
            <p>Round reached: {round}</p>
        </div>
    );
};



export default Win;

