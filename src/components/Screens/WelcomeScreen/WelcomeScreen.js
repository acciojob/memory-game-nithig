import React from "react";

const WelcomeScreen = props => {
  const gameModeChange = e => {
    props.handleModeChange(Number(e.target.value));
  };
  return (
    <>
      <h5>Welcome!</h5>
      <div onChange={gameModeChange} className='levels_container'>
        <input id="easy" type="radio" value="8" name="gameMode" />
        <label for="easy"> Easy</label>
        <input id="normal" type="radio" value="16" name="gameMode" />
        <label for="normal">Normal</label>
        <input id="hard" type="radio" value="24" name="gameMode" />
        <label for="hard">Hard</label>
      </div>
      <button onClick={props.newGameClick}>Start</button>
    </>
  );
};

export default WelcomeScreen;
