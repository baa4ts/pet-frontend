import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { actionGetNoticiaUnica } from "@/actions/ventanas/actionGetNoticiaUnica";

const VentanaNoticia = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    actionGetNoticiaUnica(Number(id))
      .then(setNoticia)
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

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      {/* Imagen */}
      <div className="relative flex-1 overflow-hidden">
        {noticia.recursos[0]?.url ? (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:3000/api/static/${noticia.recursos[0].url}`}
            alt={noticia.titulo}
          />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Info */}
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

        {/* Miniaturas */}
        {noticia.recursos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pt-1">
            {noticia.recursos.map((r, i) => (
              <img
                key={i}
                src={`http://localhost:3000/api/static/${r.url}`}
                className="h-12 w-12 rounded-md object-cover flex-shrink-0 border border-white/10"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VentanaNoticia;
