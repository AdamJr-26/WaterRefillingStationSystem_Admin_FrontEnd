import React from "react";
import "./assets/styles/style";
import Router from "./router/Router";
import { Provider } from "react-redux";
import store from './lib/store/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
