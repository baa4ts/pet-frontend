import { api } from "@/configuracion/Axios";

interface Params {
  limit?: number;
  offset?: number;
  order?: string;
}

export const getRecursosDash = async (
  params?: Params,
): Promise<ServerResponse<Recurso>> => {
  const { data } = await api.get<ServerResponse<Recurso>>("/recursos", { params });
  return data;
};