export interface Pokemon {
  id: number;
  name: string;
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