import axios from "axios";
import { Pokemon, PokemonAPIResponse } from "@/src/ts/interfaces";

const concurrencyLimit = 5;

export async function getPokemonsFromEvolutionChain(url: string): Promise<Pokemon[]> {
  try {
    const response = await axios.get(url);
    const evoChain = response.data.chain;

    interface EvolutionChain {
      species: { name: string };
      evolves_to: EvolutionChain[];
    }

    // Recursión optimizada para extraer nombres usando acumulador
    const extractNames = (chain: EvolutionChain, acc: string[] = []): string[] => {
      if (!chain) return acc;
      acc.push(chain.species.name);
      chain.evolves_to.forEach((evo) => extractNames(evo, acc));
      return acc;
    };

    const pokemonNames = extractNames(evoChain);

    // Únicos
    const uniqueNames = Array.from(new Set(pokemonNames));

    // Cache simple en memoria para no repetir llamadas a la misma URL
    const cache = new Map<string, Pokemon>();

    // Función para limitar concurrencia (pool)
    async function asyncPool<T, R>(
      poolLimit: number,
      array: T[],
      iteratorFn: (item: T) => Promise<R>
    ): Promise<R[]> {
      const ret: R[] = [];
      const executing: Promise<void>[] = [];

      for (const item of array) {
        const p = Promise.resolve()
          .then(() => iteratorFn(item).then((res) => ret.push(res)))
          .then(() => {});
        executing.push(p);

        if (executing.length >= poolLimit) {
          await Promise.race(executing);
          // Elimina la primera promesa resuelta para mantener el tamaño del pool
          executing.splice(0, 1);
        }
      }
      await Promise.all(executing);
      return ret;
    }

    // Obtiene datos de un pokemon con cache
    async function fetchPokemon(name: string): Promise<Pokemon> {
      if (cache.has(name)) return cache.get(name)!;

      const res = await axios.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = res.data;

      const formatted: Pokemon = {
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

      cache.set(name, formatted);
      return formatted;
    }

    // Ejecutar con concurrencia limitada
    const formattedData = await asyncPool(concurrencyLimit, uniqueNames, fetchPokemon);

    return formattedData;
  } catch (error) {
    console.error("Error fetching pokemons from evolution chain", error);
    return [];
  }
}
