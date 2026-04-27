import { getEventosTelevision } from '@/actions/tv/getEventosTelevision'
import { formatearFecha } from '@/lib/formatearFecha'
import { WifiSlash, XIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const EventosTelevision = () => {
  const [actual, setActual]   = useState(0);
  const [visible, setVisible] = useState(true);
  const [restante, setRestante] = useState(8);

  const { data: eventos = [], isError } = useQuery({
    queryKey: ["eventos", "tv"],
    queryFn: getEventosTelevision,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  const avanzar = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setActual(prev => (prev + 1) % eventos.length);
      setRestante(8);
      setVisible(true);
    }, 400);
  }, [eventos.length]);

  useEffect(() => {
    if (eventos.length === 0) return;
    const interval  = setInterval(avanzar, 8000);
    const countdown = setInterval(() => {
      setRestante(prev => (prev <= 1 ? 8 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [avanzar, eventos.length]);

  return (
    <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden relative outline-1  outline-amber-300/80 to-border">
      <div className="text-lg font-semibold py-2 px-3 border-b border-gray-200 flex items-center justify-between shrink-0">
        <span>Próximo evento</span>
        {!isError && eventos.length > 0 && (
          <span className="text-xs font-mono text-gray-400">{restante}s</span>
        )}
      </div>

      {isError && (
        <div className="flex-1 flex items-center justify-center gap-2">
          <WifiSlash className="text-red-400" size={18} />
          <p className="text-sm text-red-400">Error al cargar eventos</p>
        </div>
      )}

      {!isError && eventos.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <XIcon size={32} />
          <p className="text-sm text-gray-800">No hay eventos</p>
        </div>
      )}

      {!isError && eventos[actual] && (
        <div
          className="flex-1 flex flex-col justify-between p-4 transition-opacity duration-400"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-gray-800">{eventos[actual].nombre}</p>
            <p className="text-sm text-gray-500">{eventos[actual].descripcion}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-blue-500 uppercase tracking-wide">
              {formatearFecha(eventos[actual].fechaInicio.toString())}
            </p>
            {/* Indicadores */}
            <div className="flex gap-1">
              {eventos.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i === actual ? "bg-blue-400 w-4" : "bg-gray-200 w-1"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};