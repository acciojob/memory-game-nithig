import React from "react";
import { connect } from "react-redux";

import WelcomeScreen from "../../components/Screens/WelcomeScreen/WelcomeScreen";
import GameScreen from "../../components/Screens/GameScreen/GameScreen";
import * as GameActions from "../../store/actions/gameActions";
import { MainContainer, Content } from "./styles";

const DEFAULT_CARD_NUMBER = 8;

class MemoryGameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewGameClick = this.handleNewGameClick.bind(this);
    this.handleGameModeChange = this.handleGameModeChange.bind(this);
  }
  componentDidMount() {
    this.props.setGameMode(DEFAULT_CARD_NUMBER);
  }

  handleNewGameClick(e) {
    e.preventDefault();
    this.props.startGame();
  }

  handleGameModeChange(newMode) {
    this.props.setGameMode(newMode);
  }
  render() {
    const displayedSreen = this.props.isRunning ? (
      <GameScreen />
    ) : (
      <WelcomeScreen
        newGameClick={this.handleNewGameClick}
        handleModeChange={this.handleGameModeChange}
      />
    );
    return (
      <MainContainer>
        <Content>{displayedSreen}</Content>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state, ownPops) => {
  return {
    isRunning: state.gameReducer.isRunning,
    gameMode: state.gameReducer.gameMode,
    cards: state.gameReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(GameActions.startGame()),
    setGameMode: newMode => dispatch(GameActions.setGameMode(newMode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoryGameContainer);
