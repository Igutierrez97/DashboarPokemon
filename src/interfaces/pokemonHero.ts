import { PokemonAbility } from "./pokemonAbility";
import { PokemonSprites } from "./pokemonSprites";
import { PokemonType } from "./pokemonType";

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[]; 
  types: PokemonType[]; 
  sprites: PokemonSprites; 
  base_experience: number;
}