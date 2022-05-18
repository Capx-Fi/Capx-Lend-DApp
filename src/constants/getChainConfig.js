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
} from "./config.js";


export const getMasterURL = (chainId) => {
	const masterURL = chainId.toString() === ETHEREUM_CHAIN_ID.toString() ? GRAPHAPIURL_MASTER_ETHEREUM : GRAPHAPIURL_MASTER_ETHEREUM;
	return masterURL;
};

export const getMasterContract = (chainId) => {
	const masterContract = chainId.toString() === ETHEREUM_CHAIN_ID.toString() ? CONTRACT_ADDRESS_MASTER_ETHEREUM : CONTRACT_ADDRESS_MASTER_ETHEREUM;

	return masterContract;
};

export const getOracleContract = (chainId) => {
	const oracleContract = chainId.toString() === ETHEREUM_CHAIN_ID.toString() ? CONTRACT_ADDRESS_ORACLE_ETHEREUM : CONTRACT_ADDRESS_ORACLE_ETHEREUM;
	return oracleContract;
};

export const getLendContract = (chainId) => {
	const lendContract = chainId.toString() === ETHEREUM_CHAIN_ID.toString() ? CONTRACT_ADDRESS_LEND_ETHEREUM : CONTRACT_ADDRESS_LEND_ETHEREUM;
	return lendContract;
};
