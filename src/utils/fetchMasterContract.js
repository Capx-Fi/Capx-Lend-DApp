import { BigNumber } from "@ethersproject/bignumber";

export const fetchLoanRepayAmt = async( masterContract, loanID ) => {
    let result = null;
    try {
        result = await masterContract.methods
            .loanRepaymentAmount(loanID)
            .call();
        if (result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchHealthFactor = async( masterContract, loanID ) => {
    let result = null;
    try {
        result = await masterContract.methods
            .healthFactor(loanID)
            .call();
        if (result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchWVTAmt = async (masterContract, scAmt, wvtAddress, scAddress, ltv, discount) => {
    let result = null;
    try {
        result = await masterContract.methods
        .wvtAmountCalculation(
            scAmt,
            wvtAddress,
            scAddress,
            ltv,
            discount
        ).call();
        if(result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchSCAmt = async (masterContract, wvtAmount, wvtAddress, scAddress, ltv, discount) => {
    let result = null;
    try {
        result = await masterContract.methods
        .stablecoinAmountCalculation(
            wvtAmount,
            wvtAddress,
            scAddress,
            ltv,
            discount
        ).call();
        if(result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}