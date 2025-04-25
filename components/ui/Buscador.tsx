"use client";

import { useState } from "react";
import GetPokeBusqueda from "../features/GetPokeBusqueda";
import NoResults from "./NoResults";

export default function Buscador() {
  const [name, setName] = useState("");
  const [showResult, setShowResult] = useState(false);


  const handleSearch = () => {
    if (name.trim() !== "") {
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col items-center  p-4">
      {/* Buscador */}
      <div className="w-full max-w-md p-4 rounded-m shadow-md">
        <h1 className="text-2xl font-bold text-center">Buscador de Pokémon</h1>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setShowResult(false);
          }}
          className="border p-2 w-full mt-2"
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2 w-full rounded-md"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {/* Contenedor de resultados con margen superior */}
      <div className=" ">
        {showResult ?  <GetPokeBusqueda name={name} /> : <NoResults />}
      </div>
    </div>
  );
}
