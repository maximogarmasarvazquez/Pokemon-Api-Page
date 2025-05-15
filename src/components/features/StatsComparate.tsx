import React from 'react';
import { Pokemon } from '@/src/ts/interfaces';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsComparateProps {
  Pokemon1: Pokemon;
  Pokemon2: Pokemon;
}

const StatsComparate: React.FC<StatsComparateProps> = ({ Pokemon1, Pokemon2 }) => {
  const compararStats = () => {
    const difs: { stat: string; diferencia: number; ganador: string }[] = [];
    let totalStat1 = 0;
    let totalStat2 = 0;

    if (!Pokemon1.stats || !Pokemon2.stats) {
      return { ganador: 'Error', diferencias: [], total1: 0, total2: 0 };
    }

    Pokemon1.stats.forEach((stat1) => {
      const statName = stat1.stat.nombre;
      const valor1 = stat1.base_stat;
      const stat2 = Pokemon2.stats.find((s) => s.stat.nombre === statName);
      const valor2 = stat2?.base_stat ?? 0;

      totalStat1 += valor1;
      totalStat2 += valor2;

      if (valor1 > valor2) {
        difs.push({ stat: statName, diferencia: valor1 - valor2, ganador: Pokemon1.nombre });
      } else if (valor2 > valor1) {
        difs.push({ stat: statName, diferencia: valor2 - valor1, ganador: Pokemon2.nombre });
      } else {
        difs.push({ stat: statName, diferencia: 0, ganador: 'Empate' });
      }
    });

    const ganador =
      totalStat1 > totalStat2 ? Pokemon1.nombre : totalStat2 > totalStat1 ? Pokemon2.nombre : 'Empate';

    return { ganador, diferencias: difs, total1: totalStat1, total2: totalStat2 };
  };

  const { ganador, diferencias, total1, total2 } = compararStats();

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
        {ganador === 'Empate' ? '🤝 Empate' : `🏆 Ganador: ${ganador}`}
      </h2>

      {ganador !== 'Error' && (
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
          Total de Stats: <strong>{Pokemon1.nombre}</strong> {total1} vs <strong>{Pokemon2.nombre}</strong> {total2}
        </p>
      )}

      {ganador === 'Error' ? (
        <p className="text-red-500">Hubo un error al comparar las estadísticas de los Pokémon.</p>
      ) : (
        <ul className="space-y-3">
          {diferencias.map((diferencia, index) => {
            if (diferencia.diferencia === 0 || ganador === 'Empate') return null;

            const esGanador = diferencia.ganador === ganador;
            const colorBg = esGanador ? 'bg-green-100 dark:bg-green-800/30' : 'bg-red-100 dark:bg-red-800/30';
            const colorText = esGanador ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';
            const Icono = esGanador ? ArrowUp : ArrowDown;

            return (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-xl shadow-sm ${colorBg}`}
              >
                <span className="font-semibold text-zinc-700 dark:text-zinc-100 capitalize">
                  {diferencia.stat}
                </span>
                <span className={`flex items-center gap-1 font-medium ${colorText}`}>
                  <Icono size={18} />
                  + 
                  {diferencia.diferencia} {diferencia.ganador}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StatsComparate;
