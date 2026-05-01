import { api } from "@/configuracion/Axios";

interface Props {
  id: number | string;
  url: string;
  onError?: (status: number) => void;
}

export const EliminarElemento = async ({ url, id, onError }: Props): Promise<boolean> => {
  const response = await api.delete(`/${url}/${id}`);

  if (response.status === 401 || response.status === 403) {
    onError?.(response.status);
    return false;
  }

  return response.status === 200 || response.status === 204;
};
