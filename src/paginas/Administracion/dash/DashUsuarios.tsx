import { Link } from "react-router";

import { PencilSimple, WarningCircle } from "@phosphor-icons/react";

import { EliminarAlgo } from "@/components/dashboard/EliminarAlgo";
import BotonVentana from "@/components/shared/BotonVentana";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEliminar } from "@/hooks/actions-hooks/useEliminar";
import { useUsuariosHook } from "@/hooks/actions-hooks/useUsuariosHook";

const DashUsuarios = () => {
  const { data, isError, isLoading, refetch } = useUsuariosHook();

  const { eliminar } = useEliminar({
    url: "usuarios",
    refetch,
    mensajes: {
      loading: (name) => `Eliminando a ${name}...`,
      success: (name) => `${name} eliminado correctamente`,
      error: (name) => `Error al eliminar a ${name}`,
    },
    redireccion: {
      forbidden: "/sin-permisos?seccion=usuarios",
    },
  });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <Pagination
        total={data?.meta?.total || 0}
        busqueda={true}
        placeholder="Nombre de usuario . . . "
      />
      <Separator />

      {/* Contenedor de tamaño fijo para evitar saltos */}
      <article className="flex-1 min-h-0">
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
                No se pudo obtener la informacion. Intenta de nuevo.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Reintentar
              </Button>
            </div>
          )}

          {/* Si el fetch fue correcto, pero no hay usuarios */}
          {!isLoading && !isError && data?.data.length === 0 && (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">
                No hay usuarios registrados.
              </p>
            </div>
          )}

          {/* Si todo fue correcto */}
          {!isLoading && !isError && data?.data && data.data.length > 0 && (
            <section className="flex flex-col divide-y divide-border p-5">
              {data.data.map((usuario) => (
                <article key={usuario.id} className="flex items-center gap-3 py-3">
                  <span className="flex-1 truncate font-semibold text-base">
                    {usuario.name}
                  </span>
                  <span className="text-sm text-muted-foreground truncate hidden md:block">
                    {usuario.email}
                  </span>
                  <div className="flex items-center gap-1">
                    <BotonVentana url={`/ventanas/usuario/${usuario.id}`} width={500} />

                    {/* Editar */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        to={{
                          pathname: `/nuevo/permisos/${usuario.id}`,
                        }}
                      >
                        <PencilSimple className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Eliminar */}
                    <EliminarAlgo
                      variant="ghost"
                      confirmVariant="destructive"
                      confirmLabel="Eliminar"
                      descripcion={`¿Estas seguro de que queres eliminar al usuario ${usuario.name}?`}
                      onConfirm={() => eliminar(usuario.id, usuario.name)}
                    />
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </article>

      <Separator />
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
    </section>
  );
};

export default DashUsuarios;
