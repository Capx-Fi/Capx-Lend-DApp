import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Web3ReactProvider } from "@web3-react/core";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import Web3 from "web3";
import { Provider } from "react-redux";
import { store } from "./redux/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function getLibrary(provider) {
  return new Web3(provider);
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MetamaskStateProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MetamaskStateProvider>
    </QueryClientProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);
