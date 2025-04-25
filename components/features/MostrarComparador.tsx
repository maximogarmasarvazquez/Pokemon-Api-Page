"use client";

import { useState } from "react";
import { Pokemon } from "@/ts/interfaces";
import GetPokeRandom from "./GetPokeRandom";
import Comparador from "../reutilizables/Comparador";
import { FaArrowsRotate } from "react-icons/fa6";

export default function PokemonComponent() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [key, setKey] = useState(0);

  const handleReload = () => {
    setPokemones([]); // 👈 Resetear la lista para volver a mostrar GetPokeRandom
    setKey(prevKey => prevKey + 1); // Forzar que se remonte con nueva key
  };

  return (
    <div>
      {pokemones.length < 2 ? (
        <GetPokeRandom key={key} cantidad={2} onLoaded={setPokemones} />
      ) : (
        <Comparador Pokemon1={pokemones[0]} Pokemon2={pokemones[1]} />
      )}

      <div className="flex justify-center items-center  mb-4">
        <button
          onClick={handleReload}
          className="bg-[#23313f] hover:bg-[#2c3e50] text-white rounded-full p-3 text-xl shadow-md transition duration-300 ease-in-out"
          title="Recargar Pokémon"
        >
          <FaArrowsRotate />
        </button>
      </div>
    </div>
  );
}
