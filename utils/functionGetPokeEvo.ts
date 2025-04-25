import axios from "axios";
import { Pokemon, PokemonAPIResponse } from "@/ts/interfaces";

export async function getPokemonsFromEvolutionChain(url: string): Promise<Pokemon[]> {
  try {
    const response = await axios.get(url);
    const evoChain = response.data.chain;

    // Función recursiva para recorrer la cadena de evolución
    interface EvolutionChain {
      species: { name: string };
      evolves_to: EvolutionChain[];
    }

    const extractNames = (chain: EvolutionChain, arr: string[] = []): string[] => {
      if (!chain) return arr;

      arr.push(chain.species.name);
      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evo: EvolutionChain) => extractNames(evo, arr));
      }

      return arr;
    };

    const pokemonNames = extractNames(evoChain);

    // Hacer fetch de los detalles como en getPokemons
    const detailedPromises = pokemonNames.map((name) =>
      axios.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );

    const detailedResponses = await Promise.all(detailedPromises);

    const formattedData: Pokemon[] = detailedResponses.map((res) => {
      const data = res.data;

      return {
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
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching pokemons from evolution chain", error);
    return [];
  }
}
