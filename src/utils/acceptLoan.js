import BigNumber from "bignumber.js";
import Web3 from "web3";
BigNumber.config({
    ROUNDING_MODE: 3,
    DECIMAL_PLACES: 18,
    EXPONENTIAL_AT: [-18, 36],
  });

export const approveAcceptLoan = async(
    masterContract,
    account,
    ERC20_ABI, 
    LEND_CONTRACT_ADDRESS,
    loanID,
    isBorrower, // Stable coin amount of loan in case of Borrower accepting the loan else WVT amount of the loan.
    loan,
) => {
    let result = null;
    const web3 = new Web3(Web3.givenProvider);
    // Getting the value to be approved by the user.
    let approvalAmt = null;
    try {
        if(isBorrower){
            result = await masterContract.methods
                .wvtAmountCalculation(
                    new BigNumber(loan?.stableCoinAmt).multipliedBy(Math.pow(10, loan?.stableCoinDecimal).toString(10)),
                    loan?.collateralAddress,
                    loan?.stableCoinAddress,
                    new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
                    new BigNumber(loan?.discount).multipliedBy(100).toString(10)
                ).call();
            if (result) {
                approvalAmt = result.toString(10);
            }
        } else {
            result = await masterContract.methods
                .stablecoinAmountCalculation(
                    new BigNumber(loan?.collateralAmt).multipliedBy(Math.pow(10, loan?.collateralDecimal).toString(10)),
                    loan?.collateralAddress,
                    loan?.stableCoinAddress,
                    new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
                    new BigNumber(loan?.discount).multipliedBy(100).toString(10)
                ).call();
            if (result) {
                approvalAmt = result.toString(10);
            }
        }
    } catch (error) {
        console.log("Master - Accept Loan Amount ERR: \n", error);
    }
    // Approving the tokens
    let approvalResult = null;
    try {
        let erc20Contract = null;
        if(isBorrower) {
            erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.collateralAddress);
        } else {
            erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.stableCoinAddress);
        }
        approvalResult = await erc20Contract.methods
            .approve(LEND_CONTRACT_ADDRESS, approvalAmt)
            .send({from :account});
    } catch (err) {
        console.log("ERC20 - Approve | Accept Loan Amount ERR: \n", err);
    }
}


export const acceptLoan = async(
    lendContract,
    account,
    loanID,
    externalLiquidateFlag
) => {
    let result = null;
    try {
        result = await lendContract.methods
            .acceptLoan(
                loanID,
                externalLiquidateFlag
            ).send( { from : account });
    } catch (error) {
        console.log(error);
    }
}