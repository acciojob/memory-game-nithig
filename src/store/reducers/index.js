import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import cardReducer from "./cardReducer";

export default combineReducers({
  gameReducer,
  cardReducer
});
