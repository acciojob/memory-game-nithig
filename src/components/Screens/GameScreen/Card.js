import React from "react";
import { CardContainer } from "./styles";

const Card = props => {
  const test = e => {
    props.clickable && props.onClick(props.cardID, props.pairID);
  };
  return (
    <CardContainer onClick={test} active={props.active}>
      {(props.active || !props.clickable) && <span>{props.pairID}</span>}
    </CardContainer>
  );
};

export default Card;
