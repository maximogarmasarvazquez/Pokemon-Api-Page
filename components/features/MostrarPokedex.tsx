"use client";

import { useState } from "react";
import { Pokemon } from "@/ts/interfaces";
import GetPokeRandom from "./GetPokeRandom";
import { FaArrowsRotate } from "react-icons/fa6";
import CarrouselPokeCards from "../reutilizables/CarrouselPokeCards"; // Adjust the path if necessary

function MostrarPokedex() {
const [pokemons, setPokemons] = useState<Pokemon[]>([])
const [key, setKey] = useState(0);

const handleReload = () => {
  setPokemons([]); // 👈 Resetear la lista para volver a mostrar GetPokeRandom
  setKey(prevKey => prevKey + 1); // Forzar que se remonte con nueva key
};
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-full">
                {pokemons.length < 10 ? (
      <GetPokeRandom key={key} cantidad={10} onLoaded={setPokemons} />
    ) : (
         <CarrouselPokeCards pokemons={pokemons}/>
      )}
        </div>
    
      <div className="flex justify-center items-center mb-4">
              <button
                onClick={handleReload}
                className="bg-[#23313f] hover:bg-[#2c3e50] text-white rounded-full p-3 text-xl shadow-md transition duration-300 ease-in-out"
                title="Recargar Pokémon"
              >
                <FaArrowsRotate />
              </button>
            </div>
    </div>
    
  )
}

export default MostrarPokedex