import { Link } from "react-router";

import { PencilSimple, WarningCircle } from "@phosphor-icons/react";

import { AgregarAlgo } from "@/components/dashboard/AgregarAlgo";
import { EliminarAlgo } from "@/components/dashboard/EliminarAlgo";
import BotonVentana from "@/components/shared/BotonVentana";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEliminar } from "@/hooks/actions-hooks/useEliminar";
import { useNoticiasHook } from "@/hooks/actions-hooks/useNoticiasHook";

const DashNoticias = () => {
  const { data, isError, isLoading, refetch } = useNoticiasHook();

  const { eliminar } = useEliminar({
    url: "noticias",
    refetch,
    mensajes: {
      loading: (titulo) => `Eliminando "${titulo}"...`,
      success: (titulo) => `"${titulo}" eliminada correctamente`,
      error: (titulo) => `Error al eliminar "${titulo}"`,
    },
    redireccion: {
      forbidden: "/sin-permisos?seccion=noticias",
    },
  });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
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

          {/* Si el fetch fue correcto, pero no hay noticias */}
          {!isLoading && !isError && data?.data.length === 0 && (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">
                No hay noticias registradas.
              </p>
            </div>
          )}

          {/* Si todo fue correcto */}
          {!isLoading && !isError && data?.data && data.data.length > 0 && (
            <section className="flex flex-col divide-y divide-border p-5">
              {/* Componente para redigir a la seccion de crear */}
              <AgregarAlgo url="/nuevo/noticias" />

              {data.data.map((noticia) => (
                <article key={noticia.id} className="flex items-center gap-3 py-3">
                  <span className="w-8 text-sm text-muted-foreground">{noticia.id}</span>
                  <span className="flex-1 truncate font-semibold text-base">
                    {noticia.titulo}
                  </span>
                  <span className="text-sm text-muted-foreground truncate hidden md:block">
                    {noticia.descripcion}
                  </span>
                  <span className="text-sm text-muted-foreground hidden lg:block">
                    {new Date(noticia.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <BotonVentana
                      url={`/ventanas/noticia/${noticia.id}`}
                      width={680}
                      height={520}
                    />

                    {/* Editar */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        to={{
                          pathname: "/nuevo/noticias",
                          search: `?update=${noticia.id}`,
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
                      descripcion={`¿Estas seguro de que queres eliminar la noticia "${noticia.titulo}"?`}
                      onConfirm={() => eliminar(noticia.id, noticia.titulo)}
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

export default DashNoticias;
