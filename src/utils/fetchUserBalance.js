import BigNumber from "bignumber.js";
import Web3 from "web3";
import { ERC20_ABI } from "../contracts/ERC20";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const fetchUserBalance = async (account, assetAddress, decimal) => {
  const web3 = new Web3(Web3.givenProvider);
  const assetContract = new web3.eth.Contract(ERC20_ABI, assetAddress);

  try {
    let result = await assetContract.methods.balanceOf(account).call();
    if (result) {
      return new BigNumber(result)
        .dividedBy(Math.pow(10, decimal))
        .toString(10);
    }
  } catch (err) {
    console.log(err);
  }
};
