import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import { fetchIfValidWVT } from "./fetchMasterContract";
import { fetchMarketPrice } from "./fetchOracleContract";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 18],
});

export const fetchUserWVTs = async (
  account,
  wrappedURL,
  masterContract,
  oracleContract
) => {
  let userHoldings = [];
  const client = new ApolloClient({
    uri: wrappedURL,
    cache: new InMemoryCache(),
  });
  const query = `query{
  projects{
    projectTokenDecimal
    derivatives (where: {wrappedTokenTicker_not_contains:"-NT"}){
        id
    unlockTime
    wrappedTokenTicker
    holders(where: {address:"${account}", tokenAmount_gt:0}) {
      address
      tokenAmount
    }
  }
}
}`;
  try {
    const { data } = await client.query({
      query: gql(query),
    });
    userHoldings = data.projects
      .map((project) =>
        project?.derivatives
          .map((derivative) =>
            derivative.holders.map(async (holder) => {
              let _marketPrice = await fetchMarketPrice(
                oracleContract,
                derivative?.id
              );
              if (
                (await fetchIfValidWVT(masterContract, derivative?.id)) &&
                _marketPrice
              ) {
                let numOfTokens = new BigNumber(holder?.tokenAmount)
                  .dividedBy(Math.pow(10, project.projectTokenDecimal))
                  .toString(10);
                return {
                  asset: derivative.wrappedTokenTicker,
                  assetID: derivative.id,
                  tokenDecimal: project.projectTokenDecimal,
                  quantity: numOfTokens,
                  marketPrice: _marketPrice.toString(10),
                };
              }
            })
          )
          .flat()
      )
      .flat();
    userHoldings = await Promise.all(userHoldings);
    userHoldings = userHoldings.filter((wvt) => {
      if (wvt) {
        return wvt;
      }
    });
  } catch (e) {
    console.log(e);
  }
  return userHoldings;
};
