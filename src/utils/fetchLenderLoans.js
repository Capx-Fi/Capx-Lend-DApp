import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLenderLoans = async (
    account,
    GRAPH_LEND_URL,
    masterContract,
    oracleContract
) => {
    let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
    let lenderLoans = [];
    const client = new ApolloClient({
        uri: GRAPH_LEND_URL,
        cache: new InMemoryCache(),
    });
    const query = `query {
        nfts (where: {owner : "${account}" }) {
          tokenId
        }
      }`;

    try {
        const {data} = await client.query({
            query: gql(query),
        });
        let loanIDs = []
        loanIDs = data.nfts.map((nft) => {
            return nft.tokenId;
        })
        lenderLoans = allLoans.filter((loan) => {
            if(loanIDs.includes(loan.loanID)) {
                return loan;
            } else if (loan?.lenderAddress.toLowerCase() === account.toLowerCase() && ((loan?.stageOfLoan === "3" && loan?.description === "Loan accepted by lender") || loan?.stageOfLoan === "2")) {
                return loan;
            };
        })
        
    } catch (error) {
        console.log(error);
    }

    return lenderLoans;
}