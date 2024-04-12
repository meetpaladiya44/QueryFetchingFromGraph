import React, { useEffect, useState } from "react";
import "../globals.css";
import { useParams } from "react-router-dom";
import DetailsOfNft from "./DetailsOfNft";
import ActivityOfNft from "./ActivityOfNft"

function IndividualNft() {
  const [nfts, setNFTs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to manage visibility
  const [showActivity, setActivity] = useState(false);

  // params hook to destructure address and id from the passed URL(API)
  const { address, id } = useParams();

  useEffect(() => {
    fetch(
      `https://sepolia.explorer.mode.network/api/v2/tokens/${address}/instances/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch NFTs");
        }
        return response.json();
      })
      .then((data) => {
        setNFTs(data);
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
      {/* <PerticularCollection /> */}
      <h2 style={{ textAlign: "center" }}>Individiual NFT</h2>
      <div className="nft-container">
        <button>
          <div className="nft-card">
            <img src={`${nfts.image_url}`} style={{ height: "20%", width: "20%" }} alt="Image not found" />
            <h3>Name: {nfts.metadata ? nfts.metadata.name : "NA"}</h3>
            <p>ID: {nfts.id}</p>
            <p>Address: {nfts.token.address}</p>
            <p>Description: {nfts.metadata ? nfts.metadata.description : "NA"}</p>
          </div>
        </button>
      </div>

      <button onClick={handleDetails}>Details</button>
      {showDetails && <DetailsOfNft />}
      {/* Render DetailsOfCollection if showDetails is true */}

      <button onClick={handleActivity}>Activity</button>
      {showActivity && <ActivityOfNft />}
    </div>
  );
}

export default IndividualNft;
