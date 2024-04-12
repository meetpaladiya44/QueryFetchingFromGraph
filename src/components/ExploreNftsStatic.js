import React, { useEffect, useState } from "react";
import "../globals.css";
import { useNavigate } from "react-router-dom";
 
function ExploreNftsStatic() {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  const fetchNFTStatic = (address, id) => {
    navigate(`/${address}/${id}`)
  }

  if (loading) return <p>Loading... {loading}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <PerticularCollection /> */}
      <h2 style={{ textAlign: "center" }}>NFTs of static collection</h2>
      <div className="nft-container">
        {nfts.map((nft) => (
          <button key={nft.id} onClick={() => {fetchNFTStatic(nft.token.address, nft.id)}}>
            <div className="nft-card">
            <img src={`${nft.image_url}`} style={{ height: "20%", width: "20%" }} alt="Image not found" />
              <h3>Name: {nft.metadata ? nft.metadata.name : "NA"}</h3>
              <p>ID: {nft.id}</p>
              <p>Description: {nft.metadata ? nft.metadata.description : "NA"}</p>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}

export default ExploreNftsStatic;
