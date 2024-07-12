import React from "react";


// Componente funcional SearchBar recibe varias props.
// Para manejar la presión de la tecla "Enter" para realizar la búsqueda
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, resetSearch, filters, setFilters, onBack }) => {
    const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


// Manejar cambios en los filtros y actualizar el estado de los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };



  
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Encuentra el nombre de tu personaje favorito..."
        value={searchTerm}
        onChange={(e) => {
          console.log("El término de búsqueda cambió:", e.target.value);
          setSearchTerm(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />

      {/* Contenedor de filtros */}
      <div className="filters-container">
        {/* Filtro de género */}
        <select className="bg-warning text-black" name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Todos los géneros</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Filtro de especie */}
        <select className="bg-warning text-black" name="species" value={filters.species} onChange={handleFilterChange}>
          <option value="">Todas las especies</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Filtro de estado */}
        <select className="bg-warning text-black" name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Todos los estados</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Contenedor de botones */}
      <div className="search-container d-flex justify-content-center">
        <button className="btn btn-primary mt-4" onClick={() => {
          handleSearch();
        }}>
          Buscar
        </button>
        <button className="btn btn-secondary mt-4 ml-4" onClick={() => {
          resetSearch();
          onBack();
        }}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;