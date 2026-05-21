import { File, FilePdf, WarningCircle, X } from "@phosphor-icons/react";

import { AgregarAlgo } from "@/components/dashboard/AgregarAlgo";
import { Pagination } from "@/components/shared/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEliminar } from "@/hooks/actions-hooks/useEliminar";
import { useRecursosHook } from "@/hooks/actions-hooks/useRecursosHook";

const STATIC = "http://localhost:3000/api/static/"

const MediaRecurso = ({ recurso }: { recurso: Recurso }) => {
  const url = STATIC + recurso.url
  const tipo = recurso.tipo ?? ""

  if (tipo.startsWith("image/")) {
    return (
      <img
        src={url}
        alt={recurso.url}
        className="w-full h-full object-cover"
      />
    )
  }

  if (tipo.startsWith("video/")) {
    return (
      <video
        src={url}
        className="w-full h-full object-cover"
        muted
        controls
      />
    )
  }

  if (tipo === "application/pdf") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted">
        <FilePdf size={36} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground truncate px-2 max-w-full">
          {recurso.url}
        </span>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted">
      <File size={36} className="text-muted-foreground" />
      <span className="text-xs text-muted-foreground truncate px-2 max-w-full">
        {recurso.url}
      </span>
    </div>
  )
}

const DashRecursos = () => {
  const { data, isError, isLoading, refetch } = useRecursosHook();

  const { eliminar } = useEliminar({
    url: "recursos",
    refetch,
    mensajes: {
      loading: (url) => `Eliminando "${url}"...`,
      success: (url) => `"${url}" eliminado correctamente`,
      error: (url) => `Error al eliminar "${url}"`,
    },
    redireccion: {
      forbidden: "/sin-permisos?seccion=recursos",
    },
  });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
      <Separator />

      <article className="flex-1 min-h-0">
        <div className="h-full flex flex-col overflow-y-auto">

          {/* Cargando */}
          {isLoading && (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">Cargando...</p>
            </div>
          )}

          {/* Error */}
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

          {/* Vacio */}
          {!isLoading && !isError && data?.data.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">
                No hay recursos registrados.
              </p>
              <Button className="m-4" asChild>
                <a href="/nuevo/recursos">Subir un recurso</a>
              </Button>
            </div>
          )}

          {/* Galeria */}
          {!isLoading && !isError && data?.data && data.data.length > 0 && (
            <section className="flex flex-col p-5 gap-4">
              <AgregarAlgo url="/nuevo/recursos" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.data.map((recurso) => (
                  <div
                    key={recurso.id}
                    className="relative group aspect-square rounded-md overflow-hidden border border-border"
                  >
                    {/* Media */}
                    <MediaRecurso recurso={recurso} />

                    {/* Overlay al hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                    {/* Badge tipo */}
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {recurso.tipo ?? "desconocido"}
                    </span>

                    {/* X con confirmacion */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="absolute top-1.5 right-1.5 z-10 bg-black/60 hover:bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                          <X size={14} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Queres eliminar "{recurso.url}"? Esta accion no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => eliminar(recurso.id, recurso.url)}
                            className={buttonVariants({ variant: "destructive" })}
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </article>

      <Separator />
      <Pagination total={data?.meta?.total || 0} busqueda={false} />
    </section>
  );
};

export default DashRecursos;