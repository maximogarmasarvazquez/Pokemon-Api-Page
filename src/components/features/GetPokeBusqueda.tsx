import NoResults from '@/src/components/ui/NoResults';
import PokeCard from '@/src/components/reutilizables/PokeCard';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon, PokemonAPIResponse } from '../../ts/interfaces'; // Importamos las interfaces

interface Props {
  name: string;
}

function GetPokeBusqueda({ name }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonValid, setPokemonValid] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const data = response.data;

      const pokemonData: Pokemon = {
        id: data.id,
        nombre: data.name,
        types: data.types,
        imagenes: data.sprites,
        habilidades: data.abilities.map((ability) => ({
          habilidad: {
            nombre: ability.ability.name,
          },
        })),
        stats: data.stats.map((stat) => ({
          base_stat: stat.base_stat,
          effort: stat.effort,
          stat: {
            nombre: stat.stat.name,
          },
        })),
      };

      setPokemon(pokemonData);
      setPokemonValid(true);
    } catch (error) {
      console.log('Error al obtener los datos del Pokémon', error);
      setPokemonValid(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchPokemon();
    }
  });

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!pokemonValid || !pokemon) {
    return <NoResults />;
  }

  return (
    <div>
      <PokeCard pokemon={pokemon} />
    </div>
  );
}

export default GetPokeBusqueda;
