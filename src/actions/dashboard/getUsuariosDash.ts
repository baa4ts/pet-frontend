import { api } from "@/configuracion/Axios";

interface Params {
  limit?: number;
  offset?: number;
  order?: string;
  full?: string;
}

export const getUsuariosDash = async (
  params?: Params,
): Promise<ServerResponse<Usuario>> => {
  const { data } = await api.get<ServerResponse<Usuario>>("/usuarios", { params });
  return data;
};
