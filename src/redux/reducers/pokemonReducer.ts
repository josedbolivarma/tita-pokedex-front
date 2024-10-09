import { typesPokemons } from '../types/types';

const initialState = {
    loading: true,
    pokemons: [],
    maxItems: 12,
    prevPokemon: [],
    nextPokemon: [],
    types: [],
}

export const pokemonReducer = ( state: any = initialState, action: any )  => {
    switch ( action.type ) {
        case typesPokemons.list:
            return {
                ...state,
                loading: action.payload.loading,
                pokemons: [...action.payload.pokemons],
                maxItems: action.payload.maxItems
            };
        case typesPokemons.types:
            return {
                ...state,
                loading: action.payload.loading,
                types: [...action.payload.types]
            }
        case typesPokemons.search:
            return {
                ...state,
                search: action.payload.search,
                loading: action.payload.loading,
                pokemons: action.payload.pokemons
            };
        case typesPokemons.selectPrevAndNextPokemon:
            return {
                ...state,
                loading: action.payload.loading,
                prevPokemon: action.payload.prevPokemon,
                nextPokemon: action.payload.nextPokemon
            }
        default:
            return state;
    }
}