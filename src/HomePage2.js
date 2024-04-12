import "./globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "./ApolloClient";

const GET_TOKEN_TRANSACTIONS = gql`
  query TopCollections {
    collections(orderBy: totalRevenueETH, orderDirection: asc) {
      id
      name
      tradeCount
      totalRevenueETH
    }
  }
`;

function HomePage2() {

  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });

  if (data) {
    console.log(data);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Top Collections</h1>
      <div className="collections-container">
        {data.collections.map((collection) => (
          <button>
            <div key={collection.id} className="collection-card">
              <h2>Name : {collection.name ?? "NA"}</h2>
              <p>ID: {collection.id}</p>
              <p>Trade Count: {collection.tradeCount}</p>
              <p>Total Revenue ETH: {collection.totalRevenueETH}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
export default HomePage2;
