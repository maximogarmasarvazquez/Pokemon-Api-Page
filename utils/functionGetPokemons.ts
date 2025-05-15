import axios from 'axios';
import { Pokemon, PokemonAPIResponse } from '@/src/ts/interfaces';

interface GetPokemonsResponse {
  pokemons: Pokemon[];
  total: number;
}

export async function getPokemons(page: number = 1, limit: number = 20): Promise<GetPokemonsResponse> {
  try {
    const offset = (page - 1) * limit;

    // Obtenemos la lista básica con nombres y URLs
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const total = data.count;

    // Realizamos todas las peticiones de detalles en paralelo
    const detailResponses = await Promise.all(
      data.results.map((p: { url: string }) => axios.get<PokemonAPIResponse>(p.url))
    );

    // Formateamos la respuesta
    const pokemons: Pokemon[] = detailResponses.map(({ data }) => ({
      id: data.id,
      nombre: data.name,
      types: data.types, // Usa tu interfaz PokemonType completa
      imagenes: {
        front_default: data.sprites.front_default,
      },
      habilidades: data.abilities.map((item: { ability: { name: string } }) => ({
        habilidad: {
          nombre: item.ability.name,
        },
      })),
      stats: data.stats.map((item: { base_stat: number; effort: number; stat: { name: string } }) => ({
        base_stat: item.base_stat,
        effort: item.effort,
        stat: {
          nombre: item.stat.name,
        },
      })),
    }));

    return { pokemons, total };
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return { pokemons: [], total: 0 };
  }
}
