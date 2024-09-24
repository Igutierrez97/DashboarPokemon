import NextImage from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { Pokemon } from "@/interfaces";

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => (
  <Card>
    <CardHeader>
      <CardTitle>{pokemon.name.toUpperCase()}</CardTitle>
    </CardHeader>
    <CardContent>
      <NextImage src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
    </CardContent>
    <CardFooter>
      <div className="flex flex-col">
        <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type(s): {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      </div>
      
    </CardFooter>
  </Card>
);
