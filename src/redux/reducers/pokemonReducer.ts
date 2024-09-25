import { typesPokemons } from '../types/types';

const initialState = {
    loading: true,
    pokemons: []
}

export const pokemonReducer = ( state: any = initialState, action: any )  => {
    switch ( action.type ) {
        case typesPokemons.list:
            return {
                ...state,
                loading: action.payload.loading,
                pokemons: [...action.payload.pokemons]
            };
        case typesPokemons.search:
            return {
                ...state,
                search: action.payload.search,
                loading: action.payload.loading,
                pokemons: action.payload.pokemons
            };
        default:
            return state;
    }
}