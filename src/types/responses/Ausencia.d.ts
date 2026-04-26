type Ausencia = {
  id: number;
  materia: string;
  fecha: string;
  createdAt: string;
  docenteId: string;
  publicadorId: string;
  docente: {
    id: string;
    name: string;
    email: string;
  };
  publicador: {
    id: string;
    name: string;
    email: string;
  };
};
