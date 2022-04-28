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
    isBorrower, // Determining which function to call.
    amount, // Stable coin amount of loan in case of Borrower accepting the loan else WVT amount of the loan.
    wvtAddress,
    scAddress,
    ltv,
    discount
) => {
    let result = null;
    const web3 = new Web3(Web3.givenProvider);
    // Getting the value to be approved by the user.
    let approvalAmt = null;
    try {
        if(isBorrower){
            result = await masterContract.methods
                .wvtAmountCalculation(
                    amount,
                    wvtAddress,
                    scAddress,
                    ltv,
                    discount
                ).call();
            if (result) {
                approvalAmt = result.toString(10);
            }
        } else {
            result = await masterContract.methods
                .stablecoinAmountCalculation(
                    amount,
                    wvtAddress,
                    scAddress,
                    ltv,
                    discount
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
            erc20Contract = new web3.eth.Contract(ERC20_ABI, wvtAddress);
        } else {
            erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
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