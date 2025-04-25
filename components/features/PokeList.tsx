import React from 'react'
import PokeCard from '../reutilizables/PokeCard'
import { Pokemon } from '@/ts/interfaces'

interface Props {
    pokemons: Pokemon[];
    }


function PokeList({pokemons} : Props) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
        <h1>POKELISrt</h1>
      {pokemons.map((pokemon) => (
        <PokeCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokeList