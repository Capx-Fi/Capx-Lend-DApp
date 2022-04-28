import { BigNumber } from "@ethersproject/bignumber";

export const fetchMarketPrice = async( oracleContract, wvtAddress) => {
    let result = null;
    try {
        result = await oracleContract.methods
            .getPrice(wvtAddress)
            .call();
        if (result) {
            var l1 = result['0'].toString(10);
            var l2 = result['1'].toString(10);
            return new BigNumber(l1).dividedBy(Math.pow(10, l2)).toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}