"use client";
import { useEffect } from "react";
import { Pokemon, PokemonAPIResponse } from "@/ts/interfaces";

interface Props {
  cantidad: number;
  onLoaded: (pokemones: Pokemon[]) => void;
}

const getPokemonData = async (id: number): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: PokemonAPIResponse = await res.json();

  // Adaptamos el resultado a nuestro modelo interno `Pokemon`
  return {
    id: data.id,
    nombre: data.name,
    types: data.types,
    imagenes: {
      front_default: data.sprites.front_default,
      back_default: data.sprites.back_default,
      back_female: data.sprites.back_female,
      back_shiny: data.sprites.back_shiny,
    },
    habilidades: data.abilities.map((item) => ({
      habilidad: {
        nombre: item.ability.name,
      },
    })),
    stats: data.stats.map((stat) => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: {
          nombre: stat.stat.name, // mapeo correcto
        },
      }))
      
  };
};

export default function GetPokeRandom({ cantidad, onLoaded }: Props) {
  useEffect(() => {
    const fetchPokemons = async () => {
      const ids = new Set<number>();

      while (ids.size < cantidad) {
        ids.add(Math.floor(Math.random() * 151) + 1);
      }

      const data = await Promise.all(
        Array.from(ids).map((id) => getPokemonData(id))
      );
      onLoaded(data);
    };

    fetchPokemons();
  }, [cantidad, onLoaded]);

  return <p className="text-white">Cargando pokemones...</p>;
}
