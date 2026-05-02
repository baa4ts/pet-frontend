import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { ArrowSquareOut } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionActualizarAusencia } from "@/actions/dashboard/actionActualizarAusencia";
import { getAusenciaUnica } from "@/actions/dashboard/getAusenciaUnica";
import { actionNuevaAusencia } from "@/actions/nuevo/actionNuevaAusencia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const toLocal = (iso: string) => iso.slice(0, 16);

const AusenciasForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateId = searchParams.get("update");
  const isEditing = !!updateId;
  const [cargando, setCargando] = useState(isEditing);

  const form = useForm({
    defaultValues: {
      materia: "",
      fecha: "",
      docenteId: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        isEditing
          ? `Actualizando ausencia de "${value.materia}"...`
          : `Creando ausencia de "${value.materia}"...`,
        { position: "top-center" },
      );

      const ok = isEditing
        ? await actionActualizarAusencia(Number(updateId), value)
        : await actionNuevaAusencia(value);

      if (ok) {
        toast.success(
          isEditing
            ? `Ausencia de "${value.materia}" actualizada correctamente`
            : `Ausencia de "${value.materia}" creada correctamente`,
          { id: toastId, position: "top-center" },
        );
        setTimeout(() => navigate("/dashboard/ausencias", { replace: true }), 500);
      } else {
        toast.error(
          isEditing
            ? `Error al actualizar la ausencia de "${value.materia}"`
            : `Error al crear la ausencia de "${value.materia}"`,
          { id: toastId, position: "top-center" },
        );
      }
    },
  });

  /**
   * Nueva ventana para seleccionar el usuario
   */
  const abrirSelectorDocente = (onChange: (id: string) => void) => {
    window.open("/selector/usuarios", "_blank", "width=500,height=600,left=200,top=100");

    const handler = (e: MessageEvent) => {
      if (e.data?.docenteId) {
        onChange(e.data.docenteId);
        window.removeEventListener("message", handler);
      }
    };
    window.addEventListener("message", handler);
  };

  /**
   * Si hay una noticia para editar
   */
  useEffect(() => {
    if (!updateId) return;

    /**
     * Si hay una noticia para editar
     */
    getAusenciaUnica(Number(updateId))
      .then((res) => {
        /**
         * Si se obtiene la noticia setear los valores
         */
        const ausencia = res.data[0];
        form.setFieldValue("materia", ausencia.materia);
        form.setFieldValue("fecha", toLocal(ausencia.fecha));
        form.setFieldValue("docenteId", ausencia.docenteId);
      })
      .catch(() => {
        /**
         *
         * Si no se pudo obtener la ausencia a editar. redireccion a nueva
         *
         */
        toast.warning("No se encontro la ausencia, creando una nueva", {
          position: "top-center",
        });
        navigate("/nuevo/ausencias", { replace: true });
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
          {isEditing ? "Editar ausencia" : "Crear una nueva ausencia"}
        </h1>

        {/* Materia */}
        <form.Field
          name="materia"
          validators={{
            onChange: ({ value }) => (!value ? "La materia es requerida" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Materia</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Nombre de la materia"
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Fecha de la ausencia */}
        <form.Field
          name="fecha"
          validators={{
            onChange: ({ value }) => (!value ? "La fecha es requerida" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Fecha</Label>
              <Input
                id={field.name}
                type="datetime-local"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* ID del usuario */}
        <form.Field
          name="docenteId"
          validators={{
            onChange: ({ value }) => (!value ? "El docente es requerido" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Docente</Label>
              <div className="flex gap-2">
                <Input
                  id={field.name}
                  value={field.state.value}
                  readOnly
                  placeholder="Selecciona un docente"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => abrirSelectorDocente(field.handleChange)}
                >
                  <ArrowSquareOut size={16} />
                </Button>
              </div>
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              {isEditing ? "Guardar cambios" : "Crear ausencia"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default AusenciasForm;
