import BigNumber from "bignumber.js";
import { hideModal, showModal } from "../redux/features/modalSlice";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const cancelLoan = async (lendContract, account, loanID, dispatch) => {
  dispatch(
    showModal({
      modalType: "CancelLoan",
      modalTitle: "Cancelling Loan",
      modalSubtitle: "Please wait while we cancel your loan",
    })
  );
  let result = null;
  try {
    result = await lendContract.methods
      .cancelLoan(loanID)
      .send({ from: account });
    dispatch(
      showModal({
        modalType: "CancelLoanSuccess",
        modalTitle: "Cancelled Loan Successfully",
        modalSubtitle: "You can now initiate the loan request",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());

      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
    dispatch(
      showModal({
        modalType: "Error",
        modalTitle: "Error",
        modalSubtitle: "Cancellation Error",
        closable: false,
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};
