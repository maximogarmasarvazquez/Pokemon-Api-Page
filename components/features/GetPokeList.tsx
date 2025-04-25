"use client";

import React, { useEffect, useState } from 'react';
import { getPokemons } from '@/utils/functionGetPokemons';
import { Pokemon } from '@/ts/interfaces';
import PokeList from './PokeList';


interface Props {
    num: number;
    }

function GetPokeList({ num }: Props) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemons(num);
      setPokemons(data);
    };

    fetchPokemons();
  }, []);

  return (
    <>
      { 
        <PokeList pokemons={pokemons} />
        
      }
    </>
  );
}

export default GetPokeList;
