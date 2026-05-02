import { api } from "@/configuracion/Axios";

type E = {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
};

export const actionNuevoEvento = async (value: E): Promise<boolean> => {
  try {
    await api.post("/eventos", {
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
