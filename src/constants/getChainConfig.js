import {
  BSC_CHAIN_ID,
  MATIC_CHAIN_ID,
  EXPLORER_BSC,
  EXPLORER_ETHEREUM,
  EXPLORER_MATIC,
  GRAPHAPIURL_MASTER_BSC,
  GRAPHAPIURL_MASTER_ETHEREUM,
  GRAPHAPIURL_MASTER_MATIC,
  CONTRACT_ADDRESS_MASTER_ETHEREUM,
  CONTRACT_ADDRESS_ORACLE_ETHEREUM,
  CONTRACT_ADDRESS_LEND_ETHEREUM,
  ETHEREUM_CHAIN_ID,
  CONTRACT_ADDRESS_MASTER_BSC,
  CONTRACT_ADDRESS_ORACLE_BSC,
  POLYGON_CHAIN_ID,
  GRAPHAPIURL_MASTER_POLYGON,
  CONTRACT_ADDRESS_MASTER_POLYGON,
  CONTRACT_ADDRESS_ORACLE_POLYGON,
  CONTRACT_ADDRESS_LEND_POLYGON,
  CONTRACT_ADDRESS_LEND_BSC,
  AVALANCHE_CHAIN_ID,
  GRAPHAPIURL_MASTER_AVALANCHE,
  CONTRACT_ADDRESS_MASTER_AVALANCHE,
  CONTRACT_ADDRESS_ORACLE_AVALANCHE,
  CONTRACT_ADDRESS_LEND_AVALANCHE,
  STABLE_COIN_SYMBOLS_ETHEREUM,
  STABLE_COIN_SYMBOLS_BSC,
  STABLE_COIN_SYMBOLS_POLYGON,
  STABLE_COIN_SYMBOLS_AVALANCHE,
  STABLE_COIN_ADDRESSES_ETHEREUM,
  STABLE_COIN_ADDRESSES_BSC,
  STABLE_COIN_ADDRESSES_POLYGON,
  STABLE_COIN_ADDRESSES_AVALANCHE,
  STABLE_COIN_DECIMALS_ETHEREUM,
  STABLE_COIN_DECIMALS_BSC,
  STABLE_COIN_DECIMALS_POLYGON,
  STABLE_COIN_DECIMALS_AVALANCHE,
  WRAPPED_URL_ETHEREUM,
  WRAPPED_URL_BSC,
  WRAPPED_URL_POLYGON,
  WRAPPED_URL_AVALANCHE,
} from "./config.js";

export const getMasterURL = (chainId) => {
  const masterURL =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_AVALANCHE
      : GRAPHAPIURL_MASTER_ETHEREUM;
  return masterURL;
};

export const getMasterContract = (chainId) => {
  const masterContract =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_MASTER_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_MASTER_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_MASTER_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_MASTER_AVALANCHE
      : CONTRACT_ADDRESS_MASTER_ETHEREUM;
  return masterContract;
};

export const getOracleContract = (chainId) => {
  const oracleContract =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_ORACLE_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_ORACLE_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_ORACLE_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_ORACLE_AVALANCHE
      : CONTRACT_ADDRESS_ORACLE_ETHEREUM;
  return oracleContract;
};

//get lend contract address
export const getLendContract = (chainId) => {
  const lendContract =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_LEND_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_LEND_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_LEND_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_LEND_AVALANCHE
      : CONTRACT_ADDRESS_LEND_ETHEREUM;
  return lendContract;
};

//get wrapped url
export const getWrappedURL = (chainId) => {
  const wrappedURL =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? WRAPPED_URL_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? WRAPPED_URL_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? WRAPPED_URL_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? WRAPPED_URL_AVALANCHE
      : WRAPPED_URL_ETHEREUM;
  return wrappedURL;
};

export const stableCoinListConfig = (chainId) => {
  const stableCoinSymbols =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? STABLE_COIN_SYMBOLS_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? STABLE_COIN_SYMBOLS_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? STABLE_COIN_SYMBOLS_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? STABLE_COIN_SYMBOLS_AVALANCHE
      : STABLE_COIN_SYMBOLS_ETHEREUM;

  const stableCoinAddresses =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? STABLE_COIN_ADDRESSES_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? STABLE_COIN_ADDRESSES_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? STABLE_COIN_ADDRESSES_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? STABLE_COIN_ADDRESSES_AVALANCHE
      : STABLE_COIN_ADDRESSES_ETHEREUM;

  const stableCoinDecimals =
    chainId.toString() === ETHEREUM_CHAIN_ID.toString()
      ? STABLE_COIN_DECIMALS_ETHEREUM
      : chainId.toString() === BSC_CHAIN_ID.toString()
      ? STABLE_COIN_DECIMALS_BSC
      : chainId.toString() === POLYGON_CHAIN_ID.toString()
      ? STABLE_COIN_DECIMALS_POLYGON
      : chainId.toString() === AVALANCHE_CHAIN_ID.toString()
      ? STABLE_COIN_DECIMALS_AVALANCHE
      : STABLE_COIN_DECIMALS_ETHEREUM;

  console.log(stableCoinSymbols, stableCoinAddresses, stableCoinDecimals);
  const list = stableCoinSymbols.split(",").map((symbol, index) => {
    return {
      stableCoin: symbol,
      stableCoinAdd: stableCoinAddresses.split(",")[index],
      stableCoinDecimal: stableCoinDecimals.split(",")[index],
    };
  });

  return list;
};
