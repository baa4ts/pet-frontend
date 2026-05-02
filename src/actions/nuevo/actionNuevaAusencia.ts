import { api } from "@/configuracion/Axios";

type E = {
  materia: string;
  fecha: string;
  docenteId: string;
};

export const actionNuevaAusencia = async (value: E): Promise<boolean> => {
  try {
    await api.post("/ausencias", {
      materia: value.materia,
      fecha: new Date(value.fecha).toISOString(),
      docenteId: value.docenteId,
    });
    return true;
  } catch {
    return false;
  }
};
