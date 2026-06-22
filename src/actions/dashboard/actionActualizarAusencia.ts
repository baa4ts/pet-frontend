import { api } from "@/configuracion/Axios";

type E = {
  materia: string;
  fecha: string;
  docenteId: string;
};

export const actionActualizarAusencia = async (
  id: number,
  value: E,
): Promise<boolean> => {
  try {
    await api.put(`/examenes/${id}`, {
      materia: value.materia,
      fecha: new Date(value.fecha).toISOString(),
      docenteId: value.docenteId,
    });
    return true;
  } catch {
    return false;
  }
};
