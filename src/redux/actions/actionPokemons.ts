import { useQuery } from "@apollo/client";
import { typesPokemons } from "../types/types"
import { client, GET_POKEMONS, GET_POKEMONS_BY_SEARCH_ID, GET_POKEMONS_BY_SEARCH_NAME } from "../../graphql";
import { Pokemon } from "../../interfaces/pokemon.interface";

export const getPokemonsAsync = (limit: number, offset: number) => {
    return async (dispatch: any) => {
        try {
            const response = await client.query({query: GET_POKEMONS, variables: {
                limit,
                offset
            }});

            dispatch(getPokemonsSync({
                pokemons: response?.data?.pokemons,
                maxItems: response?.data?.pokemonCount,
                loading: response?.data?.loading
            }));
              
        } catch (error) {
            console.log(error);
        }
    }
}


export const getPokemonsSync = (payload: {pokemons: any, maxItems: number, loading: boolean}) => {
    return {
        type: typesPokemons.list,
        payload
    }
} 

export const selectPrevAndNextPokemonAsync = (id: number) => {
    return async (dispatch: any) => {
       
        try {
            const prevPokemon = await client.query({query: GET_POKEMONS_BY_SEARCH_ID, variables: {
                id: Number(id) - 1
            }});

            const nextPokemon = await client.query({query: GET_POKEMONS_BY_SEARCH_ID, variables: {
                id: Number(id) + 1
            }});
        
            dispatch(selectPrevAndNextPokemonSync({
                loading: prevPokemon?.data?.loading,
                prevPokemon: prevPokemon?.data?.pokemon_v2_pokemon,
                nextPokemon: nextPokemon?.data?.pokemon_v2_pokemon
            }));
              
        } catch (error) {
            console.log(error);
        }
    }
}

export const selectPrevAndNextPokemonSync = (payload: {prevPokemon: Pokemon, nextPokemon: Pokemon, loading: boolean}) => {
    return {
        type: typesPokemons.selectPrevAndNextPokemon,
        payload
    }
}

export const searchByIdAsync = (search: number) => {
    return async (dispatch: any) => {
        
        const variables = {
            id: Number(search)
        };

        try {
            const response = await client.query({query: GET_POKEMONS_BY_SEARCH_ID, variables});
        
            dispatch(searchSync({
                search,
                loading: response?.data?.loading,
                pokemons: response?.data?.pokemon_v2_pokemon
            }));
              
        } catch (error) {
            console.log(error);
        }
    }
}

export const searchByNameAsync = (search: string) => {
    return async (dispatch: any) => {
        
        const variables = {
            name: `%${search}%`
        };

        try {
            const response = await client.query({query: GET_POKEMONS_BY_SEARCH_NAME, variables});
        
            dispatch(searchSync({
                search,
                loading: response?.data?.loading,
                pokemons: response?.data?.pokemon_v2_pokemon
            }));
              
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const searchSync = (payload: {search: string|number, pokemons: any, loading: boolean}) => {
    return {
        type: typesPokemons.search,
        payload
    }
}