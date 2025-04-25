function Header() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[url('/img/fondo.jpg')] bg-cover bg-center bg-no-repeat">
      
      {/* Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Cartel flotante con animación */}
      <div className="relative z-10 px-10 py-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/30 shadow-2xl text-center max-w-lg animate-fade-in transition-transform duration-500 ease-out">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          PokeApi
        </h1>
        <h2 className="text-2xl md:text-3xl mt-4 text-white drop-shadow-md">
          ¡Elige tu Favorito!
        </h2>
      </div>
    </div>
  );
}

export default Header;
