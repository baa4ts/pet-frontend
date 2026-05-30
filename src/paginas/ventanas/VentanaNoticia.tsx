import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { actionGetNoticiaUnica } from "@/actions/ventanas/actionGetNoticiaUnica";
import { BACKEND_API } from "@/configuracion/CONF";

type Recurso = { url: string; tipo: string | null };
type Noticia = {
  id: number;
  titulo: string;
  descripcion: string;
  createdAt: string;
  userId: string;
  recursos: Recurso[];
};

const esVideo = (tipo: string | null) =>
  !!tipo &&
  (tipo.startsWith("video/") || ["mp4", "webm", "mov"].some((e) => tipo.includes(e)));

const VentanaNoticia = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    actionGetNoticiaUnica(Number(id))
      .then((n) => setNoticia(n as Noticia))
      .catch(() => window.close())
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <p className="text-sm text-slate-500">Cargando...</p>
      </div>
    );
  }

  if (!noticia) return null;

  const recurso = noticia.recursos[0];
  const url = recurso ? `${BACKEND_API}/api/static/${recurso.url}` : null;

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        {url && esVideo(recurso.tipo) ? (
          <video
            src={url}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : url ? (
          <img src={url} className="w-full h-full object-cover" alt={noticia.titulo} />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col gap-2 p-4 bg-slate-900">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          {new Date(noticia.createdAt).toLocaleDateString("es-UY", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <h1 className="text-white text-lg font-bold leading-tight">{noticia.titulo}</h1>
        <p className="text-white/60 text-sm leading-relaxed">{noticia.descripcion}</p>
      </div>
    </div>
  );
};

export default VentanaNoticia;
