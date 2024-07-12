import React from "react";


// Componente para mostrar los detalles de un personaje
const CharacterDetails = ({ character, onBack }) => {
  return (
    <div className="character-details">
      <div className="card">
        <img
          src={character.image}
          className="card-img-top"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <p className="card-text">Status: {character.status}</p>
          <p className="card-text">Species: {character.species}</p>
          <p className="card-text">Gender: {character.gender}</p>

          {/* Si existe una ubicación, mostrarla */}
          {character.location && (
            <p className="card-text">
              Location:{" "}
              <a
                href={character.location.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {character.location.name}
              </a>
            </p>
          )}

          {/* Si hay episodios, mostrarlos */}
          {character.episode && (
            <p className="card-text">
              Episodes:{" "}
              {character.episode.map((episode, index) => (
                <span key={index}>
                  <a href={episode} target="_blank" rel="noopener noreferrer">
                    Episode {episode.split("/").pop()}
                  </a>

                  {/* Agrega una coma entre episodios, excepto el último */}
                  {index !== character.episode.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}

          {/* Botón para volver al componente principal RickAndMortyCharacters */}
          <div className="text-center">
            <button className="btn btn-danger mt-4" onClick={onBack}>
              Volver a Personajes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
