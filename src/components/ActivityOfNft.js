import React, { useEffect, useState } from "react";
import "../globals.css";
import { useParams } from "react-router-dom";

function ActivityOfNft() {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // params hook to destructure address and id from the passed URL(API)
  const { address, id } = useParams();

  useEffect(() => {
    fetch(
      `https://sepolia.explorer.mode.network/api/v2/tokens/${address}/instances/${id}/transfers`
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

  if (loading) return <p>Loading... {loading}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Activity</h2>
      <div className="nfts-container">
        {nfts.map((nft) => (
        <button>
          <p>Name: {nft.token.name}</p>
          <p>From: {nft.from.hash}</p>
          <p>To: {nft.to.hash}</p>
          <p>Timestamp: {nft.timestamp}</p>
        </button>
        ))}
      </div>
    </div>
  );
}

export default ActivityOfNft;
