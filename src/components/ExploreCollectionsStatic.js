import React, { useState } from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";;

const GET_TOKEN_TRANSACTIONS = gql`
  query AllCollections {
    collections {
      name
      id
      totalSupply
    }
  }
`;

function ExploreCollectionsStatic() {
  const [nfts, setNfts] = useState([]);
  
  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCollectionClick = async (collectionId) => {
    try {
      const response = await fetch(`https://sepolia.explorer.mode.network/api/v2/tokens/${collectionId}/instances`);
      const result = await response.json();
      setNfts(result.items);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  return (
    <div>
      <h1>Explore Collections Statically</h1>
      <div className="collections-container">
        {data.collections.map((collection) => (
          <button key={collection.id} onClick={() => {handleCollectionClick(collection.id)}}>
            <div className="collection-card">
              <h2>Name: {collection.name ?? "NA"}</h2>
              <p>ID: {collection.id}</p>
              <p>Total Supply: {collection.totalSupply}</p>
            </div>
          </button>
        ))}
      </div>
      <h1>NFTs</h1>
      <div className="nfts-container">
        {nfts.map((nft) => (
        <button>
          <div key={nft.id} className="nft-card">
          <img src= {`${nft.image_url}`} style={{height: "20%", width: "20%"}} alt="Image not found"/>
            <h3>Name: {(nft.metadata) ? (nft.metadata.name) : ("Metadata is null")}</h3>
            <p>ID: {nft.id}</p>
            <p>Description: {(nft.metadata) ? (nft.metadata.description) : ("Metadata is null")}</p>
            <p>Owner: {(nft.owner) ? ((nft.owner.name) ? (nft.owner.name) : ("NA")) : "Null"}</p>
            <p>Owner's hash: {(nft.owner) ? (nft.owner.hash) : "Null"}</p>
          </div>
        </button>
        ))}
      </div>
    </div>
  );
}

export default ExploreCollectionsStatic;
