import { WifiSlash, XIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from "react";

import { getNoticias } from "@/actions/Noticias.action";
import { formatearFecha } from "@/helpers/formatearFecha";

export const SeccionNoticias = () => {
  const [actual, setActual] = useState(0);
  const [restante, setRestante] = useState(5);
  const [visible, setVisible] = useState(true);

  // Query
  const { data: noticias = [], isError } = useQuery({
    queryKey: ["noticias-tv"],
    queryFn: getNoticias,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  // Avanza a la siguiente noticia con fade
  const avanzar = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setActual(prev => (prev + 1) % noticias.length);
      setRestante(5);
      setVisible(true);
    }, 400);
  }, [noticias.length]);

  // Intervalo de rotacion y countdown
  useEffect(() => {
    if (noticias.length === 0) return;

    const interval = setInterval(avanzar, 5000);

    const countdown = setInterval(() => {
      setRestante(prev => (prev <= 1 ? 5 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [avanzar, noticias.length]);

  return (
    <article className="flex-4 min-h-0 border-2 border-slate-500 border-b-slate-300 border-r-slate-300 rounded-sm m-4">

      {/* Si hay error se muestra */}
      {isError && (
        <div className="w-full h-full flex items-center justify-center rounded gap-2 bg-zinc-900">
          <WifiSlash className="text-red-400" size={18} />
          <p className="text-sm text-red-400">Error al cargar noticias</p>
        </div>
      )}

      {/* Si no hay noticias */}
      {!isError && noticias.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center rounded bg-zinc-900">
          <XIcon size={32} className="text-zinc-500" />
          <p className="text-zinc-500 text-sm">No hay noticias</p>
        </div>
      )}

      {/* Si hay noticias */}
      {!isError && noticias[actual] && (
        <div className="w-full h-full overflow-hidden bg-zinc-900 rounded relative">
          <img
            alt=""
            className="w-full h-full object-contain"
            src={"http://localhost:3000/static/" + noticias[actual].recursos[0].resource}
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms' }}
          />
          <span
            className="absolute bottom-4 left-4 right-4 z-50 flex flex-col gap-1 bg-black/60 backdrop-blur-sm rounded p-3"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms' }}
          >
            <div className="flex flex-row items-baseline gap-4">
              <h1 className="text-white text-2xl font-bold flex-1/2">{noticias[actual].titulo}</h1>
              <p className="text-zinc-300 text-sm flex-1/2 flex items-center justify-end pr-5">
                {formatearFecha(noticias[actual].publicado.toString())}
              </p>
            </div>
            <p className="text-zinc-300 text-sm">{noticias[actual].descripcion}</p>
          </span>

          <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded px-3 py-1 text-white text-sm font-mono">
            {restante}s
          </span>
        </div>
      )}
    </article>
  );
};