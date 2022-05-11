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
} from "./config.js";

// export const getExplorerURL = (chainId) => {
// 	const explorerURL =
// 		chainId?.toString() === BSC_CHAIN_ID.toString()
// 			? EXPLORER_BSC
// 			: chainId?.toString() === MATIC_CHAIN_ID.toString()
// 			? EXPLORER_MATIC
// 			: EXPLORER_ETHEREUM;
// 	return explorerURL;
// };

export const getMasterURL = (chainId) => {
	const masterURL = GRAPHAPIURL_MASTER_ETHEREUM;
	return masterURL;
};

export const getMasterContract = (chainId) => {
	const masterContract = CONTRACT_ADDRESS_MASTER_ETHEREUM;
	return masterContract;
};

export const getOracleContract = (chainId) => {
	const oracleContract = CONTRACT_ADDRESS_ORACLE_ETHEREUM;
	return oracleContract;
};

export const getLendContract = (chainId) => {
	const lendContract = CONTRACT_ADDRESS_LEND_ETHEREUM;
	return lendContract;
};
