type Evento = {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
