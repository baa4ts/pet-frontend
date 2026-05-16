// actionGetAusenciaUnica.ts
import { api } from "@/configuracion/Axios";

export const actionGetAusenciaUnica = async (id: number): Promise<Ausencia> => {
  const response = await api.get<ServerResponse<Ausencia>>(`/ausencias/${id}`);
  return response.data.data[0];
};
