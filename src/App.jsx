import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RickAndMortyCharacters from './components/RickAndMortyCharacters';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <RickAndMortyCharacters />
      </div>
      <Footer />
    </div>
  );
}

export default App;