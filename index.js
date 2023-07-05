const nombreInput = document.getElementById("nombre");
const btnBuscar = document.getElementById("btn-buscar");
const nombreLabel = document.getElementById("nombre-pokemon");
const tipoLabel = document.getElementById("tipo-pokemon");
const iconoPokemon = document.getElementById("icono-pokemon");

btnBuscar.addEventListener("click", buscarDatosPoke);

function buscarDatosPoke() {
  const nombre = nombreInput.value.toLowerCase(); // Obtener el nombre del Pokémon ingresado en minúsculas
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(respuesta => respuesta.json())
    .then(datos => {
      const nombrePokemon = datos.name;
      const tiposPokemon = datos.types.map(tipo => tipo.type.name).join(", ");
      
      nombreLabel.textContent = `${nombrePokemon}`;
      tipoLabel.textContent = `Tipos:  ${tiposPokemon}`;
      
      // Mostrar el icono del Pokémon
      const iconoPokemonURL = datos.sprites.front_default;
      iconoPokemon.setAttribute("src", iconoPokemonURL);
      iconoPokemon.setAttribute("alt", nombrePokemon);
    })
    .catch(error => {
      console.log('Error al obtener los datos del Pokémon', error);
    });
}
