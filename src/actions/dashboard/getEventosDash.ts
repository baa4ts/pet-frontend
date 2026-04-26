import { api } from "@/configuracion/Axios";

interface Params {
  limit?: number;
  offset?: number;
  order?: string;
  full?: string;
}

export const getEventosDash = async (
  params?: Params,
): Promise<ServerResponse<Evento>> => {
  const { data } = await api.get<ServerResponse<Evento>>("/eventos", { params });
  return data;
};
