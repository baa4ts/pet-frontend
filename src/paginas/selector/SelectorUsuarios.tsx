import { useSearchParams } from "react-router";

import { WarningCircle } from "@phosphor-icons/react";

import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUsuariosHook } from "@/hooks/actions-hooks/useUsuariosHook";

export const SelectorUsuarios = () => {
  const { data, isError, isLoading, refetch } = useUsuariosHook();
  const [searchParams, setSearchParams] = useSearchParams();

  const seleccionar = (id: string) => {
    window.opener?.postMessage({ docenteId: id }, "*");
    window.close();
  };

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (e.target.value) {
        next.set("query", e.target.value);
      } else {
        next.delete("query");
      }
      next.set("page", "1");
      return next;
    });
  };

  return (
    <section className="flex flex-col h-full w-full">
      {/* Busqueda */}
      <div className="p-3">
        <Input
          placeholder="Nombre de usuario . . ."
          value={searchParams.get("query") ?? ""}
          onChange={handleBusqueda}
        />
      </div>
      <Separator />

      {/* Lista */}
      <article className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex flex-1 items-center justify-center p-8">
            <p className="text-sm text-muted-foreground">Cargando...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-center h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <WarningCircle size={20} className="text-destructive" />
            </div>
            <p className="text-sm font-medium">Error al cargar los datos</p>
            <p className="text-xs text-muted-foreground">
              No se pudo obtener la informacion. Intenta de nuevo.
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Reintentar
            </Button>
          </div>
        )}

        {!isLoading && !isError && data?.data.length === 0 && (
          <div className="flex flex-1 items-center justify-center p-8">
            <p className="text-sm text-muted-foreground">No hay usuarios registrados.</p>
          </div>
        )}

        {!isLoading && !isError && data?.data && data.data.length > 0 && (
          <section className="flex flex-col divide-y divide-border p-3">
            {data.data.map((usuario) => (
              <article key={usuario.id} className="flex items-center gap-3 py-3">
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium truncate">{usuario.name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {usuario.email}
                  </span>
                </div>
                <Button size="sm" onClick={() => seleccionar(usuario.id)}>
                  Seleccionar
                </Button>
              </article>
            ))}
          </section>
        )}
      </article>

      {/* Paginacion */}
      <Separator />
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
    </section>
  );
};
