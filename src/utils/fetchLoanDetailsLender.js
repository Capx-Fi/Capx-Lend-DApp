import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLoanDetailsLender = async (
    account,
    GRAPH_LEND_URL,
    masterContract,
    oracleContract
) => {
  console.log("Account",account);
  let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
  return allLoans.filter((loan) => {
    if(loan.stageOfLoan  === "2" ) {
        return loan;
    } else;
  })
}