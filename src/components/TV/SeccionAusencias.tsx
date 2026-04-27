import { WifiSlash, XIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";

import { getAusencias } from "@/actions/Ausencias.action";
import { formatearFecha } from "@/helpers/formatearFecha";
import { cn } from "@/lib/utils";

export const SeccionAusencias = () => {
  // Query
  const { data: ausencias = [], isError } = useQuery({
    queryKey: ["ausencias-tv"],
    queryFn: getAusencias,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  const activo = ausencias.length > 2;

  return (
    <article className="flex-1 bg-white rounded shadow-sm outline-1  outline-amber-300/80 flex flex-col overflow-hidden">
      <div className="text-lg font-semibold py-2 px-3 border-b border-gray-200">
        Ausencias
      </div>

      <div className="overflow-hidden h-full relative">

        {/* Si hay error se muestra */}
        {isError && (
          <div className="w-full h-full flex items-center justify-center gap-2">
            <WifiSlash className="text-red-400" size={18} />
            <p className="text-sm text-red-400">Error al cargar ausencias</p>
          </div>
        )}

        {/* Si no hay ausencias */}
        {!isError && ausencias.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <XIcon size={32} />
            <p className="text-sm text-gray-800">No hay ausencias</p>
          </div>
        )}

        {/* Si hay ausencias */}
        {!isError && ausencias.length > 0 && (
          <div className={cn("p-2 flex flex-col gap-2", activo && "animate-scroll")}>
            {(activo ? [...ausencias, ...ausencias] : ausencias).map((item, i) => (
              <div
                className="flex shrink-0 flex-col h-24 bg-blue-400 px-3 justify-center rounded-sm shadow-sm hover:shadow-md transition"
                key={`${item.id}-${i}`}
              >
                <p className="text-lg font-bold text-white leading-tight">{item.docente.name}</p>
                <p className="text-blue-50 text-sm font-medium">{item.materia}</p>
                <p className="text-white text-xs mt-1">{formatearFecha(item.creado.toString())}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </article>
  );
};