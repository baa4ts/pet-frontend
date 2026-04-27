import { getAusenciasTelevision } from '@/actions/tv/getAusenciasTelevision'
import { formatearFecha } from '@/lib/formatearFecha'
import { WifiSlash, XIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

export const AusenciasTelevision = () => {
    const { data: ausencias = [], isError } = useQuery({
        queryKey: ["ausencias", "tv"],
        queryFn: getAusenciasTelevision,
        refetchInterval: 10_000,
        staleTime: 10_000,
    });

    const activo = ausencias.length > 2;

    return (
        <div className="flex-1 bg-white rounded-lg flex flex-col outline-1  outline-amber-300/80 to-border overflow-hidden relative">
            <div className="text-lg font-semibold py-2 px-3 border-b border-gray-200 shrink-0">
                Ausencias
            </div>
            <div className="flex-1 min-h-0 overflow-hidden relative">

                {isError && (
                    <div className="w-full h-full flex items-center justify-center gap-2">
                        <WifiSlash className="text-red-400" size={18} />
                        <p className="text-sm text-red-400">Error al cargar ausencias</p>
                    </div>
                )}

                {!isError && ausencias.length === 0 && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <XIcon size={32} />
                        <p className="text-sm text-gray-800">No hay ausencias</p>
                    </div>
                )}

                {!isError && ausencias.length > 0 && (
                    <div className={cn("p-2 flex flex-col gap-2", activo && "animate-scroll-slow")}>
                        {(activo ? [...ausencias, ...ausencias] : ausencias).map((item, i) => (
                            <div
                                key={`${item.id}-${i}`}
                                className="flex shrink-0 flex-col h-24 bg-blue-400 px-3 justify-center rounded-sm shadow-sm"
                            >
                                <p className="text-lg font-bold text-white leading-tight">{item.docente.name}</p>
                                <p className="text-blue-50 text-sm font-medium">{item.materia}</p>
                                <p className="text-white text-xs mt-1">{formatearFecha(item.fecha)}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};