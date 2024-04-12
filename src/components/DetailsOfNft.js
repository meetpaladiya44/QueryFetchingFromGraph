import React, { useEffect, useState } from "react";
import "../globals.css";
import { useParams } from "react-router-dom";

function DetailsOfNft() {
  const [nfts, setNFTs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading... {loading}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Details</h2>
      <div className="nft-container">
        <button>
          <div className="nft-card">
            <img src={`${nfts.image_url}`} style={{ height: "20%", width: "20%" }} alt="Image not found" />
            <h3>Name: {nfts.metadata ? nfts.metadata.name : "NA"}</h3>
            <p>ID: {nfts.id}</p>
            <p>Token_name : {nfts.token.name}</p>
            <p>Token_symbol : {nfts.token.symbol}</p>
            <p>Contract_address : {nfts.token.address}</p>
            <p>Token_standard : {nfts.token.type}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default DetailsOfNft;
