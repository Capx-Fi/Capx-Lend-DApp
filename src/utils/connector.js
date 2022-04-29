import { InjectedConnector } from "@web3-react/injected-connector";
export const injected = new InjectedConnector({
  supportedChainIds: "80001, 97, 43113, 4"
    .replace(/['"]+/g, "")
    .split(", ")
    .map(Number),
});
