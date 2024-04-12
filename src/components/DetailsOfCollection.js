import React from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";
import { useParams } from "react-router-dom";

const GET_TOKEN_TRANSACTIONS = gql`
  query DetailsOfCollection($id: String!) {
    collection(id: $id) {
      name
      id
      totalSupply
      nftStandard
      trades {
        tokenId
      }
    }
    marketplaces {
      network
      id
    }
  }
`;

function DetailsOfCollection() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.collection) {
    return <p>No collection found</p>;
  }

  const { collection, marketplaces } = data;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Individual Collection</h1>
      <div className="collections-container">
        <div key={collection.id} className="collection-card">
          <button>
            <h2>Name : {collection.name ?? "NA"}</h2>
            <p>ID: {collection.id}</p>
            <p>Total Supply: {collection.totalSupply}</p>
            <p>NFT Standard: {collection.nftStandard}</p>
            <h3>Trades:</h3>
            <ul>
              {collection.trades.map((trade) => (
                <p key={trade.tokenId}>Token ID: {trade.tokenId}</p>
              ))}
            </ul>
          </button>
        </div>
      </div>
      <button>
      <h2>Marketplaces</h2>
      
      <ul>
        {marketplaces.map((marketplace) => (
          <p key={marketplace.id}>Network: {marketplace.network}</p>
        ))}
      </ul>
      </button>
    </div>
  );
}

export default DetailsOfCollection;
