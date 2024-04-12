import React from "react";
import HomePage from "./HomePage";
import ExploreCollection from "./components/ExploreCollection";
import IndividualCollection from "./components/IndividualCollection";
import IndividualCollectionDynamic from "./components/IndividualCollectionDynamic";
import ExploreNftsStatic from "./components/ExploreNftsStatic";
import ExploreCollectionsStatic from "./components/ExploreCollectionsStatic"
import ExploreAllNfts from "./components/ExploreAllNfts";
import IndividualNft from "./components/IndividualNft"
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './index.css'

const Navbar = () => {
  return (
    <Router>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            {/* <NavLink class="navbar-brand" to="/Marketplace">
              NFT Marketplace
            </NavLink> */}
          </div>
          <ul class="nav navbar-nav">
            <li>
              <NavLink className= "active" to="/">Home page</NavLink>
            </li>
            <li>
              <NavLink to="/explore">Explore collection</NavLink>
            </li>
            <li>
              <NavLink to="/individualCollection">Individiual Collection</NavLink>
            </li>
            <li>
              <NavLink to="/allNfts">Explore All NFTs</NavLink>
            </li>
            <li>
              <NavLink to="/nftsStatic">NFT static</NavLink>
            </li>
            <li>
              <NavLink to="/ecStatic">ECStatic</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreCollection />} />
        <Route path="/individualCollection" element={<IndividualCollection />} />
        <Route path="/nftsStatic" element={<ExploreNftsStatic />} />
        <Route path="/explorebtn" element={<ExploreCollection />} />
        <Route path="/ecStatic" element={<ExploreCollectionsStatic />} />
        <Route path="/allNfts" element={<ExploreAllNfts />} />
        <Route path="/:id" element={<IndividualCollectionDynamic />} />
        <Route path="/:address/:id" element={<IndividualNft />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
