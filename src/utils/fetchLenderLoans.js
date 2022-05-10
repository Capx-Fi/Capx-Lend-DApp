import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import { fetchLoanDetails } from "./fetchLoanDetails";

export const fetchLenderLoans = async (
    account,
    GRAPH_LEND_URL,
    GRAPH_NFT_URL,
    masterContract,
    oracleContract
) => {
    let allLoans = await fetchLoanDetails(GRAPH_LEND_URL, masterContract, oracleContract);
    let lenderLoans = [];
    const client = new ApolloClient({
        uri: GRAPH_NFT_URL,
        cache: new InMemoryCache(),
    });

    const query = `query {
        nftentities (where: {owner : "${account}" }) {
          tokenid
        }
      }`;

    try {
        const {data} = await client.query({
            query: gql(query),
        });
        let loanIDs = []
        loanIDs = data.nftentities.map((nft) => {
            return nft.tokenid;
        })
        lenderLoans = allLoans.filter((loan) => {
            if(loanIDs.includes(loan.loanID)) {
                return loan;
            } else if (loan?.lenderAddress.toLowerCase() === account.toLowerCase() && loan?.stageOfLoan === "3" && loan?.description === "Loan accepted by lender") {
                return loan;
            };
        })
        
    } catch (error) {
        console.log(error);
    }

    return lenderLoans;
}