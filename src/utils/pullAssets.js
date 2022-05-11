import BigNumber from "bignumber.js";
import { hideModal, showModal } from "../redux/features/modalSlice";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const pullAssets = async (
  lendContract,
  account,
  loanID,
  dispatch,
  queryClient,
  from
) => {
  dispatch(
    showModal({
      modalType: "Claim",
      modalTitle: "Claiming Assets...",
      modalSubtitle: "Please do not refresh or close this page",
      closable: false,
    })
  );
  let result = null;
  try {
    result = await lendContract.methods
      .pullAssets(loanID)
      .send({ from: account });

    dispatch(
      showModal({
        modalType: "ClaimSuccess",
        modalTitle: "Successfully Claimed Assets",
        modalSubtitle: "Asstes claimed successfully",
        closable: false,
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
      setTimeout(() => {
        from && queryClient.invalidateQueries(from);
      }, 3000);
    }, 3000);
  } catch (error) {
    console.log(error);
    dispatch(
      showModal({
        modalType: "Error",
        modalTitle: "Error Claiming Assets",
        modalSubtitle: "Could not fetch your assets",
        closable: false,
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};

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
