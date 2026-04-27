import { getNoticiasTelevision } from "@/actions/tv/getNoticiasTelevision";
import { formatearFecha } from "@/lib/formatearFecha";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { WifiSlash, XIcon } from "@phosphor-icons/react";
import { EventosTelevision } from "@/components/television/EventosTelevision";
import { AusenciasTelevision } from "@/components/television/AusenciasTelevision";
import { Menusito } from "@/components/television/menusito";
const Televisor = () => {
  const [actual, setActual] = useState(0);
  const [restante, setRestante] = useState(8);
  const [visible, setVisible] = useState(true);

  const { data: noticias = [], isError } = useQuery({
    queryKey: ["noticias", "tv"],
    queryFn: getNoticiasTelevision,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  const avanzar = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setActual(prev => (prev + 1) % noticias.length);
      setRestante(8);
      setVisible(true);
    }, 400);
  }, [noticias.length]);

  useEffect(() => {
    if (noticias.length === 0) return;
    const interval = setInterval(avanzar, 8000);
    const countdown = setInterval(() => {
      setRestante(prev => (prev <= 1 ? 8 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [avanzar, noticias.length]);

  const noticia = noticias[actual];

  return (
    <section className="relative flex-1 h-screen flex flex-row overflow-hidden bg-linear-to-tl from-indigo-900 via-blue-400 to-slate-200">
     <Menusito/>

      {/* Noticia principal */}
      <article className="flex-7/10 flex flex-col z-0">
        <div className=" flex flex-1 overflow-hidden relativeborder-slate-500 border-b-slate-300 border-r-slate-300 rounded-lg m-4">

          {/* Error */}
          {isError && (
            <div className="w-full h-full flex items-center justify-center gap-2 bg-slate-900">
              <WifiSlash className="text-red-400" size={18} />
              <p className="text-sm text-red-400">Error al cargar noticias</p>
            </div>
          )}

          {/* Sin noticias */}
          {!isError && noticias.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
              <XIcon size={32} className="text-slate-500" />
              <p className="text-slate-500 text-sm">No hay noticias</p>
            </div>
          )}

          {/* Con noticias */}
          {!isError && noticia && (
            <>
              <img
                className="w-full h-full object-cover"
                src={"http://localhost:3000/api/static/" + noticia.recursos[0]?.url}
                alt={noticia.titulo}
                style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              {/* Countdown */}
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded px-3 py-1 text-white text-sm font-mono">
                {restante}s
              </span>

              {/* Info */}
              <div
                className="absolute bottom-4 left-4 w-[82%] flex flex-col gap-1.5"
                style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                  {formatearFecha(noticia.createdAt)}
                </span>
                <h1 className="text-white text-2xl font-bold leading-tight drop-shadow">
                  {noticia.titulo}
                </h1>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                  {noticia.descripcion}
                </p>

                {/* Indicadores */}
                <div className="flex gap-1 mt-1">
                  {noticias.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${i === actual ? "bg-white w-4" : "bg-white/30 w-1"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </article>

      {/* Columna derecha */}
      <article className="flex-3/10 flex flex-col gap-2">
        <AusenciasTelevision />
        <EventosTelevision />
      </article>

    </section>
  );
};

export default Televisor;