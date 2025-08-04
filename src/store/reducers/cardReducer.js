import * as CONSTANTS from "../constants/GameConstants";
const initialState = {
  allCards: [],
  remainingPairIDs: []
};

const initCards = gameMode => {
  let tempCards = [];
  for (let i = 0; i < gameMode / 2; i++) {
    let card = {
      pairID: i,
      icon: i
    };
    tempCards.push(card);
  }
  //duplicate cards for memory game
  let cards = [...tempCards, ...tempCards];

  //shuffle cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards.map((el, idx) => {
    return { ...el, cardID: idx };
  });
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SETGAMEMODE:
      const cards = initCards(action.mode);
      const remainingPairs = [
        ...new Set(
          cards.map(elem => {
            return elem.pairID;
          })
        )
      ];
      return {
        ...state,
        allCards: cards,
        remainingPairIDs: remainingPairs
      };
    case CONSTANTS.SOLVEDPAIR:
      let newRemaining = state.remainingPairIDs.filter(el => {
        return el !== action.pair;
      });
      return {
        ...state,
        remainingPairIDs: newRemaining
      };
    default:
      return state;
  }
};

export default cardReducer;
