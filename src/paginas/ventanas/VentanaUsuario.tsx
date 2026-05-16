import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { actionGetUsuario } from "@/actions/ventanas/actionGetUsuario";

const VentanaUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    actionGetUsuario(id)
      .then(setUsuario)
      .catch(() => window.close())
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!usuario) return null;

  const permisos = usuario.permisos ? usuario.permisos.split(",").filter(Boolean) : [];

  return (
    <div className="flex flex-col gap-4 p-6 h-screen">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-medium">{usuario.name}</h1>
        <p className="text-sm text-muted-foreground">{usuario.email}</p>
      </div>

      <hr className="border-border" />

      {/* Info */}
      <div className="flex flex-col gap-3">
        <div className="rounded-md border border-border p-4 flex flex-col gap-2">
          <p className="text-sm font-medium">Informacion</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ID</span>
            <span className="font-mono text-xs">{usuario.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Creado</span>
            <span>{new Date(usuario.createdAt).toLocaleDateString("es-UY")}</span>
          </div>
        </div>

        {/* Permisos */}
        <div className="rounded-md border border-border p-4 flex flex-col gap-2">
          <p className="text-sm font-medium">Permisos</p>
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
      </div>
    </div>
  );
};

export default VentanaUsuario;
