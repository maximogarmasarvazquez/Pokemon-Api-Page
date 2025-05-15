"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/src/ts/interfaces';
import clsx from 'clsx';
import {  StarIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  pokemon: Pokemon;
}

function PokeCard({ pokemon }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };



  return (
    <div className="flex flex-col w-full items-center p-4 m-2 rounded-lg shadow-lg border border-gray-300 sm:w-60 bg-white">
      
      {/* Nombre del Pokémon e ID */}
      <h1 className={clsx("text-xl font-bold flex flex-row", `text-${pokemon.types[0].type.name}`)}>
        <div className='items-start mr-10'>
          <span className="text-gray-500 text-sm">#0{pokemon.id}</span>
        </div>
        <div className='items-end ml-7'>
          {pokemon.nombre}
        </div>
      </h1>

      {/* Imagen */}
      <div className="w-24 h-24 relative">
        <Image
          src={pokemon.imagenes.front_default}
          alt={pokemon.nombre}
          fill
          className="object-contain"
          
        />
      </div>

      {/* Tipos y Favorito */}
      <div className="flex flex-wrap justify-between w-full px-3 mt-3">
        {/* Tipos */}
        <div className="flex flex-col items-start">
          <h2 className="text-sm font-semibold text-gray-600">Tipos</h2>
          <ul className="flex flex-wrap gap-2 mt-1">
            {pokemon.types.map((tipo, index) => (
              <li
                key={index}
                className={clsx("px-3 py-1 rounded-full text-white text-xs", `bg-${tipo.type.name}`)}
              >
                {tipo.type.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de Favorito */}
        <button
          onClick={toggleFavorite}
          className={clsx("self-center border-3 rounded-full p-1 group transition", {
            'border-black': isFavorite,
            'border-gray-400 hover:border-black': !isFavorite,
          })}
        >
          <StarIcon
            className={clsx("h-6 w-6 transition group-hover:text-black", {
              'text-black fill-black': isFavorite,
              'text-gray-400': !isFavorite,
            })}
          />
        </button>
      </div>

      {/* Habilidades */}
      <div className="w-full flex flex-col items-start pl-3 pr-3 mt-3">
        <h2 className="text-sm font-semibold text-gray-600">Habilidades</h2>
        <ul className="text-xs text-gray-700 mt-1 w-full flex flex-wrap justify-start">
          {pokemon.habilidades.map((habilidad, index) => (
            <li key={index} className="bg-gray-400 px-2 py-1 m-1 rounded-md">
              {habilidad.habilidad.nombre}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón Ver más */}
      <Link
        href={`/pokemon/${pokemon.nombre}`}
        className="mt-4 w-full flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Ver más
      </Link>
    </div>
  );
}

export default PokeCard;
