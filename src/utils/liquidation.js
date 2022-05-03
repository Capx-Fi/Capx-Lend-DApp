import BigNumber from "bignumber.js";
import Web3 from "web3";

BigNumber.config({
	ROUNDING_MODE: 3,
	DECIMAL_PLACES: 18,
	EXPONENTIAL_AT: [-18, 36],
});

export const approveLiquidation = async (
	masterContract,
	account,
	loanID,
	ERC20_ABI,
	LEND_CONTRACT_ADDRESS,
	scAddress
) => {
	let result = null;
	const web3 = new Web3(Web3.givenProvider);

	// Getting the value to be approved by the user.
	let approvalAmt = null;
	try {
		result = await masterContract.methods.liquidationAmount(loanID).call();
		if (result) {
			approvalAmt = result["0"].toString(10);
		}
	} catch (error) {
		console.log("Master - Fetch Liquidation Amount ERR: \n", error);
	}

	// Approving the tokens
	let approvalResult = null;
	try {
		const erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
		approvalResult = await erc20Contract.methods
			.approve(LEND_CONTRACT_ADDRESS, approvalAmt)
			.send({ from: account });
	} catch (err) {
		console.log("ERC20 - Approve | Liquidation Amount ERR: \n", err);
	}
};

export const liquidation = async (lendContract, account, loanID) => {
	let result = null;
	try {
		result = await lendContract.methods
			.liquidation(loanID)
			.send({ from: account });
	} catch (error) {
		console.log(error);
	}
};
