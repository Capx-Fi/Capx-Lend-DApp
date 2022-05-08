import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLiquidationLoans = async (
    account,
    GRAPH_LEND_URL,
    masterContract,
    oracleContract
) => {
  let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
  return allLoans.filter((loan) => {
    if(loan.status === "Defaulted" && loan?.borrowerAddress.toLowerCase() !== account.toLowerCase() && loan?.externalLiquidation ) {
        return loan;
    }
    else if( loan.status === "Defaulted" && loan?.lenderAddress.toLowerCase() === account.toLowerCase()) {
      return loan
    };
  })
}