import { api } from "@/configuracion/Axios";

export const actionGetPermisos = async (): Promise<Array<string>> => {
  const response = await api.get<ServerResponse<string>>("/permisos/list");
  return response.data.data;
};
