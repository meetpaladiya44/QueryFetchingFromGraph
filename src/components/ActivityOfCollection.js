import React from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";
import { useParams } from "react-router-dom";

const GET_TOKEN_TRANSACTIONS = gql`
  query ActivityOfCollection($id: String!) {
    collection(id: $id) {
      name
      id
      tradeCount
      trades {
        buyer
        seller
        priceETH
        timestamp
        transactionHash
        tokenId
        id
        amount
      }
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

  const { collection } = data;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Individual Collection</h1>
      <div className="collections-container">
        <div key={collection.id} className="collection-card">
          <button>
            <h2>Name : {collection.name ?? "NA"}</h2>
            <p>ID: {collection.id}</p>
            <p>Trade Count: {collection.tradeCount}</p>
            <h3>Trades:</h3>
            <ul>
              {collection.trades.map((trade) => (
                <p key={trade.id}>
                  <p>Buyer: {trade.buyer}</p>
                  <p>Seller: {trade.seller}</p>
                  <p>Price ETH: {trade.priceETH}</p>
                  <p>Timestamp: {trade.timestamp}</p>
                  <p>Transaction Hash: {trade.transactionHash}</p>
                  <p>Token ID: {trade.tokenId}</p>
                  <p>Amount: {trade.amount}</p>
                </p>
              ))}
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsOfCollection;
