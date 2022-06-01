import BigNumber from "bignumber.js";
import Web3 from "web3";
import { hideModal, showModal } from "../redux/features/modalSlice";
BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const approveAcceptLoan = async (
  masterContract,
  account,
  ERC20_ABI,
  LEND_CONTRACT_ADDRESS,
  loanID,
  isBorrower, // Stable coin amount of loan in case of Borrower accepting the loan else WVT amount of the loan.
  loan,
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
    if (isBorrower) {
      result = await masterContract.methods
        .wvtAmountCalculation(
          new BigNumber(loan?.stableCoinAmt)
            .multipliedBy(Math.pow(10, loan?.stableCoinDecimal))
            .toString(10),
          loan?.collateralAddress,
          loan?.stableCoinAddress,
          new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
          new BigNumber(loan?.discount).multipliedBy(100).toString(10)
        )
        .call();
      if (result) {
        approvalAmt = result.toString(10);
      }
    } else {
      result = await masterContract.methods
        .stablecoinAmountCalculation(
          new BigNumber(loan?.collateralAmt)
            .multipliedBy(Math.pow(10, loan?.collateralDecimal))
            .toString(10),
          loan?.collateralAddress,
          loan?.stableCoinAddress,
          new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
          new BigNumber(100 - loan?.discount).multipliedBy(100).toString(10)
        )
        .call();
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
    if (isBorrower) {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.collateralAddress);
    } else {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.stableCoinAddress);
    }

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

export const checkApproveAcceptLoan = async (
  masterContract,
  account,
  ERC20_ABI,
  LEND_CONTRACT_ADDRESS,
  loanID,
  isBorrower, // Stable coin amount of loan in case of Borrower accepting the loan else WVT amount of the loan.
  loan,
  setApproved,
  dispatch,
  queryClient,
  from
) => {
  let result = null;
  const web3 = new Web3(Web3.givenProvider);
  let approvalAmt = null;

  try {
    if (isBorrower) {
      result = await masterContract.methods
        .wvtAmountCalculation(
          new BigNumber(loan?.stableCoinAmt)
            .multipliedBy(Math.pow(10, loan?.stableCoinDecimal))
            .toString(10),
          loan?.collateralAddress,
          loan?.stableCoinAddress,
          new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
          new BigNumber(loan?.discount).multipliedBy(100).toString(10)
        )
        .call();
      if (result) {
        approvalAmt = result.toString(10);
      }
    } else {
      result = await masterContract.methods
        .stablecoinAmountCalculation(
          new BigNumber(loan?.collateralAmt)
            .multipliedBy(Math.pow(10, loan?.collateralDecimal))
            .toString(10),
          loan?.collateralAddress,
          loan?.stableCoinAddress,
          new BigNumber(loan?.loanToValue).multipliedBy(100).toString(10),
          new BigNumber(100 - loan?.discount).multipliedBy(100).toString(10)
        )
        .call();
      if (result) {
        approvalAmt = result.toString(10);
      }
    }
  } catch (error) {
    console.log("Master - Accept Loan Amount ERR: \n", error);
  }

  try {
    let erc20Contract = null;
    if (isBorrower) {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.collateralAddress);
    } else {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, loan?.stableCoinAddress);
    }

    //check approved amount
    let approvedAmount = null;
    try {
      approvedAmount = await erc20Contract.methods
        .allowance(account, LEND_CONTRACT_ADDRESS)
        .call();
      console.log("Approved Amount - accept : ", approvedAmount);
      approvedAmount = new BigNumber(approvedAmount);

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

export const acceptLoan = async (
  lendContract,
  account,
  loanID,
  externalLiquidateFlag,
  setApproved,
  dispatch,
  queryClient,
  from
) => {
  let result = null;
  console.log(externalLiquidateFlag);
  dispatch(
    showModal({
      modalType: "AcceptLoan",
      modalTitle: "Accepting Loan",
      modalSubtitle: "Please wait while we accept your loan",
    })
  );

  try {
    result = await lendContract.methods
      .acceptLoan(loanID, externalLiquidateFlag)
      .send({ from: account });
    dispatch(
      showModal({
        modalType: "AcceptLoanSuccess",
        modalTitle: "Accepted Loan Successfully",
        modalSubtitle: "You can now initiate the loan request",
      })
    );
    setApproved(false);
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
        modalSubtitle: "Accept Loan Error",
      })
    );
    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};
