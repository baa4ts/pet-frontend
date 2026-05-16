import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { actionGetEventoUnico } from "@/actions/ventanas/actionGetEventoUnico";
import { formatearFecha } from "@/lib/formatearFecha";

const VentanaEvento = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    actionGetEventoUnico(Number(id))
      .then(setEvento)
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

  if (!evento) return null;

  return (
    <div className="flex flex-col gap-4 p-6 h-screen">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
          Evento
        </span>
        <h1 className="text-2xl font-bold">{evento.nombre}</h1>
        <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-3">
        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Fechas</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Inicio</span>
            <span className="text-blue-500 font-medium">
              {formatearFecha(evento.fechaInicio)}
            </span>
          </div>
          {evento.fechaFin && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fin</span>
              <span>{formatearFecha(evento.fechaFin)}</span>
            </div>
          )}
        </div>

        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Publicado por</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nombre</span>
            <span>{evento.user.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="text-xs">{evento.user.email}</span>
          </div>
        </div>

        <div className="rounded-md border border-border p-4 flex flex-col gap-3">
          <p className="text-sm font-medium">Informacion</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Creado</span>
            <span>{new Date(evento.createdAt).toLocaleDateString("es-UY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaEvento;
