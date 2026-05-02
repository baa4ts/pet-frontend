import { api } from "@/configuracion/Axios";

type E = {
  titulo: string;
  descripcion: string;
};

export const actionNuevaNoticia = async (
  value: E,
  archivos: File[],
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append("titulo", value.titulo);
    formData.append("descripcion", value.descripcion);
    archivos.forEach((archivo) => formData.append("recursos", archivo));

    await api.post("/noticias", formData);
    return true;
  } catch {
    return false;
  }
};
