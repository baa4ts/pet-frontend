import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { X } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionNuevaNoticia } from "@/actions/nuevo/actionNuevaNoticia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NoticiasForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [archivos, setArchivos] = useState<File[]>([]);

  const form = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading(`Creando "${value.titulo}"...`);
      const ok = await actionNuevaNoticia(value, archivos);

      if (ok) {
        toast.success(`"${value.titulo}" creada correctamente`, {
          id,
          position: "top-center",
        });
        setTimeout(() => navigate("/dashboard/noticias", { replace: true }), 1000);
      } else {
        toast.error(`Error al crear "${value.titulo}"`, { id });
      }
    },
  });

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = Array.from(e.target.files ?? []);
    setArchivos((prev) => [...prev, ...nuevos].slice(0, 5));
    e.target.value = "";
  };

  const quitarArchivo = (index: number) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex items-center justify-center h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <h1 className="text-2xl">Crear una nueva noticia</h1>

        {/* Titulo */}
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

        {/* Descripcion */}
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

        {/* Archivos */}
        <div className="flex flex-col gap-1.5">
          <Label>
            Imagenes{" "}
            <span className="text-muted-foreground font-normal">(opcional, max. 5)</span>
          </Label>

          {archivos.length > 0 && (
            <div className="flex flex-col gap-1">
              {archivos.map((archivo, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 truncate text-muted-foreground">
                    {archivo.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => quitarArchivo(i)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {archivos.length < 5 && (
            <>
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                multiple
                className="hidden"
                onChange={handleArchivos}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                Seleccionar imagenes
              </Button>
            </>
          )}
        </div>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              Crear noticia
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default NoticiasForm;
