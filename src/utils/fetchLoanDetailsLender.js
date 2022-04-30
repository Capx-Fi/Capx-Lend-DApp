import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLoanDetailsLender = async (
    account,
    GRAPH_LEND_URL,
    masterContract,
    oracleContract
) => {
  let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
  return allLoans.filter((loan) => {
    if(loan.stageOfLoan  === "2" ) {
        return loan;
    } else;
  })
}