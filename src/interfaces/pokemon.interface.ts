export interface Pokemon {
  id: number;
  name: string;
  img?: string;
  community?: boolean;
};

export type PokemonCommunity = {
  id: number;
  name: string;
  types: string[];
  generation: number;
  img: string;
  weight: string;
  height: string;
}

export interface PokemonDetailResponse {
  pokemon_v2_pokemon: PokemonDetail[]
}

export interface PokemonDetail {
  id: number;
  name: string;
  pokemon_v2_pokemonstats: PokemonStat[],
  pokemon_v2_pokemontypes: PokemonTypes[],
}

// interface PokemonStats {
//   pokemon_v2_pokemonstats: PokemonStat[]
// }

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: PokemonStatType;
}

interface PokemonStatType {
  name: string;
}

interface PokemonTypes {
  pokemon_v2_type: PokemonType
}

export interface PokemonType {
  name: string;
}
