import { api } from "@/configuracion/Axios";

type E = {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
};

export const actionActualizarEvento = async (id: number, value: E): Promise<boolean> => {
  try {
    await api.put(`/eventos/${id}`, {
      nombre: value.nombre,
      descripcion: value.descripcion,
      fechaInicio: new Date(value.fechaInicio).toISOString(),
      ...(value.fechaFin && { fechaFin: new Date(value.fechaFin).toISOString() }),
    });
    return true;
  } catch {
    return false;
  }
};
