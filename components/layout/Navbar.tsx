"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HomeIcon, BookOpenIcon, ScaleIcon, HeartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && window.innerWidth >= 768) {
        setShowIcons(false);
        setIsScrolled(true);
      } else {
        setShowIcons(true);
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 transition-all duration-300
     bg-gray-800 text-white shadow-md z-50 ${isScrolled ? 'py-2' : 'py-4'}`}>
      {/* Logo alineado a la izquierda */}
      {!isScrolled && (
        <Image
          src="/PokémonLogo.svg"
          alt="Logo"
          width={130}
          height={130}
          className="rounded-full transition-all duration-300"
        />
      )}

      {/* Contenedor de los links centrados */}
      <div className="flex-1 flex justify-center items-center">
        <ul className="hidden sm:flex space-x-16 text-lg font-semibold">
          <li className="font-semibold">
            <Link href="/" className="flex flex-col items-center transition-transform duration-300 hover:text-yellow-400 hover:translate-y-[-2px]">
              {showIcons && <HomeIcon className="h-5 w-5" />}
              <span>Inicio</span>
            </Link>
          </li>
          <li className="font-semibold">
            <Link href="/pokeDex" className="flex flex-col items-center transition-transform duration-300 hover:text-yellow-400 hover:translate-y-[-2px]">
              {showIcons && <BookOpenIcon className="h-5 w-5" />}
              <span>Pokedex</span>
            </Link>
          </li>
          <li className="font-semibold">
            <Link href="/comparador" className="flex flex-col items-center transition-transform duration-300 hover:text-yellow-400 hover:translate-y-[-2px]">
              {showIcons && <ScaleIcon className="h-5 w-5" />}
              <span>Comparador</span>
            </Link>
          </li>
          <li className="font-semibold">
            <Link href="/favoritos" className="flex flex-col items-center transition-transform duration-300 hover:text-yellow-400 hover:translate-y-[-2px]">
              {showIcons && <HeartIcon className="h-5 w-5" />}
              <span>Favoritos</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Botón de menú para móvil */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden text-white focus:outline-none">
        {/* Icono de menú */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-gray-800 text-white">
          <ul className="space-y-4 text-lg font-semibold p-4">
            {/* Links del menú móvil */}
            <li>
              <Link href="/" className="flex items-center space-x-2">
                <HomeIcon className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link href="/pokedex" className="flex items-center space-x-2">
                <BookOpenIcon className="h-5 w-5" />
                <span>PokeDex</span>
              </Link>
            </li>
            <li>
              <Link href="/comparador" className="flex items-center space-x-2">
                <ScaleIcon className="h-5 w-5" />
                <span>Comparador</span>
              </Link>
            </li>
            <li>
              <Link href="/favoritos" className="flex items-center space-x-2">
                <HeartIcon className="h-5 w-5" />
                <span>Favoritos</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
