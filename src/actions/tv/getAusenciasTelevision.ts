import { api } from "@/configuracion/Axios";

export const getAusenciasTelevision = async (): Promise<Ausencia[]> => {
  const { data } = await api.get<ServerResponse<Ausencia>>("/examenes");
  return data.data;
};
