import * as CONSTANTS from "../constants/GameConstants";
const initialState = {
  isRunning: false,
  gameMode: 8, // number of cards to solve, minimum 8
  tries: 0
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.START:
      return {
        ...state,
        isRunning: true
      };
    case CONSTANTS.SETGAMEMODE:
      return {
        ...state,
        gameMode: action.mode
      };
    case CONSTANTS.SOLVEDPAIR:
    case CONSTANTS.ADDFAILEDTRY:
      return {
        ...state,
        tries: state.tries + 1
      };
    case CONSTANTS.QUIT:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
