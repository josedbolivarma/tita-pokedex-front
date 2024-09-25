export interface FavoritePokemon {
    id: number;
    name: string;
  }

// Función para agregar o eliminar un Pokémon de favoritos
const toggleFavorite = (pokemon: FavoritePokemon) => {
    // Obtener la lista de favoritos (array de objetos Pokémon)
    let favorites: FavoritePokemon[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    // Verificar si el Pokémon ya está en favoritos por su ID
    const pokemonExists = favorites.some((fav) => fav.id === pokemon.id);
  
    if (pokemonExists) {
      // Si el Pokémon ya está en favoritos, lo eliminamos
      favorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      // Si no está, lo agregamos a la lista de favoritos
      favorites.push(pokemon);
    }
  
    // Guardar la nueva lista de favoritos en el localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  // Función para verificar si un Pokémon está en favoritos
  const existInFavorites = (id: number): boolean => {
    if (typeof window === 'undefined') return false;
  
    // Obtener la lista de favoritos (array de objetos Pokémon)
    const favorites: FavoritePokemon[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    // Verificar si existe un Pokémon con el mismo ID
    return favorites.some((fav) => fav.id === id);
  };
  
  // Función para obtener la lista completa de Pokémon en favoritos
  const pokemons = (): FavoritePokemon[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  };
  
  export default {
    toggleFavorite,
    existInFavorites,
    pokemons,
  };