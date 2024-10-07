import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($offset: Int, $limit: Int) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
    }
    pokemonCount: pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;


export const GET_POKEMONS_BY_SEARCH_NAME = gql`
query GetPokemonBySearch($name: String) {
  pokemon_v2_pokemon(limit: 30, where: { name: { _ilike: $name } }) {
    id
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`

export const GET_POKEMONS_BY_SEARCH_ID = gql`
query GetPokemonBySearch($id: Int) {
  pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
    id
    name
  }
}
`

export const GET_POKEMON_INFO = gql`
  query GetPokemonInfo($name: String!) {
  pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
    id
    name
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`;