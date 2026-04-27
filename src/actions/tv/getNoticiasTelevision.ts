import { api } from "@/configuracion/Axios";


export const getNoticiasTelevision = async (): Promise<Noticia[]> => {
  const { data } = await api.get<ServerResponse<Noticia>>("/noticias");
  return data.data;
};
