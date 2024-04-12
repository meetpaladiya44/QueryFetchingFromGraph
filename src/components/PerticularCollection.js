import React from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";

const GET_TOKEN_TRANSACTIONS = gql`
  query SingleCollection {
    collection(id: "0x931f2b0c88ca40975c379d1147cb142c6034716c") {
      name
      id
      tradeCount
      totalSupply
    }
  }
`;

function PerticularCollection() {
  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.collection) {
    return <p>No collection found</p>;
  }

  const collection = data.collection;

  return (
    <div style={{textAlign: "center"}}>
      <h1>Individual Collection</h1>
      <div className="collections-container">
        <div key={collection.id} className="collection-card">
          <button>
            <h2>Name : {collection.name ?? "NA"}</h2>
            <p>ID: {collection.id}</p>
            <p>Trade Count: {collection.tradeCount}</p>
            <p>Total Supply: {collection.totalSupply}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerticularCollection;
