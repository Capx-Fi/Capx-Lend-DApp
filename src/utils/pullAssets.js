import BigNumber from "bignumber.js";

BigNumber.config({
    ROUNDING_MODE: 3,
    DECIMAL_PLACES: 18,
    EXPONENTIAL_AT: [-18, 36],
  });

export const pullAssets = async(
    lendContract,
    account,
    loanID
) => {
    let result = null;
    try {
        result = await lendContract.methods
            .pullAssets(
                loanID
            ).send( { from : account });
    } catch (error) {
        console.log(error);
    }
}

// export const pullAssets = async (
//     lendContract,
//     account,
//     loanID,
//     setWithdrawModalOpen,
//     setWithdrawModalStatus,
//     setButtonDisabled,
//     enqueueSnackbar
// ) => {
//   setWithdrawModalOpen(true);

//   let result = null;

//   try {
//     result = await lendContract.methods
//             .pullAssets(
//                 loanID
//             ).send( { from : account });
//     if (result) {
//       setWithdrawModalStatus("success");
//       enqueueSnackbar("Transaction Successful", { variant: "success" });
//     } else {
//       setWithdrawModalStatus("failure");
//       enqueueSnackbar("Sorry transaction failed", { variant: "error" });
//       setButtonDisabled(false);
//     }
//   } catch (err) {
//     setWithdrawModalStatus("failure");
//     enqueueSnackbar(err.message, { variant: "error" });
//     setButtonDisabled(false);
//   }
//   setTimeout(() => {
//     setWithdrawModalOpen(false);
//     setWithdrawModalStatus("");
//   }, 2500);
// };
