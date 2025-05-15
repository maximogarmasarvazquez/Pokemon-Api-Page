"use client";

import React, { useEffect, useState } from "react";
import { getPokemons } from "@/utils/functionGetPokemons";
import { Pokemon } from "@/src/ts/interfaces";
import PokeList from "./PokeList";

interface Props {
  num: number;
}

function GetPokeList({ num }: Props) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const pokemonsPerPage = num; // 20 pokémon por página
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
    if (!loading) setPage(newPage);
  };

  const handleNext = () => {
    if (!loading && page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (!loading && page > 1) {
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
          disabled={page === 1 || loading}
          className={`px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ${
            page === 1 || loading ? "disabled:bg-gray-400 cursor-not-allowed hover:scale-100" : ""
          }`}
        >
          &#8592;
        </button>

        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
          const currentPage = startPage + index;
          return (
            <button
              key={currentPage}
              onClick={() => handlePageChange(currentPage)}
              disabled={loading}
              className={`px-4 py-2 rounded-md ${
                page === currentPage
                  ? "bg-blue-500 scale-115 text-white"
                  : "bg-blue-400 text-white"
              } ${
                loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-500 hover:scale-105"
              }`}
            >
              {currentPage}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={page === totalPages || loading}
          className={`px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ${
            page === totalPages || loading ? "disabled:bg-gray-400 cursor-not-allowed hover:scale-100" : ""
          }`}
        >
          &#8594;
        </button>
      </div>

      {loading && <p className="text-center mb-4">Cargando Pokémon...</p>}
    </div>
  );
}

export default GetPokeList;
