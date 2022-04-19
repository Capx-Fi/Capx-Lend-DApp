import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Web3ReactProvider} from "@web3-react/core";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import {SnackbarProvider} from "notistack";
import Web3 from "web3";
import { Provider } from 'react-redux';
import * as serviceWorker from "./serviceWorker";
import './assets/less/style.less';

// function getLibrary(provider) {
//   return new Web3(provider);
// }

// ReactDOM.render(
//   <Web3ReactProvider getLibrary={getLibrary}>
//     <MetamaskStateProvider>
//       <SnackbarProvider
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         maxSnack={3}
//       >
//         <App />
//         {/* <MetamaskModal /> */}
//         {/* <VestingOverview/> */}
//       </SnackbarProvider>
//     </MetamaskStateProvider>
//   </Web3ReactProvider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

ReactDOM.render(
  <App />,
document.getElementById("root")
);

serviceWorker.unregister();