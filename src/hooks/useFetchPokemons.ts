import React, { useEffect, useState } from 'react'
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { PokemonCommunity } from '../interfaces/pokemon.interface';



const BASE_URL = "https://tita-pokedex-back-production.up.railway.app"

export const useFetchPokemons = (url: string = "") => {
    const [data, setData] = useState<PokemonCommunity|PokemonCommunity[]|any>([]);
    const { showConfirm, showSuccess, showError } = useAlert();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

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


  const addPokemon = async (pokemon: PokemonCommunity) => {
  const confirmed = await showConfirm('Are you sure?', 'Do you want to add this new Pokemon?');

  if (!confirmed) return;

  try {
    const response = await fetch(`${BASE_URL}/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });
    const newPokemon = await response.json();
    setData((prevData: PokemonCommunity[]) => [...prevData, newPokemon]); // Actualiza el estado local

    showSuccess('Success!', 'The Pokemon has been added successfully.');
    navigate('/community')
  } catch (err: any) {
    setError(err.message);
    showError('Error!', 'Failed to add the Pokemon. Please try again.');
    navigate('/community')
  }
  };

  const editPokemon = async (id: string, updatedPokemon: PokemonCommunity) => {
  const confirmed = await showConfirm('Are you sure?', 'Do you want to edit this Pokemon?');

  if (!confirmed) return;

  try {
    const response = await fetch(`${BASE_URL}/pokemons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPokemon),
    });
    const updated = await response.json();
    setData((prevData: PokemonCommunity[]) =>
      prevData.map((pokemon: any) => (pokemon.id === id ? updated : pokemon))
    );

    showSuccess('Success!', 'The Pokemon has been updated successfully.');
    navigate('/community');
  } catch (error: any) {
    setError(error?.message);
    showError('Error!', 'Failed to update the Pokemon. Please try again.');
    navigate('/community');
  }
  };

  const deletePokemon = async (id: number) => {
    const confirmed = await showConfirm('Are you sure?', 'Do you want to delete this Pokemon?');
  
    if (!confirmed) return;
  
    try {
      await fetch(`${BASE_URL}/pokemons/${id}`, {
        method: 'DELETE',
      });

      setData((prevData: PokemonCommunity[]) => prevData.filter((pokemon: any) => pokemon.id !== id));
      showSuccess('Deleted!', 'The Pokemon has been removed.');
    } catch (err: any) {
      setError(err.message);
      showError('Error!', 'Failed to delete the Pokemon. Please try again.');
    }
  };


  return {data, addPokemon, editPokemon, deletePokemon, isLoading, error}
}
