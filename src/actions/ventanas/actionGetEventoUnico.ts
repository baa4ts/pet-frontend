// actionGetEventoUnico.ts
import { api } from "@/configuracion/Axios";

export const actionGetEventoUnico = async (id: number): Promise<Evento> => {
  const response = await api.get<ServerResponse<Evento>>(`/eventos/${id}`);
  return response.data.data[0];
};
