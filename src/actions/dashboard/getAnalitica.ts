import { api } from "@/configuracion/Axios";

export const getMasLentas = async (): Promise<QueryStat[]> => {
  const { data } = await api.get<ServerResponse<QueryStat>>("/analitica/mas-lentas");
  return data.data;
};

export const getMasEjecutadas = async (): Promise<QueryStat[]> => {
  const { data } = await api.get<ServerResponse<QueryStat>>("/analitica/mas-ejecutadas");
  return data.data;
};

export const getMasTiempo = async (): Promise<QueryStat[]> => {
  const { data } = await api.get<ServerResponse<QueryStat>>("/analitica/mas-tiempo");
  return data.data;
};

export const getMasRows = async (): Promise<QueryStat[]> => {
  const { data } = await api.get<ServerResponse<QueryStat>>("/analitica/mas-rows");
  return data.data;
};
