import React from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";
import { useParams } from "react-router-dom";

const GET_TOKEN_TRANSACTIONS = gql`
  query SingleCollection($id: String!) {
    collection(id: $id) {
      name
      id
      tradeCount
      totalSupply
    }
  }
`;

function PerticularCollectionDynamic() {

  // this is the useParams() hook
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

  const collection = data.collection;

  return (
    <div style={{ textAlign: "center" }}>
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

export default PerticularCollectionDynamic;
