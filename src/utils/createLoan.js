import BigNumber from "bignumber.js";
import Web3 from "web3";
import { hideModal, showModal } from "../redux/features/modalSlice";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const checkApproveCreateLoan = async (
  account,
  ERC20_ABI,
  LEND_CONTRACT_ADDRESS,
  isBorrower, // Determining which function to call.
  amount, // WVT in case of Borrower creating the loan else SC. (In BigNumber Format)
  wvtAddress,
  scAddress,
  dispatch,
  setApproved
) => {
  const web3 = new Web3(Web3.givenProvider);
  // Approving the tokens
  let approvalResult = null;

  try {
    let erc20Contract = null;

    if (isBorrower) {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, wvtAddress);
    } else {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
    }

    //check approved amount
    let approvedAmount = null;
    try {
      approvedAmount = await erc20Contract.methods
        .allowance(account, LEND_CONTRACT_ADDRESS)
        .call();

      approvedAmount = new BigNumber(approvedAmount);

      if (approvedAmount.isGreaterThanOrEqualTo(amount)) {
        setApproved(true);
      }
    } catch (err) {
      console.log("Create Approval Error", err);
    }
  } catch (err) {
    console.log("ERC20 - Approve | Accept Loan Amount ERR: \n", err);
  }
};

export const approveCreateLoan = async (
  account,
  ERC20_ABI,
  LEND_CONTRACT_ADDRESS,
  isBorrower, // Determining which function to call.
  amount, // WVT in case of Borrower creating the loan else SC. (In BigNumber Format)
  wvtAddress,
  scAddress,
  dispatch,
  setApproved
) => {
  const web3 = new Web3(Web3.givenProvider);
  // Approving the tokens
  let approvalResult = null;
  dispatch(
    showModal({
      modalType: "ApproveLoan",
      modalTitle: "Approving Loan",
      modalSubtitle: "Please wait while we approve your loan",
    })
  );
  try {
    let erc20Contract = null;

    if (isBorrower) {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, wvtAddress);
    } else {
      erc20Contract = new web3.eth.Contract(ERC20_ABI, scAddress);
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
        amount.toString()
      );
      if (approvedAmount.isGreaterThanOrEqualTo(amount)) {
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
          .approve(LEND_CONTRACT_ADDRESS, amount.toString(10))
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
        closable: false,
      })
    );

    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};

export const createLoan = async (
  lendContract,
  account,
  wvtAddress,
  scAddress,
  isBorrower,
  amount, // WVT in case of Borrower creating the loan else SC. (In BigNumber Format)
  interestRate,
  ltv,
  lt,
  duration, //Number of days in form of seconds
  discount,
  externalLiquidation,
  dispatch,
  setApproved,
  history
) => {
  dispatch(
    showModal({
      modalType: "CreateLoanInProgress",
      modalTitle: "Creating Loan",
      modalSubtitle: "Please wait...",
      closable: false,
    })
  );

  let result = null;
  try {
    console.log("Create Loan", lendContract);
    result = await lendContract.methods
      .createLoan(
        wvtAddress,
        scAddress,
        isBorrower,
        amount.toString(10),
        interestRate,
        ltv,
        lt,
        duration,
        100 - discount,
        externalLiquidation
      )
      .send({ from: account });
    dispatch(
      showModal({
        modalType: "CreateLoanSuccess",
        modalTitle: "Loan Created",
        modalSubtitle: "Loan Created Successfully",
        closable: false,
      })
    );
    setApproved(false);
    setTimeout(() => {
      dispatch(hideModal());
      history.push("/");
    }, 3000);
  } catch (error) {
    console.log(error);
    dispatch(
      showModal({
        modalType: "Error",
        modalTitle: "Error",
        modalSubtitle: "Loan Creation Error",
        closable: false,
      })
    );

    setTimeout(() => {
      dispatch(hideModal());
    }, 3000);
  }
};
