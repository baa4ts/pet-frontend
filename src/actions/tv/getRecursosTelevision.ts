import { api } from "@/configuracion/Axios";

export const getRecursosTelevision = async (): Promise<Recurso[]> => {
  const { data } = await api.get<ServerResponse<Recurso>>("/recursos");
  return data.data;
};
