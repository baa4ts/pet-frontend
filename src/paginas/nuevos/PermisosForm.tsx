import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { actionActualizarPermisosUsuario } from "@/actions/nuevo/actionActualizarPermisosUsuario";
import { actionGetPermisos } from "@/actions/nuevo/actionTraerPermisos";
import { actionGetPermisosUsuario } from "@/actions/nuevo/actionTraerUsuarioPermisos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const BASICOS = ["noticias", "eventos", "ausencias"];

export const PermisosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [disponibles, setDisponibles] = useState<string[]>([]);
  const [nombre, setNombre] = useState<string>("");

  const form = useForm({
    defaultValues: {
      permisos: [] as string[],
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Actualizando permisos...", {
        position: "top-center",
      });

      const ok = await actionActualizarPermisosUsuario(id!, value.permisos);

      if (ok) {
        toast.success("Permisos actualizados", { id: toastId, position: "top-center" });
        setTimeout(() => navigate("/dashboard/usuarios", { replace: true }), 500);
      } else {
        toast.error("Error al actualizar permisos", {
          id: toastId,
          position: "top-center",
        });
      }
    },
  });

  useEffect(() => {
    if (!id) return;

    Promise.all([actionGetPermisos(), actionGetPermisosUsuario(id)])
      .then(([todos, { permisos, nombre }]) => {
        setDisponibles(todos.map(String));
        setNombre(nombre);
        form.setFieldValue("permisos", permisos.map(String));
      })
      .catch(() => {
        toast.error("Error al cargar permisos", { position: "top-center" });
        navigate("/dashboard/usuarios", { replace: true });
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (!id) return <Navigate to="/dashboard/usuarios" replace />;

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
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Permisos del usuario</h1>
          {nombre && <p className="text-sm text-muted-foreground">{nombre}</p>}
        </div>

        {/* Cubo 1 — Permisos actuales */}
        <form.Subscribe selector={(s) => s.values.permisos}>
          {(permisos) => (
            <div className="rounded-md border border-border p-4 flex flex-col gap-3 min-h-24">
              <p className="text-sm font-medium">Permisos actuales</p>
              {permisos.length === 0 ? (
                <p className="text-xs text-muted-foreground">Sin permisos asignados</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {permisos.map((p) => (
                    <span
                      key={p}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary capitalize"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </form.Subscribe>

        {/* Cubo 2 — Asignar permisos */}
        <form.Field name="permisos">
          {(field) => (
            <div className="rounded-md border border-border p-4 flex flex-col gap-3 min-h-24">
              <p className="text-sm font-medium">Asignar permisos</p>
              {disponibles.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <Checkbox
                    id={p}
                    checked={field.state.value.includes(p)}
                    onCheckedChange={(checked) =>
                      field.handleChange(
                        checked
                          ? [...field.state.value, p]
                          : field.state.value.filter((v) => v !== p),
                      )
                    }
                  />
                  <Label htmlFor={p} className="capitalize cursor-pointer">
                    {p}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </form.Field>

        {/* Acciones */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/usuarios")}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.setFieldValue("permisos", [])}
          >
            Limpiar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.setFieldValue("permisos", BASICOS)}
          >
            Basicos
          </Button>
          <form.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
              <Button type="submit" disabled={!canSubmit} className="flex-1">
                Actualizar
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </section>
  );
};
