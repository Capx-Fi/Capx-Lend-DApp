import BigNumber from "bignumber.js";

export const fetchLoanRepayAmt = async( masterContract, loanID ) => {
    let result = null;
    try {
        result = await masterContract.methods
            .loanRepaymentAmount(loanID)
            .call()
            .then((result) => {
                console.log("Loan Repayment Amt :", result);
                return result.toString(10);
            })
        
    } catch (error) {
        console.log(error);
    }
}

export const fetchHealthFactor = async( masterContract, loanID ) => {
    try {
        await masterContract.methods
            .healthFactor(loanID)
            .call()
            .then( (result) => {
                console.log("Health Factor :", result);
                return result.toString(10);
            }
            );
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
        ).call()
        .then((result) => {
            console.log("WVT Amount :", result);
            return result.toString(10);
        })
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
        ).call()
        .then((result) => {
            console.log("Stable Coin Amount :", result);
            return result.toString(10);
        })
    } catch (error) {
        console.log(error);
    }
}