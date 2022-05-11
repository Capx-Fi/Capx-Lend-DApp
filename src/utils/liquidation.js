import BigNumber from "bignumber.js";
import Web3 from "web3";
import { hideModal, showModal } from "../redux/features/modalSlice";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const approveLiquidation = async (
  masterContract,
  account,
  loanID,
  ERC20_ABI,
  LEND_CONTRACT_ADDRESS,
  scAddress,
  setApproved,
  dispatch,
  queryClient,
  from
) => {
  let result = null;
  const web3 = new Web3(Web3.givenProvider);

  // Getting the value to be approved by the user.
  let approvalAmt = null;
  dispatch(
    showModal({
      modalType: "ApproveLoan",
      modalTitle: "Approving Loan",
      modalSubtitle: "Please wait while we approve",
    })
  );
  try {
    result = await masterContract.methods.liquidationAmount(loanID).call();
    if (result) {
      approvalAmt = result["0"].toString(10);
    }
  } catch (error) {
    console.log("Master - Fetch Liquidation Amount ERR: \n", error);
  }

  // Approving the tokens
  let approvalResult = null;
  try {
    const erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
    approvalResult = await erc20Contract.methods
      .approve(LEND_CONTRACT_ADDRESS, approvalAmt)
      .send({ from: account });
    dispatch(
      showModal({
        modalType: "ApproveLoanSuccess",
        modalTitle: "Approval Successfully",
        modalSubtitle: "You can now Liquidate the loan.",
      })
    );
    setApproved(true);
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  } catch (err) {
    dispatch(
      showModal({
        modalType: "Error",
        modalTitle: "Error",
        modalSubtitle: "Approval Error",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
    console.log("ERC20 - Approve | Liquidation Amount ERR: \n", err);
  }
};

export const liquidation = async (
  lendContract,
  account,
  loanID,
  setApproved,
  dispatch,
  queryClient,
  from
) => {
  let result = null;
  dispatch(
    showModal({
      modalType: "LiquidateLoan",
      modalTitle: "Liquidating Loan",
      modalSubtitle: "Please wait while we Liquidate loan.",
    })
  );
  try {
    result = await lendContract.methods
      .liquidation(loanID)
      .send({ from: account });
    setApproved(false);
    dispatch(
      showModal({
        modalType: "LiquidateLoanSuccess",
        modalTitle: "Loan Liquidation Successfully.",
        modalSubtitle: "Redirecting to Liquidation Dashboard.",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
      setTimeout(() => {
        from && queryClient.invalidateQueries(from);
      }, 3000);
    }, 3000);
  } catch (error) {
    dispatch(
      showModal({
        modalType: "Error",
        modalTitle: "Error",
        modalSubtitle: "Liquidation Error",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
    console.log(error);
  }
};
