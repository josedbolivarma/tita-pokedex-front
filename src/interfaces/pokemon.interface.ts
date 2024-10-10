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
  height: number;
  weight: number;
  pokemon_v2_pokemonstats: PokemonStat[],
  pokemon_v2_pokemontypes: PokemonTypes[],
  pokemon_v2_pokemonspecy: SpeciesFlavorText,
  pokemon_v2_pokemonmoves: Moves[]
}

interface Moves {
  move: Move,
}

export interface Move {
  name: string;
}

export 

interface SpeciesFlavorText {
  pokemon_v2_pokemonspeciesflavortexts: FlavorText[]
}

export interface FlavorText {
  flavor_text: string;
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
