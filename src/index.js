import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/index";
import MemoryGameContainer from "./container/MemoryGameContainer/MemoryGameContainer";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <MemoryGameContainer />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
