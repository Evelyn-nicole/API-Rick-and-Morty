import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import CharacterCard from "./CharacterCard";
import CharacterDetails from "./CharacterDetails";
import SearchBar from "./SearchBar";
import image1 from "../assets/logo1.png";



 // Estados para manejar y almacenar personas, carga de datos, busqueda y filtros.
const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    species: "",
    status: "",
  });


   // Estado para almacenar el caracter seleccionado
  const [selectedCharacter, setSelectedCharacter] = useState(null);


  // URL de la API Rick and Morty
  const resources = {
    characters: "https://rickandmortyapi.com/api/character",
  };


    // Hook useEffect para cargar los personajes al cargar al componente, llama a la funcion
    // fetchCharacters e inicia el proceso asincronico para obtener los datos de la API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(resources.characters);
        console.log("Personajes extraidos de la API:", response.data.results);
        setCharacters(response.data.results); // Almacenamiento de los personajes
        setLoading(false); // Cambia el estado de carga a falso (indica que la carga de datos finalizo)
      } catch (error) {
        console.error("Error al recuperar los datos", error);
        setLoading(false);
      }
    };
 // Llama a la función para obtener personajes
    fetchCharacters(); 
  }, []);


  // Función para manejar la búsqueda de personajes con debounce
  // Debounce retrasa la ejecución de la funcion pasados 300milisegundos
  const handleSearch = useCallback(
    debounce(() => {
      console.log("Buscando:", searchTerm, filters);
      const filteredCharacters = characters.filter((character) => {
        return (
          character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filters.gender
            ? character.gender.toLowerCase() === filters.gender.toLowerCase()
            : true) &&
          (filters.species
            ? character.species.toLowerCase() === filters.species.toLowerCase()
            : true) &&
          (filters.status
            ? character.status.toLowerCase() === filters.status.toLowerCase()
            : true)
        );
      });
      console.log("Personajes Filtrados:", filteredCharacters);// Actualiza la lista de personajes filtrados
      setCharacters(filteredCharacters);
    }, 300),
    [characters, searchTerm, filters] // Dependencias del useCallback
  );

  
  // Función para manejar el clic en un personaje y obtener sus detalles
  const handleCharacterClick = useCallback(async (characterId) => {
    try {
      console.log("Obteniendo detalles del personaje para ID:", characterId);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      console.log("Detalles del personaje obtenidos:", response.data);
      setSelectedCharacter(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles del personaje", error);
    }
  }, []);


  // Función para resetear la búsqueda y volver a cargar los personajes
  const resetSearch = useCallback(async () => {
    console.log("Restablecer la búsqueda...");
    setLoading(true); // Cambia el estado de carga a verdadero
    setSearchTerm(""); // Reinicia el término de búsqueda
    setFilters({
      gender: "",
      species: "",
      status: "",
    }); // Reinicia los filtros
    try {
      const response = await axios.get(resources.characters);
      console.log("Personajes recuperados después del reinicio:", response.data.results);
      setCharacters(response.data.results); // Vuelve a cargar la lista de personajes
      setLoading(false);
    } catch (error) {
      console.error("Error al recuperar los datos", error);
      setLoading(false);
    }
  }, []);


    // Función para actualizar la carga del componente principal
  const handleBack = () => {
    setSelectedCharacter(null); // Resetear
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div>
      <div>
         {/* Logo de la aplicación con función de actualizar el componente principal */}
        <a className="logo-principal p-0" href="#" onClick={handleBack}>
          <img
            src={image1}
            alt="Rick and Morty Logo"
            width="480"
            height="180"
            className="d-block mx-auto"
          />
        </a>
      </div>
      <div className="container-principal">
        <div className="resources-info text-center my-4">
          <p>Actualmente hay tres recursos disponibles:</p>
          <ul className="list-unstyled">
            <li>Personaje: utilizado para obtener todos los personajes.</li>
            <li>Ubicación: utilizado para obtener todas las ubicaciones.</li>
            <li>Episodio: utilizado para obtener todos los episodios.</li>
          </ul>
        </div>


        {/* Componente de búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          resetSearch={resetSearch}
          filters={filters}
          setFilters={setFilters}
          onBack={handleBack}
        />
        {selectedCharacter ? (
          // Muestra los detalles del personaje seleccionado en CharacterDetails
          <CharacterDetails character={selectedCharacter} onBack={handleBack} />
        ) : (
          <div className="row">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onCharacterClick={handleCharacterClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RickAndMortyCharacters;
