import BigNumber from "bignumber.js";
import Web3 from "web3";

BigNumber.config({
    ROUNDING_MODE: 3,
    DECIMAL_PLACES: 18,
    EXPONENTIAL_AT: [-18, 36],
  });

export const approveCreateLoan = async(
    account,
    ERC20_ABI, 
    LEND_CONTRACT_ADDRESS,
    isBorrower, // Determining which function to call.
    amount, // WVT in case of Borrower creating the loan else SC. (In BigNumber Format)
    wvtAddress,
    scAddress,
) => {
    const web3 = new Web3(Web3.givenProvider);
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
            .approve(LEND_CONTRACT_ADDRESS, amount.toString(10))
            .send({from :account});
    } catch (err) {
        console.log("ERC20 - Approve | Accept Loan Amount ERR: \n", err);
    }
}


export const createLoan = async(
    lendContract,
    account,
    wvtAddress,
    scAddress,
    isBorrower,
    amount,  // WVT in case of Borrower creating the loan else SC. (In BigNumber Format)
    interestRate,
    ltv,
    lt,
    duration, //Number of days in form of seconds
    discount,
    externalLiquidation
) => {
    let result = null;
    try {
        result = await lendContract.methods
            .createLoan(
                wvtAddress,
                scAddress,
                isBorrower,
                amount,
                interestRate,
                ltv,
                lt,
                duration,
                discount,
                externalLiquidation
            ).send( { from : account });
    } catch (error) {
        console.log(error);
    }
}