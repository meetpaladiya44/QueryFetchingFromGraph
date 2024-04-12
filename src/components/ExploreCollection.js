import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";

const GET_TOKEN_TRANSACTIONS = gql`
  query AllCollections {
    collections {
      name
      id
      totalSupply
    }
  }
`;

function ExploreCollection() {

  const navigate = useNavigate();
  
  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const NFTsOnDifferentEndpoint = (id) => {
    navigate(`/${id}`)
  }

  return (
    <div>
      <h1>Explore Collections</h1>
      <div className="collections-container">
        {data.collections.map((collection) => (
          <button key={collection.id} onClick={() => {NFTsOnDifferentEndpoint(collection.id)}}>
            <div className="collection-card">
              <h2>Name: {collection.name ?? "NA"}</h2>
              <p>ID: {collection.id}</p>
              <p>Total Supply: {collection.totalSupply}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExploreCollection;
