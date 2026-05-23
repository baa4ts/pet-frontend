import { WarningCircle } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

import FilaStat from "./FilaStat";

export type Columna = {
  key: keyof QueryStat;
  label: string;
  format?: (v: number) => string;
};

const TablaStats = ({
  data,
  isLoading,
  isError,
  refetch,
  columnas,
}: {
  data: QueryStat[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  columnas: Columna[];
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <WarningCircle className="h-5 w-5 text-destructive" />
        </div>
        <p className="text-sm font-medium">Error al cargar los datos</p>
        <p className="text-xs text-muted-foreground">
          No se pudo obtener la informacion. Intenta de nuevo.
        </p>
        <Button variant="outline" size="sm" onClick={refetch}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">Sin datos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-2">
        <span className="w-6 shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          #
        </span>
        <span className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Query
        </span>
        {columnas.map((col) => (
          <span
            key={col.key}
            className="w-32 shrink-0 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {col.label}
          </span>
        ))}
        <span className="w-3.5 shrink-0" />
      </div>

      {/* Filas */}
      {data.map((stat, i) => (
        <FilaStat key={i} index={i} stat={stat} columnas={columnas} />
      ))}
    </div>
  );
};

export default TablaStats;
