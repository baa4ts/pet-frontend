import { api } from "@/configuracion/Axios";

export const getAusenciaUnica = async (id: number) => {
  const response = await api.get<ServerResponse<Ausencia>>(`/ausencias/${id}`);
  return response.data;
};
