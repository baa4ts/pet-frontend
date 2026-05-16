import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { actionGetAusenciaUnica } from "@/actions/ventanas/actionGetAusenciaUnica";
import { formatearFecha } from "@/lib/formatearFecha";

const VentanaAusencia = () => {
  const { id } = useParams();
  const [ausencia, setAusencia] = useState<Ausencia | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    actionGetAusenciaUnica(Number(id))
      .then(setAusencia)
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

  if (!ausencia) return null;

  return (
    <div className="flex flex-col gap-4 p-6 h-screen">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
          Ausencia
        </span>
        <h1 className="text-2xl font-bold">{ausencia.materia}</h1>
        <p className="text-sm text-muted-foreground">{formatearFecha(ausencia.fecha)}</p>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-3">
        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Docente</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nombre</span>
            <span>{ausencia.docente.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="text-xs">{ausencia.docente.email}</span>
          </div>
        </div>

        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Publicado por</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nombre</span>
            <span>{ausencia.publicador.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="text-xs">{ausencia.publicador.email}</span>
          </div>
        </div>

        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Informacion</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Creado</span>
            <span>{new Date(ausencia.createdAt).toLocaleDateString("es-UY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaAusencia;
