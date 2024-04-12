import React, { useState, useEffect } from "react";
import "../globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "../ApolloClient";
import { useNavigate } from "react-router-dom";

const GET_TOKEN_TRANSACTIONS = gql`
  query MyQuery {
    collections(orderBy: tradeCount) {
      id
      name
      tradeCount
      totalSupply
    }
  }
`;

function ExploreNfts() {
  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });

  const [allNfts, setAllNfts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNftsData = async () => {
      if (data && data.collections) {
        let allNftsData = {};
        for (const collection of data.collections) {
          const response = await fetch(
            `https://sepolia.explorer.mode.network/api/v2/tokens/${collection.id}/instances`
          );
          if (!response.ok) {
            console.error(
              `Failed to fetch NFTs for collection ID ${collection.id}`
            );
            continue;
          }
          const object = await response.json();
          allNftsData[collection.id] = object.items;
        }
        setAllNfts(allNftsData);
      }
    };
    fetchNftsData();
  }, [data]);

  const fetchNFT = (address, id) => {
    navigate(`/${address}/${id}`)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Explore All NFTs</h1>
      {Object.entries(allNfts).map(([collectionId, nfts]) => (
        <div key={collectionId}>
          <div className="collections-container">
            {nfts.map((nft) => (
              <button key={nft.id} className="collection-card" onClick={() => {fetchNFT(nft.token.address, nft.id)}}>
                <div className="nft-card">
                  <img src={`${nft.image_url}`} style={{height: "20%", width: "20%"}} alt="Image not found"/>
                  <h3>Name: {nft.metadata ? nft.metadata.name : "NA"}</h3>
                  <p>ID: {nft.id}</p>
                  <p>Address: {nft.token.address}</p>
                  <p>Description: {nft.metadata ? nft.metadata.description : "NA"}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExploreNfts;
