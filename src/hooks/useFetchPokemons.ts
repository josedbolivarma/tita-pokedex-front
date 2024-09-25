import React, { useEffect, useState } from 'react'

export type PokemonCommunity = {
  id: number;
  name: string;
  types: string[];
  generation: number;
  img: string;
  weight: string;
  height: string;
}

const BASE_URL = "https://tita-pokedex-back-production.up.railway.app"

export const useFetchPokemons = (url: string = "") => {
    const [data, setData] = useState<PokemonCommunity|PokemonCommunity[]|any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/pokemons/${url}`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
  
    useEffect(() => {
        
      getData();
    }, [url]);

    // Función para agregar un nuevo Pokémon (POST)
  const addPokemon = async (pokemon: PokemonCommunity) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon),
      });
      const newPokemon: any = await response.json();
      setData((prevData: PokemonCommunity[]) => [...prevData, newPokemon]); // Actualiza el estado local
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Función para editar un Pokémon (PUT)
  const editPokemon = async (id: number, updatedPokemon: PokemonCommunity) => {
    try {
      const response = await fetch(`${url}/pokemons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPokemon),
      });
      const updated = await response.json();
      setData((prevData: any) =>
        prevData.map((pokemon: any) => (pokemon.id === id ? updated : pokemon))
      );
    } catch (err: any) {
      setError(err?.message);
    }
  };

  // Función para eliminar un Pokémon (DELETE)
  const deletePokemon = async (id: number) => {
    try {
      await fetch(`${url}/pokemons/${id}`, {
        method: 'DELETE',
      });
      setData((prevData: PokemonCommunity[]) => prevData.filter((pokemon: any) => pokemon?.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };


  return {data, addPokemon, editPokemon, deletePokemon, isLoading, error}
}
