import BigNumber from "bignumber.js";

BigNumber.config({
    ROUNDING_MODE: 3,
    DECIMAL_PLACES: 18,
    EXPONENTIAL_AT: [-18, 36],
  });

export const cancelLoan = async(
    lendContract,
    account,
    loanID
) => {
    let result = null;
    try {
        result = await lendContract.methods
            .cancelLoan(
                loanID
            ).send( { from : account });
    } catch (error) {
        console.log(error);
    }
}