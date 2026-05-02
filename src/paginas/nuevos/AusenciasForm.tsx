import { useNavigate } from "react-router";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionNuevaAusencia } from "@/actions/nuevo/actionNuevaAusencia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AusenciasForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      materia: "",
      fecha: "",
      docenteId: "",
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading(`Creando ausencia de "${value.materia}"...`);
      const ok = await actionNuevaAusencia(value);

      if (ok) {
        toast.success(`Ausencia de "${value.materia}" creada correctamente`, {
          id,
          position: "top-center",
        });
        setTimeout(() => navigate("/dashboard/ausencias", { replace: true }), 1000);
      } else {
        toast.error(`Error al crear la ausencia de "${value.materia}"`, { id });
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
        <h1 className="text-2xl">Crear una nueva ausencia</h1>

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

        {/* Fecha */}
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

        {/* Docente ID */}
        <form.Field
          name="docenteId"
          validators={{
            onChange: ({ value }) =>
              !value ? "El ID del docente es requerido" : undefined,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>ID del docente</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="ID del docente"
              />
              {field.state.meta.errors[0] && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(s) => s.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit}>
              Crear ausencia
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default AusenciasForm;
