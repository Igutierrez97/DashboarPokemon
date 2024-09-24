"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/guard/Gurad";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; 

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PokemonCard, PokemonAlert } from "../components";
import { Pokemon } from "@/interfaces";
import { Button, Input } from "@/components/ui";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar Pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
        );

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );

        setPokemons(pokemonDetails);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load Pokémon data. Please try again later.");
      }
    };

    if (searchTerm.trim() === "") {
      fetchPokemons();
    }
  }, [page, searchTerm]);

  // Manejo de búsqueda de Pokémon
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      setPokemons([data]);
      setError(null);
      setPage(1);
    } catch (err) {
      console.error(err);
      setError("Pokémon not found. Please try another name.");
    }
  };

  // Define las animaciones
  const pageVariants = {
    initial: { opacity: 0, y: 20 },  // Cambiado para entrar desde abajo
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },  // Cambiado para salir hacia arriba
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl mb-6">Pokémon Dashboard</h1>
        {error && (
          <div className="w-full flex justify-center">
            <PokemonAlert description={error} />
          </div>
        )}
        <div className="mb-4 w-full flex m-3 justify-center">
          <Input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border w-1/3 rounded mr-2"
          />
          <Button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Search
          </Button>
        </div>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            key={page}  // Agregado para que se vuelva a renderizar en cada página
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }} // Ajusta la duración de la animación
          >
            {pokemons.map((pokemon: Pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </motion.div>
        </AnimatePresence>
        {searchTerm.trim() === "" && pokemons.length > 0 && (
          <div className="my-4">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(page - 1)} />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
