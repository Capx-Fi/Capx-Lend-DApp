import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import { fetchIfValidWVT } from "./fetchMasterContract";
import { fetchMarketPrice } from "./fetchOracleContract";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 18],
});

export const fetchAllWVTs = async (
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
          .map(async (derivative) =>
                {
              let _marketPrice = await fetchMarketPrice(
                oracleContract,
                derivative?.id
              );
              if (
                (await fetchIfValidWVT(masterContract, derivative?.id)) &&
                _marketPrice
              ) {
                return {
                  asset: derivative.wrappedTokenTicker,
                  assetID: derivative.id,
                  tokenDecimal: project.projectTokenDecimal,
                  marketPrice: _marketPrice.toString(10),
                };
              }
            })
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
