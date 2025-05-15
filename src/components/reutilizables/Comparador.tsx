import { Pokemon } from '@/src/ts/interfaces';
import { useState } from 'react';
import PokeCard from './PokeCard';
import StatsComparate from '../features/StatsComparate';

interface ComparadorProps {
  Pokemon1: Pokemon;
  Pokemon2: Pokemon;
}

function Comparador({ Pokemon1, Pokemon2 }: ComparadorProps) {
  const [comparar, setComparar] = useState(false);


  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        {/* Pokémon 1 */}
        <PokeCard pokemon={Pokemon1} />

        {/* Controles */}
        <div className="flex flex-col items-center gap-4">
          {/* Botón de comparar */}
          <button
            onClick={() => setComparar(!comparar)}
            className="bg-[#23313f] hover:bg-[#2c3e50] text-white font-medium rounded-xl px-6 py-3 shadow-lg transition-all duration-300"
          >
            {comparar ? 'Ocultar' : 'Comparar'}
          </button>

         
          {/* Resultados */}
          {comparar && (
            <div className="w-full max-w-md animate-fade-in-up">
              <StatsComparate Pokemon1={Pokemon1} Pokemon2={Pokemon2} />
            </div>
          )}
        </div>

        {/* Pokémon 2 */}
        <PokeCard pokemon={Pokemon2} />
      </div>
    </div>
  );
}

export default Comparador;
