import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLoanDetailsBorrower = async (
    account,
    GRAPH_LEND_URL,
    masterContract,
    oracleContract
) => {
  console.log("Account", account);
  let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
  return allLoans.filter((loan) => {
    if(loan.stageOfLoan  === "1" && loan.lenderAddress.toLowerCase() !== account.toLowerCase() ) {
        return loan;
    } else;
  })
}