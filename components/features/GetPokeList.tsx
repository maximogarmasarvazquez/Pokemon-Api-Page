"use client";

import React, { useEffect, useState } from 'react';
import { getPokemons } from '@/utils/functionGetPokemons';
import { Pokemon } from '@/ts/interfaces';
import PokeList from './PokeList';

interface Props {
  num: number;
}

function GetPokeList( { num }: Props) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const pokemonsPerPage = num ; // 20 pokémon por página
  const totalPokemons = 1002; // Cantidad total de pokémon en la API
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage); // Calculamos las páginas

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const { pokemons } = await getPokemons(page); 
      setPokemons(pokemons); // Reemplaza, no acumula
      setLoading(false);
    };

    fetchPokemons();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Rango de páginas a mostrar (ejemplo, 5 páginas como máximo a la vez)
  const pageRange = 5;
  const startPage = Math.max(1, page - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div className="flex flex-col items-center justify-center">
      <PokeList pokemons={pokemons} />

      {/* Paginación con flechas */}
      <div className="flex gap-2 mt-6 mb-10 flex-wrap justify-center items-center">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 disabled:bg-gray-400 rounded-md bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
        >
          &#8592;
        </button>

        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`px-4 py-2 rounded-md ${
              page === startPage + index
                ? 'bg-blue-500 scale-115 text-white'
                : 'bg-blue-400  text-white'
            }`}
          >
            {startPage + index}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-md disabled:bg-gray-400 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
        >
          &#8594;
        </button>
      </div>

      {loading && <p className="text-center mb-4">Cargando Pokémon...</p>}
    </div>
  );
}

export default GetPokeList;
