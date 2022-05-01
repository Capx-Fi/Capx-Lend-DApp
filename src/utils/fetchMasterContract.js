export const fetchLoanRepayAmt = async( masterContract, loanID , loan) => {
    let result = null;
    try {
        result = await masterContract.methods
            .loanRepaymentAmount(loanID)
            .call()
        if (result) {
                console.log("Loan Repayment Amt :", result);
                return result.toString(10);
        };
    } catch (error) {
        console.log("ERROR",error);
    }
}

export const fetchLiquidationAmt = async( masterContract, loanID) => {
    let result = null;
    try {
        result = await masterContract.methods
            .liquidationAmount(loanID)
            .call()
        if (result) {
                console.log("Loan Repayment Amt :", result['0'].toString(10));
                return result['0'].toString(10);
        };
    } catch (error) {
        console.log("ERROR",error);
    }
}

export const fetchHealthFactor = async( masterContract, loanID ) => {
    let result = null;
    try {
        result = await masterContract.methods
            .healthFactor(loanID)
            .call()
        if (result){
                console.log("Health Factor :", result);
                return result.toString(10);
            };
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
        if(result) {
            console.log("WVT Amount :", result);
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
        ).call()
        if(result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchPenalty = async (masterContract) => {
    let result = null;
    try {
        result = await masterContract.methods
        .penalty().call()
        if(result) {
            return result.toString(10);
        }
    } catch (error) {
        console.log(error);
    }
}