import {
	BSC_CHAIN_ID,
	MATIC_CHAIN_ID,
	EXPLORER_BSC,
	EXPLORER_ETHEREUM,
	EXPLORER_MATIC,
	GRAPHAPIURL_MASTER_BSC,
	GRAPHAPIURL_MASTER_ETHEREUM,
	GRAPHAPIURL_MASTER_MATIC,
} from "./config.js";

export const getExplorerURL = (chainId) => {
	const explorerURL =
		chainId?.toString() === BSC_CHAIN_ID.toString()
			? EXPLORER_BSC
			: chainId?.toString() === MATIC_CHAIN_ID.toString()
			? EXPLORER_MATIC
			: EXPLORER_ETHEREUM;
	return explorerURL;
};

export const getMasterURL = (chainId) => {
	const masterURL =
		chainId?.toString() === BSC_CHAIN_ID.toString()
			? GRAPHAPIURL_MASTER_BSC
			: chainId?.toString() === MATIC_CHAIN_ID.toString()
			? GRAPHAPIURL_MASTER_MATIC
			: GRAPHAPIURL_MASTER_ETHEREUM;
	return masterURL;
};
