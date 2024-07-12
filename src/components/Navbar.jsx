import React from 'react';
import imagen from "../assets/logoNAV3.png";

const Navbar = () => {
  return (
    
    <nav className="navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="./RickAndMortyCharacters.jsx">
          <img src={imagen} alt="Logo" width="auto" height="60" className="d-inline-block align" />
          <h5 className="d-inline-block align custom-logo">API Rick and Morty</h5>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;