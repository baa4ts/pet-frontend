import { api } from "@/configuracion/Axios";

type E = {
  titulo: string;
  descripcion: string;
};

export const actionActualizarNoticia = async (
  id: number,
  value: E,
  archivos: File[],
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append("titulo", value.titulo);
    formData.append("descripcion", value.descripcion);
    archivos.forEach((archivo) => formData.append("recursos", archivo));

    await api.put(`/noticias/${id}`, formData);
    return true;
  } catch {
    return false;
  }
};
