import React, { useEffect, useState } from "react";
import "../globals.css";
import PerticularCollection from "./PerticularCollection";
import DetailsOfCollection from "./DetailsOfCollection";
import ActivityOfCollection from "./ActivityOfCollection";

function IndividualCollection() {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to manage visibility
  const [showActivity, setActivity] = useState(false);

  useEffect(() => {
    fetch(
      "https://sepolia.explorer.mode.network/api/v2/tokens/0x931f2b0c88ca40975c379d1147cb142c6034716c/instances"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch NFTs");
        }
        return response.json();
      })
      .then((data) => {
        setNFTs(data.items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDetails = () => {
    setShowDetails(true); // Show details when button is clicked
  };

  const handleActivity = () => {
    setActivity(true); // Show activities when button is clicked
  };

  if (loading) return <p>Loading... {loading}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <PerticularCollection />
      <h2 style={{ textAlign: "center" }}>NFTs</h2>
      <div className="nft-container">
        {nfts.map((nft) => (
          <button key={nft.id}>
            <div className="nft-card">
              {/* here button is not required coz data is already looking good */}
              <img src= {`${nft.image_url}`} style={{height: "20%", width: "20%"}} alt="Image not found"/>
              <h3>Name: {(nft.metadata) ? (nft.metadata.name) : ("Metadata is null")}</h3>
              <p>ID: {nft.id}</p>
              <p>Description: {(nft.metadata) ? (nft.metadata.description) : ("Metadata is null")}</p>
              <p>Owner: {nft.owner.name ?? "Null"}</p>
              <p>Owner's address: {nft.owner.hash}</p>
            </div>
          </button>
        ))}
      </div>

      <button onClick={handleDetails}>Details</button>
      {showDetails && <DetailsOfCollection />}
      {/* Render DetailsOfCollection if showDetails is true */}

      <button onClick={handleActivity}>Activities</button>
      {showActivity && <ActivityOfCollection />}
    </div>
  );
}

export default IndividualCollection;
