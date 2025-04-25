import { notFound } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { getPokemonsFromEvolutionChain } from "@/utils/functionGetPokeEvo";
import { Pokemon } from "@/ts/interfaces";
import CarrouselPokeCards from "@/components/reutilizables/CarrouselPokeCards";
import PokeCard from "@/components/reutilizables/PokeCard";


interface Props {
  params: { nombre: string };
}

export default async function page({ params }: Props) {
  const { nombre } = params;

  if (!nombre) return notFound();

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  if (!res.ok) return notFound();
  const data = await res.json();

  const speciesRes = await fetch(data.species.url);
  const species = await speciesRes.json();

  const pokemons: Pokemon[] = await getPokemonsFromEvolutionChain(species.evolution_chain.url);

  return (
    <div className="bg-gray-900 text-white py-8 pt-30 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl border border-gray-700 bg-gray-800 p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <h1 className={clsx("text-4xl font-bold capitalize text-yellow-400")}>
              {data.name}
              <span className="ml-2 text-gray-400 text-lg font-medium">#{data.id}</span>
            </h1>
            <div className="flex gap-2 mt-2">
              {data.types.map((tipo: { type: { name: string } }, index: number) => (
                <span
                  key={index}
                  className={clsx(
                    "px-3 py-1 rounded-full text-white text-xs font-medium",
                    `bg-${tipo.type.name}`
                  )}
                >
                  {tipo.type.name}
                </span>
              ))}
            </div>
          </div>
          <Image
            src={data.sprites.front_default}
            alt={data.name}
            width={120}
            height={120}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Datos físicos */}
        <div className="grid grid-cols-2 gap-4 text-sm text-center">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 font-semibold">Altura</p>
            <p className="text-lg font-bold text-white">{data.height}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 font-semibold">Peso</p>
            <p className="text-lg font-bold text-white">{data.weight}</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div>
          <h2 className="text-xl font-semibold text-gray-300 mb-3">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.stats.map((stat: { stat: { name: string }; base_stat: number }, index: number) => (
              <div key={index} className="bg-gray-700 p-3 rounded-md">
                <span className="capitalize text-gray-200">{stat.stat.name}:</span>{" "}
                <span className="font-bold text-white">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ataques especiales */}
        <div>
          <h2 className="text-xl font-semibold text-gray-300 mb-3">Ataques especiales</h2>
          <div className="flex flex-wrap gap-2">
            {data.moves.slice(0, 6).map((move: { move: { name: string } }, index: number) => (
              <span
                key={index}
                className="bg-blue-500/20 text-blue-300 px-3 py-1 text-xs rounded-full capitalize"
              >
                {move.move.name}
              </span>
            ))}
          </div>
        </div>
        </div>

        {/* Evoluciones */} 
            <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">Evoluciones</h2>
      <div className="w-[90%] flex items-center justify-center mx-auto">
        <div className=" flex items-center p-3 justify-center bg-gray-700 rounded-lg m-4">
          { pokemons.length < 3 ? (
          pokemons.map((pokemon, index) => (
            <div key={index} className="p-2">
            <PokeCard pokemon={pokemon} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-5 h-full">
            <CarrouselPokeCards pokemons={pokemons} />
          </div>
        )
      }
        </div>
      </div>
    </div>
   </div>
    
  );
}
