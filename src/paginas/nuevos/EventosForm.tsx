import { useNavigate } from "react-router";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionNuevoEvento } from "@/actions/nuevo/actionNuevoEvento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EventosForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: null as string | null,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading(`Creando "${value.nombre}"...`, {
        position: "top-center",
      });
      const ok = await actionNuevoEvento(value);

      if (ok) {
        toast.success(`"${value.nombre}" creado correctamente`, {
          id,
          position: "top-center",
        });
        setTimeout(() => navigate("/dashboard/eventos", { replace: true }), 1000);
      } else {
        toast.error(`Error al crear "${value.nombre}"`, { id, position: "top-center" });
      }
    },
  });

  return (
    <section className="flex items-center justify-center h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <h1 className="text-2xl">Crear un nuevo evento</h1>

        {/* Nombre */}
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

        {/* Descripcion */}
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

        {/* Fecha inicio */}
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

        {/* Fecha fin */}
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
              Crear evento
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default EventosForm;
