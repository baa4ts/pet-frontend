import { api } from "@/configuracion/Axios";

export const getNoticiaUnica = async (id: number) => {
  const response = await api.get<ServerResponse<Noticia>>(`/noticias/${id}`);
  return response.data;
};
