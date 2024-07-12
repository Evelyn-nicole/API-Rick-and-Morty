import React from "react";

// Componente funcional CharacterCard recibe dos props: character y onCharacterClick
const CharacterCard = ({ character, onCharacterClick }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
      <div className="card character-card" onClick={() => onCharacterClick(character.id)}>
        <img src={character.image} className="card-img-top" alt={character.name} />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <p className="card-text">Status: {character.status}</p>
          <p className="card-text">Species: {character.species}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
