import { useCallback, useEffect, useRef, useState } from "react";

import { WifiSlash, XIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";

import { getNoticiasTelevision } from "@/actions/tv/getNoticiasTelevision";
import { getRecursosTelevision } from "@/actions/tv/getRecursosTelevision";
import { AusenciasTelevision } from "@/components/television/AusenciasTelevision";
import { EventosTelevision } from "@/components/television/EventosTelevision";
import { BACKEND_API } from "@/configuracion/CONF";
import { socket } from "@/configuracion/socket";
import { formatearFecha } from "@/lib/formatearFecha";

// Type guards limpios
const esNoticia = (i: Noticia | Recurso): i is Noticia => "titulo" in i;
const esRecurso = (i: Noticia | Recurso): i is Recurso => !("titulo" in i);

const Televisor = () => {
  const [actual, setActual] = useState(0);
  const [restante, setRestante] = useState(8);
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    data: noticias = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["noticias", "tv"],
    queryFn: getNoticiasTelevision,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const sinNoticias = !isError && noticias.length === 0;

  const { data: recursos = [], refetch: refetchRecursos } = useQuery({
    queryKey: ["recursos", "tv"],
    queryFn: getRecursosTelevision,
    enabled: sinNoticias,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const items: (Noticia | Recurso)[] = noticias.length > 0 ? noticias : recursos;

  const item: Noticia | Recurso | undefined = items[actual];

  // Si el item actual es un video, el intervalo no avanza, espera el onEnded
  const esVideo = item && esRecurso(item) && item.tipo?.startsWith("video/");

  const avanzar = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setActual((prev) => (prev + 1) % items.length);
      setRestante(8);
      setVisible(true);
    }, 400);
  }, [items.length]);

  // Intervalo solo cuando NO es video
  useEffect(() => {
    if (items.length === 0 || esVideo) return;
    const interval = setInterval(avanzar, 8000);
    const countdown = setInterval(() => {
      setRestante((prev) => (prev <= 1 ? 8 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [avanzar, items.length, esVideo]);

  useEffect(() => {
    socket.on("noticias", () => refetch());
    return () => {
      socket.off("noticias");
    };
  }, [refetch]);

  useEffect(() => {
    socket.on("recursos", () => refetchRecursos());
    return () => {
      socket.off("recursos");
    };
  }, [refetchRecursos]);

  // Cuando cambia el item a video, lo reproduce desde el inicio
  useEffect(() => {
    if (esVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [actual, esVideo]);

  return (
    <section className="flex-1 h-screen flex flex-row bg-slate-950 p-2 gap-2">
      <article className="flex-7/10 flex flex-col">
        <div className="flex flex-1 rounded-lg overflow-hidden relative">
          {/* Error */}
          {isError && (
            <div className="w-full h-full flex items-center justify-center gap-2 bg-slate-900">
              <WifiSlash className="text-red-400" size={18} />
              <p className="text-sm text-red-400">Error al cargar noticias</p>
            </div>
          )}

          {/* Sin contenido */}
          {!isError && items.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
              <XIcon size={32} className="text-slate-500" />
              <p className="text-slate-500 text-sm">No hay contenido</p>
            </div>
          )}

          {/* Con items */}
          {!isError && item && (
            <>
              {/* Video */}
              {esVideo ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={`${BACKEND_API}/api/static/` + (item as Recurso).url}
                  autoPlay
                  muted
                  onEnded={avanzar}
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={
                    esNoticia(item)
                      ? `${BACKEND_API}/api/static/` + item.recursos[0]?.url
                      : `${BACKEND_API}/api/static/` + (item as Recurso).url
                  }
                  alt={esNoticia(item) ? item.titulo : ""}
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              {/* Countdown solo si no es video */}
              {!esVideo && (
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded px-3 py-1 text-white text-sm font-mono">
                  {restante}s
                </span>
              )}

              {/* Info solo si es noticia */}
              {esNoticia(item) && (
                <div
                  className="absolute bottom-4 left-4 w-[82%] flex flex-col gap-1.5"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {item.createdAt && formatearFecha(item.createdAt)}
                  </span>
                  <h1 className="text-white text-2xl font-bold leading-tight drop-shadow">
                    {item.titulo}
                  </h1>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {item.descripcion}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {noticias.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === actual ? "bg-white w-4" : "bg-white/30 w-1"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Indicadores para recursos */}
              {esRecurso(item) && recursos.length > 1 && (
                <div
                  className="absolute bottom-4 left-4 flex gap-1"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                >
                  {recursos.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === actual ? "bg-white w-4" : "bg-white/30 w-1"
                      }`}
                    />
                  ))}
                </div>
              )}
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
