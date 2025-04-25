import axios from 'axios';
import { Pokemon, PokemonAPIResponse } from '@/ts/interfaces';

export async function getPokemons(num: number): Promise<Pokemon[]> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${num}`);
    const results = response.data.results;
    console.log("responseve",response);

    console.log("results",results);
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

    return formattedData;
  } catch (error) {
    console.error("Error fetching pokemons", error);
    return [];
  }
}
