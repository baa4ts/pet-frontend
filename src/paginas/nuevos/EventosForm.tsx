import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionActualizarEvento } from "@/actions/dashboard/actualizarEventos";
import { getEventoUnico } from "@/actions/dashboard/getEventoUnico";
import { actionNuevoEvento } from "@/actions/nuevo/actionNuevoEvento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const toLocal = (iso: string) => iso.slice(0, 16);

const EventosForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateId = searchParams.get("update");
  const isEditing = !!updateId;
  const [cargando, setCargando] = useState(isEditing);

  const form = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: null as string | null,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        isEditing ? `Actualizando "${value.nombre}"...` : `Creando "${value.nombre}"...`,
        { position: "top-center" },
      );

      const ok = isEditing
        ? await actionActualizarEvento(Number(updateId), value)
        : await actionNuevoEvento(value);

      if (ok) {
        toast.success(
          isEditing
            ? `"${value.nombre}" actualizado correctamente`
            : `"${value.nombre}" creado correctamente`,
          { id: toastId, position: "top-center" },
        );
        setTimeout(() => navigate("/dashboard/eventos", { replace: true }), 500);
      } else {
        toast.error(
          isEditing
            ? `Error al actualizar "${value.nombre}"`
            : `Error al crear "${value.nombre}"`,
          { id: toastId, position: "top-center" },
        );
      }
    },
  });

  /**
   * Si hay un evento para editar
   */
  useEffect(() => {
    if (!updateId) return;

    /**
     * Si hay un evento para editar
     */
    getEventoUnico(Number(updateId))
      .then((res) => {
        /**
         * Si se obtiene la noticia setear los valores
         */
        const evento = res.data[0];
        form.setFieldValue("nombre", evento.nombre);
        form.setFieldValue("descripcion", evento.descripcion);
        form.setFieldValue("fechaInicio", toLocal(evento.fechaInicio));
        form.setFieldValue("fechaFin", evento.fechaFin ? toLocal(evento.fechaFin) : null);
      })
      .catch(() => {
        /**
         *
         * Si no se pudo obtener el evento a editar. redireccion a nueva
         *
         */
        toast.warning("No se encontro el evento, creando uno nuevo", {
          position: "top-center",
        });
        navigate("/nuevo/eventos", { replace: true });
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
          {isEditing ? "Editar evento" : "Crear un nuevo evento"}
        </h1>

        {/* Nombre del evento */}
        <form.Field
          name="nombre"
          validators={{
            onChange: ({ value }) => (!value ? "El nombre es requerido" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Nombre</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Nombre del evento"
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Descripcion del evento */}
        <form.Field name="descripcion">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Descripcion</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Descripcion del evento"
                rows={3}
              />
            </div>
          )}
        </form.Field>

        {/* Fecha de inicio */}
        <form.Field
          name="fechaInicio"
          validators={{
            onChange: ({ value }) =>
              !value ? "La fecha de inicio es requerida" : undefined,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Fecha de inicio</Label>
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

        {/* Fecha de finalizacion */}
        <form.Field name="fechaFin">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>
                Fecha de fin{" "}
                <span className="text-muted-foreground font-normal">(opcional)</span>
              </Label>
              <Input
                id={field.name}
                type="datetime-local"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              {isEditing ? "Guardar cambios" : "Crear evento"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default EventosForm;
