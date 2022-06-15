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

import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  Chain,
} from "wagmi";

import { rinkeby, polygonMumbai } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { avalancheChain, bscTestnet } from "./chainObjects";

const { chains, provider, webSocketProvider } = configureChains(
  [avalancheChain, bscTestnet, rinkeby, polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

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
  <WagmiConfig client={client}>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <MetamaskStateProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MetamaskStateProvider>
    </QueryClientProvider>
  </WagmiConfig>,
  document.getElementById("root")
);
