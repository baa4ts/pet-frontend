import { Eye, PencilSimple, Trash, WarningCircle } from "@phosphor-icons/react";

import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAusenciasHook } from "@/hooks/actions-hooks/useAusenciasHook";

const DashAusencias = () => {
  const { data, isError, isLoading, refetch } = useAusenciasHook();

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      {/* Paginador */}
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
      <Separator />

      <article className={`min-h-0 ${isError ? "flex-1" : "flex-7"}`}>
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Si se esta haciendo el fetch */}
          {isLoading && (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">Cargando...</p>
            </div>
          )}

          {/* Si el fetch fallo */}
          {isError && (
            <div className="flex flex-col items-center justify-center gap-3 p-8 text-center h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <WarningCircle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-sm font-medium">Error al cargar los datos</p>
              <p className="text-xs text-muted-foreground">
                No se pudo obtener la información. Intentá de nuevo.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Reintentar
              </Button>
            </div>
          )}

          {/* Si el fetch fue correcto, pero no hay ausencias */}
          {!isLoading && !isError && data?.data.length === 0 && (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">
                No hay ausencias registradas.
              </p>
            </div>
          )}

          {/* Si todo fue correcto */}
          {!isLoading && !isError && data?.data && data.data.length > 0 && (
            <section className="flex flex-col divide-y divide-border p-5">
              {data.data.map((ausencia) => (
                <article key={ausencia.id} className="flex items-center gap-3 py-3">
                  <span className="w-8 text-sm text-muted-foreground">{ausencia.id}</span>
                  <span className="flex-1 truncate font-medium">{ausencia.materia}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(ausencia.fecha).toLocaleDateString()}
                  </span>
                  <span className="truncate hidden md:block text-sm font-medium">
                    {ausencia.docente.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" disabled>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" disabled>
                      <PencilSimple className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </article>

      {/* Paginador */}
      <Separator />
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
    </section>
  );
};

export default DashAusencias;
