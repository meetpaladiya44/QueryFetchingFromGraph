import React, { useState, useEffect } from "react";
import "./globals.css";
import { useQuery, gql } from "@apollo/client";
import client from "./ApolloClient";
import HomePage2 from "./HomePage2";
import { Link, useNavigate } from "react-router-dom";

const GET_TOKEN_TRANSACTIONS = gql`
  query TrendingCollections {
    collections(orderBy: cumulativeTradeVolumeETH, orderDirection: asc) {
      id
      name
      tradeCount
      cumulativeTradeVolumeETH
    }
  }
`;

function HomePage() {
  // defining the hooks at the top of the function
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TOKEN_TRANSACTIONS, {
    client,
  });

  const [collectionImages, setCollectionImages] = useState({});

  useEffect(() => {
    const fetchCollectionImages = async () => {
      if (data && data.collections) {
        const images = {};
        for (const collection of data.collections) {
          const response = await fetch(
            `https://sepolia.explorer.mode.network/api/v2/tokens/${collection.id}`
          );
          const collectionData = await response.json();
          if (collectionData.icon_url) {
            images[collection.id] = collectionData.icon_url;
          }
        }
        setCollectionImages(images);
      }
    };
    fetchCollectionImages();
  }, [data]);

  const handleNavigate = () => {
    navigate('/explorebtn')
  }

  const handleHomePage = (id) => {
    navigate(`${id}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button style={{textAlign: "center"}}><Link to="/explorebtn">Explore Collections using link</Link></button>
      <button onClick={() => {handleNavigate()}}>Explore Collections using hook</button>

      <h1>Trending Collections</h1>
      <div className="collections-container">
        {data.collections.map((collection) => (
          <button key={collection.id} onClick={() => handleHomePage(collection.id)}>
            <div className="collection-card">
              <h2>Name : {collection.name ?? "NA"}</h2>
              <p>ID: {collection.id}</p>
              <p>Trade Count: {collection.tradeCount}</p>
              <p>
                Cumulative Trade Volume: {collection.cumulativeTradeVolumeETH}
              </p>
              {collectionImages[collection.id] ? (
                <img
                  src={collectionImages[collection.id]}
                  alt={collection.name}
                  style={{ width: "100px", height: "100px" }}
                />
              ) : (
                <p>Image not available</p>
              )}
            </div>
          </button>
        ))}
      </div>


      <hr />
      <HomePage2 />
    </div>
  );
};

export default HomePage;
