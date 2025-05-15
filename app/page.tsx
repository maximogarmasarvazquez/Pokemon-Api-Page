import MostrarComparador from "@/src/components/features/MostrarComparador";
import MostrarPokedex from "@/src/components/features/MostrarPokedex";
import Buscador from "@/src/components/ui/Buscador";
import Header from "@/src/components/ui/Header";
import Link from "next/link";

export default function Home() {


  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Buscador />

      <div className="w-full bg-[#435b7d] border-1 my-4 border-white md:h-[600px]">
        <div className="w-full flex bg-amber-50 p-2 items-center justify-center">
          <Link href="/pokeDex" className="w-lg">
            <h2 className="text-2xl text-center font-bold text-[#435b7d]">
              PokeDex
            </h2>
          </Link>
        </div>
        <MostrarPokedex />
      </div>

      <div className="w-full bg-[#435b7d] border-1 my-4 border-white md:min-h-[300px]">
        <div className="w-full flex bg-amber-50 p-2 items-center justify-center">
          <Link href="/comparador" className="w-lg">
            <h2 className="text-2xl text-center font-bold text-[#435b7d]">
              Comparador
            </h2>
          </Link>
        </div>
        <MostrarComparador />
      </div>
    </div>
  );
}
