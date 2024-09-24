import { render, screen } from "@testing-library/react";
import { PokemonCard } from "@/app/components"; 

// Crea un Pokémon de prueba
const mockPokemon = {
  id: 1,
  name: "Bulbasaur",
  height: 7, // Altura en decímetros
  weight: 69, // Peso en hectogramos
  abilities: [
    {
      ability: { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/" },
      is_hidden: false,
      slot: 1,
    },
  ],
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
    {
      slot: 2,
      type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
    },
  ],
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  base_experience: 64, // Experiencia base al derrotar a Bulbasaur
};

describe("PokemonCard", () => {
  // Test principal para verificar que el componente se renderiza correctamente
  it("renders the PokemonCard component", () => {
    render(<PokemonCard pokemon={mockPokemon} />); // Renderiza el componente

    // Verifica que el nombre del Pokémon esté presente
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();  
  });

  // Test adicional para verificar la altura
  it("displays the Pokemon's height", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/Height: 7/i)).toBeInTheDocument();
  });

  // Test adicional para verificar el peso
  it("displays the Pokemon's weight", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/Weight: 69/i)).toBeInTheDocument();
  });
});
