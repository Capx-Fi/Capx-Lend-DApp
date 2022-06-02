import BigNumber from "bignumber.js";
import Web3 from "web3";
import { MASTER_ABI } from "../contracts/Master";
import { hideModal, showModal } from "../redux/features/modalSlice";
// BigNumber.config({
//     ROUNDING_MODE: 3,
//     DECIMAL_PLACES: 18,
//     EXPONENTIAL_AT: [-18, 36],
//   });

export const checkApproveRepaymentLoan = async (
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

  try {
    result = await masterContract.methods.loanRepaymentAmount(loanID).call();
    if (result) {
      approvalAmt = result.toString(10);
    }
  } catch (error) {
    console.log("Master - Fetch Liquidation Amount ERR: \n", error);
  }
  // Approving the tokens
  let approvalResult = null;
  try {
    const erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
    //check approved amount
    let approvedAmount = null;
    try {
      approvedAmount = await erc20Contract.methods
        .allowance(account, LEND_CONTRACT_ADDRESS)
        .call();

      console.log("Approved Amount: ", approvedAmount);
      approvedAmount = new BigNumber(approvedAmount);
      console.log(
        "Approved Amount: ",
        approvedAmount.toString(),
        "amount",
        approvalAmt.toString()
      );
      if (approvedAmount.isGreaterThanOrEqualTo(approvalAmt)) {
        setApproved(true);
      }
    } catch (err) {
      console.log("Create Approval Error", err);
    }
  } catch (err) {
    console.log("ERC20 - Approve | Accept Loan Amount ERR: \n", err);
  }
};

export const approveRepaymentLoan = async (
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
      modalSubtitle: "Please wait while we approve your loan",
    })
  );
  try {
    result = await masterContract.methods.loanRepaymentAmount(loanID).call();
    if (result) {
      approvalAmt = result.toString(10);
    }
  } catch (error) {
    console.log("Master - Fetch Liquidation Amount ERR: \n", error);
  }
  // Approving the tokens
  let approvalResult = null;
  try {
    const erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
    //check approved amount
    let approvedAmount = null;
    try {
      approvedAmount = await erc20Contract.methods
        .allowance(account, LEND_CONTRACT_ADDRESS)
        .call();

      console.log("Approved Amount: ", approvedAmount);
      approvedAmount = new BigNumber(approvedAmount);
      console.log(
        "Approved Amount: ",
        approvedAmount.toString(),
        "amount",
        approvalAmt.toString()
      );
      if (approvedAmount.isGreaterThanOrEqualTo(approvalAmt)) {
        setApproved(true);
        dispatch(
          showModal({
            modalType: "ApproveLoanSuccess",
            modalTitle: "Approved Loan Successfully",
            modalSubtitle: "You can now initiate the loan request",
          })
        );

        setTimeout(() => {
          dispatch(hideModal());
        }, 3000);
      } else {
        approvalResult = await erc20Contract.methods
          .approve(LEND_CONTRACT_ADDRESS, approvalAmt.toString(10))
          .send({ from: account });
      }
      setApproved(true);
      dispatch(
        showModal({
          modalType: "ApproveLoanSuccess",
          modalTitle: "Approved Loan Successfully",
          modalSubtitle: "You can now initiate the loan request",
        })
      );

      setTimeout(() => {
        dispatch(hideModal());
      }, 3000);
    } catch (err) {
      console.log("Create Approval Error", err);
      dispatch(
        showModal({
          modalType: "Error",
          modalTitle: "Error",
          modalSubtitle: "Approval Error",
          closable: false,
        })
      );
      setTimeout(() => {
        dispatch(hideModal());
      }, 3000);
    }
  } catch (err) {
    console.log("ERC20 - Approve | Accept Loan Amount ERR: \n", err);
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
  }
};

export const repaymentLoan = async (
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
      modalType: "RepayLoan",
      modalTitle: "Repaying Loan",
      modalSubtitle: "Please wait while we repay your loan",
    })
  );
  try {
    result = await lendContract.methods
      .repaymentLoan(loanID)
      .send({ from: account });
    setApproved(false);
    dispatch(
      showModal({
        modalType: "RepayLoanSuccess",
        modalTitle: "Repayment Loan Successfully",
        modalSubtitle: "You can now initiate the loan request",
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
        modalTitle: "Error",
        modalSubtitle: "Repayment Error",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};
