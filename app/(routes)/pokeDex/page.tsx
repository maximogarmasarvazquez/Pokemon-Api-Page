import GetPokeList from '@/src/components/features/GetPokeList'
import React from 'react'

function page() {
  return (
    <div className=" mt-30  w-full "> 
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-3xl font-bold ">PokeDex</h1>
      <h2>Lista de Pokemones</h2>
    </div>
      
    <GetPokeList num={20} />
    </div>
  )
}

export default page
