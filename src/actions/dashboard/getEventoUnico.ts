import { api } from "@/configuracion/Axios";

export const getEventoUnico = async (id: number) => {
  const response = await api.get<ServerResponse<Evento>>(`/eventos/${id}`);
  return response.data;
};
