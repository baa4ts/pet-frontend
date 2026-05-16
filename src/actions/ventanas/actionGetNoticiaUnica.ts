import { api } from "@/configuracion/Axios";

export const actionGetNoticiaUnica = async (id: number): Promise<Noticia> => {
  const response = await api.get<ServerResponse<Noticia>>(`/noticias/${id}`);
  return response.data.data[0];
};
