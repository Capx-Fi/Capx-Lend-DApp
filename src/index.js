import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Web3ReactProvider } from "@web3-react/core";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import Web3 from "web3";
import { Provider } from "react-redux";
import { store } from "./redux/app";

function getLibrary(provider) {
  return new Web3(provider);
}
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <MetamaskStateProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MetamaskStateProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);
