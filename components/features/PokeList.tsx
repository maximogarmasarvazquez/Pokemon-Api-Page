import React from 'react'
import PokeCard from '../reutilizables/PokeCard'
import { Pokemon } from '@/ts/interfaces'

interface Props {
    pokemons: Pokemon[];
    }


function PokeList({pokemons} : Props) {
  return (
    <div className="grid grid-cols-4 items-center justify-center w-[80%] mx-auto gap-4 mt-10 mb-10">
      {pokemons.map((pokemon) => (
        <PokeCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokeList