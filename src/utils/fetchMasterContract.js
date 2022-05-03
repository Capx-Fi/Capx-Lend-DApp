import BigNumber from "bignumber.js";
BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});


export const fetchLoanRepayAmt = async (masterContract, loanID, loan) => {
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

export const fetchIfValidWVT = async (masterContract, wvtAddress) => {
  let result = null;
  try {
    result = await masterContract.methods.getValidWvt(wvtAddress).call();

    if (result) {
      return result.toString(10);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLoanAmt = (price, scDecimal, amount, wvtDecimal, ltv, discount, isBorrower) => {
    let loanAmt = null;
    if(isBorrower) {
        let num = price 
            * Math.pow(10, scDecimal) 
            * new BigNumber(amount).multipliedBy(Math.pow(10, wvtDecimal))
            * (ltv*100)
            * (discount*100)
        let denom = 100000000 
                * Math.pow(10, wvtDecimal);
        loanAmt = new BigNumber(num / denom).dividedBy(Math.pow(10, scDecimal));
    } else {
        let num = 100000000 
            * new BigNumber(amount).multipliedBy(Math.pow(10, scDecimal))
            * Math.pow(10, wvtDecimal)
        let denom = price
                * (ltv*100)
                * (discount*100)
                * Math.pow(10, scDecimal);
        loanAmt = new BigNumber(num / denom).dividedBy(Math.pow(10, wvtDecimal));
    } 
    return loanAmt.toString(10);
}