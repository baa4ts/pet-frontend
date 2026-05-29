import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { CaretDown, File, UploadSimple, X } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionActualizarNoticia } from "@/actions/dashboard/actionActualizarNoticia";
import { getNoticiaUnica } from "@/actions/dashboard/getNoticiaUnica";
import { actionNuevaNoticia } from "@/actions/nuevo/actionNuevaNoticia";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_API } from "@/configuracion/CONF";

type ArchivoItem = { archivo: globalThis.File; preview: string; esVideo: boolean };

const FORMATOS_VALIDOS = [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm", ".mov"];
const FORMATOS_VIDEO = [".mp4", ".webm", ".mov"];

const NoticiasForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateId = searchParams.get("update");
  const isEditing = !!updateId;
  const [cargando, setCargando] = useState(isEditing);

  const inputRef = useRef<HTMLInputElement>(null);
  const [archivos, setArchivos] = useState<ArchivoItem[]>([]);
  const [ui, setUi] = useState({ open: false, dragging: false });

  const form = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        isEditing ? `Actualizando "${value.titulo}"...` : `Creando "${value.titulo}"...`,
        { position: "top-center" },
      );

      const ok = isEditing
        ? await actionActualizarNoticia(
            Number(updateId),
            value,
            archivos.map((a) => a.archivo),
          )
        : await actionNuevaNoticia(
            value,
            archivos.map((a) => a.archivo),
          );

      if (ok) {
        toast.success(
          isEditing
            ? `"${value.titulo}" actualizada correctamente`
            : `"${value.titulo}" creada correctamente`,
          { id: toastId, position: "top-center" },
        );
        setTimeout(() => navigate("/dashboard/noticias", { replace: true }), 500);
      } else {
        toast.error(
          isEditing
            ? `Error al actualizar "${value.titulo}"`
            : `Error al crear "${value.titulo}"`,
          { id: toastId, position: "top-center" },
        );
      }
    },
  });

  const agregarArchivos = (nuevos: globalThis.File[]) => {
    const validos = nuevos.filter((f) =>
      FORMATOS_VALIDOS.some((ext) => f.name.toLowerCase().endsWith(ext)),
    );
    setArchivos((prev) =>
      [
        ...prev,
        ...validos.map((f) => ({
          archivo: f,
          preview: URL.createObjectURL(f),
          esVideo: FORMATOS_VIDEO.some((ext) => f.name.toLowerCase().endsWith(ext)),
        })),
      ].slice(0, 5),
    );
  };

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    agregarArchivos(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setUi((prev) => ({ ...prev, dragging: false }));
    agregarArchivos(Array.from(e.dataTransfer.files));
  };

  const quitarArchivo = (index: number) => {
    URL.revokeObjectURL(archivos[index].preview);
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Efecto para el update
   */
  useEffect(() => {
    if (!updateId) return;

    /**
     * Si hay una noticia para editar
     */
    getNoticiaUnica(Number(updateId))
      .then(async (res) => {
        /**
         * Si se obtiene la noticia setear los valores
         */
        const noticia = res.data[0];
        form.setFieldValue("titulo", noticia.titulo);
        form.setFieldValue("descripcion", noticia.descripcion);

        if (noticia.recursos.length > 0) {
          /**
           *
           * Convertir las imagenes viejas a file para enviarlas
           *
           */
          const filesExistentes = await Promise.all(
            noticia.recursos.map(async (r) => {
              const url = `${BACKEND_API}/api/static/${r.url}`;
              const response = await fetch(url);
              const blob = await response.blob();
              return new globalThis.File([blob], r.url, { type: blob.type });
            }),
          );

          setArchivos(
            filesExistentes.map((f) => ({
              archivo: f,
              preview: URL.createObjectURL(f),
              esVideo: FORMATOS_VIDEO.some((ext) => f.name.toLowerCase().endsWith(ext)),
            })),
          );
          setUi((prev) => ({ ...prev, open: true }));
        }
      })
      .catch(() => {
        /**
         *
         * Si no se pudo obtener la noticia a editar. redireccion a nueva
         *
         */
        toast.warning("No se encontro la noticia, creando una nueva", {
          position: "top-center",
        });
        navigate("/nuevo/noticias", { replace: true });
      })
      .finally(() => setCargando(false));
  }, [updateId]);

  if (cargando) {
    return (
      <section className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <h1 className="text-2xl">
          {isEditing ? "Editar noticia" : "Crear una nueva noticia"}
        </h1>

        <form.Field
          name="titulo"
          validators={{
            onChange: ({ value }) => (!value ? "El titulo es requerido" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Titulo</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Titulo de la noticia"
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="descripcion"
          validators={{
            onChange: ({ value }) => (!value ? "La descripcion es requerida" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Descripcion</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Descripcion de la noticia"
                rows={3}
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <Collapsible
          open={ui.open}
          onOpenChange={(v) => setUi((prev) => ({ ...prev, open: v }))}
        >
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <File size={16} />
                Archivos
                {archivos.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({archivos.length}/5)
                  </span>
                )}
              </span>
              <CaretDown
                size={16}
                className={`transition-transform duration-200 ${ui.open ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col gap-2 mt-2">
            {archivos.length < 5 && (
              <>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.mp4,.webm,.mov"
                  multiple
                  className="hidden"
                  onChange={handleArchivos}
                />
                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setUi((prev) => ({ ...prev, dragging: true }));
                  }}
                  onDragLeave={() => setUi((prev) => ({ ...prev, dragging: false }))}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 cursor-pointer transition-colors duration-200
                    ${
                      ui.dragging
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-foreground/30 hover:bg-foreground/5 text-muted-foreground"
                    }`}
                >
                  <UploadSimple size={24} />
                  <p className="text-sm">
                    Arrastra archivos o <span className="underline">selecciona</span>
                  </p>
                  <p className="text-xs">JPG, PNG, WEBP, MP4, WEBM, MOV — max. 5</p>
                </div>
              </>
            )}

            {archivos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {archivos.map((item, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-md overflow-hidden border border-border"
                  >
                    {item.esVideo ? (
                      <video
                        src={item.preview}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.preview}
                        alt={`archivo-${i}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => quitarArchivo(i)}
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              {isEditing ? "Guardar cambios" : "Crear noticia"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default NoticiasForm;
