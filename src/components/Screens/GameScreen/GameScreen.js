import React from "react";
import { connect } from "react-redux";
import * as GameActions from "../../../store/actions/gameActions";
import { Row } from "./styles";
import Card from "./Card";

const SPLITAFTER = 4;

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: this.props.isPaused,
      firstActive: -1,
      firstActiveCard: null,
      secondActiveCard: null,
    };

    this.renderGameField = this.renderGameField.bind(this);
    this.handleCardClicked = this.handleCardClicked.bind(this);
    this.handleNewGameButton = this.handleNewGameButton.bind(this);
  }
  componentDidMount() {
  }

  renderGameField() {
    let rowCount = this.props.gameMode / SPLITAFTER;
    let rows = [];
    let cards = [...this.props.cards];
    for (let i = 0; i < rowCount; i++) {
      let temp = [];
      for (let j = 0; j < SPLITAFTER; j++) {
        let item = cards.shift();
        temp.push(item);
      }
      rows.push(temp);
    }
    return rows;
  }

  handleCardClicked(cardID, pairID){
    if(this.state.firstActive === -1){
      this.setState({firstActiveCard: cardID, firstActive: pairID});
    }else{
      if(this.state.firstActiveCard===cardID) return;
      if(pairID === this.state.firstActive){
        this.setState({
          secondActiveCard : cardID
        }, () => {
          setTimeout( () => {
            this.setState({firstActiveCard: null, firstActive: -1,secondActiveCard:null});
            this.props.solvedPair(pairID);
          }, 400)
        })
      }
      else{
       this.setState({
          secondActiveCard : cardID
        }, () => {
          setTimeout( () => {
            this.setState({firstActiveCard: null, firstActive: -1,secondActiveCard:null});
            this.props.addFailed();
            
          }, 800)
        })
      }
    }
  }

  handleNewGameButton(e){
    e.preventDefault();
    this.props.quitGame();
  }
  render() {
    let rows = this.renderGameField();
    return (
      <div className="cells_container">
        <h1>GAmE YO</h1>
        <h4>Tries: {this.props.tries}</h4>
        {this.props.remainingPairs.length===0 &&(
          <div>
            <h5>ALL SOLVED!</h5>
            <button onClick={this.handleNewGameButton}>New Game</button>
          </div>
        )}
        {rows &&
          rows.map((el,ix) => {
            return (
              <Row key={"row_"+ix}>
                {el.map((elem, idx) => {
                  let active = elem.cardID === this.state.firstActiveCard || elem.cardID === this.state.secondActiveCard; 
                  return <Card  key={"card_"+idx} 
                                active={active} 
                                clickable={this.props.remainingPairs.includes(elem.pairID)} 
                                pairID={elem.pairID} 
                                cardID={elem.cardID} 
                                onClick={this.handleCardClicked}
                                />;
                })}
              </Row>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPaused: state.gameReducer.isPaused,
    gameMode: state.gameReducer.gameMode,
    tries: state.gameReducer.tries,
    cards: state.cardReducer.allCards,
    remainingPairs: state.cardReducer.remainingPairIDs,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGameMode: mode => dispatch(GameActions.setGameMode(mode)),
    solvedPair: pairID => dispatch(GameActions.solvedPair(pairID)),
    addFailed: () => dispatch(GameActions.addFailedTry()),
    quitGame: () => dispatch(GameActions.quitGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);
