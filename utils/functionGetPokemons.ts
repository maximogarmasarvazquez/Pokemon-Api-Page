import axios from 'axios';
import { Pokemon, PokemonAPIResponse } from '@/ts/interfaces';

interface GetPokemonsResponse {
  pokemons: Pokemon[];
  total: number;
}

export async function getPokemons(page: number = 1): Promise<GetPokemonsResponse> {
  try {
    const limit = 20; // 20 pokémon por página
    const offset = (page - 1) * limit;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const results = response.data.results;
    const total = response.data.count; // <- 🔥 Aca capturamos el total de pokémon disponibles

    const detailedPromises = results.map((p: { url: string }) => axios.get<PokemonAPIResponse>(p.url));
    const detailedResponses = await Promise.all(detailedPromises);

    const formattedData: Pokemon[] = detailedResponses.map((res) => {
      const data = res.data;

      return {
        id: data.id,
        nombre: data.name,
        types: data.types,
        imagenes: data.sprites,
        habilidades: data.abilities.map((ability: { ability: { name: string } }) => ({
          habilidad: {
            nombre: ability.ability.name,
          },
        })),
        stats: data.stats.map((stat: { base_stat: number; effort: number; stat: { name: string } }) => ({
          base_stat: stat.base_stat,
          effort: stat.effort,
          stat: {
            nombre: stat.stat.name,
          },
        })),
      };
    });

    return { pokemons: formattedData, total };
  } catch (error) {
    console.error("Error fetching pokemons", error);
    return { pokemons: [], total: 0 };
  }
}
