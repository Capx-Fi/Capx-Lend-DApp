import React from "react";
import ReactDOM from "react-dom";
// import { Provider, createClient } from "wagmi";
// import { Provider } from "react-redux";
// import { applyMiddleware, createStore } from "redux";
import App from "./App";

// const client = createClient({
//   autoConnect: true,
// });
import { Web3ReactProvider } from "@web3-react/core";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import Web3 from "web3";

function getLibrary(provider) {
	return new Web3(provider);
}
ReactDOM.render(
	<Web3ReactProvider getLibrary={getLibrary}>
		<MetamaskStateProvider>
			<App />
			{/* <MetamaskModal /> */}
			{/* <VestingOverview/> */}
		</MetamaskStateProvider>
	</Web3ReactProvider>,
	document.getElementById("root")
);
