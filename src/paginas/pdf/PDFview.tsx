import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { PDFViewer } from "@react-pdf/renderer";

import { getAusenciaUnica } from "@/actions/dashboard/getAusenciaUnica";
import { AusenciaDocument } from "@/components/pdf/Ausencia";

type Ausencia = {
  id: number;
  materia: string;
  fecha: string;
  createdAt: string;
  docenteId: string;
  publicadorId: string;
  docente: { id: string; name: string; email: string };
  publicador: { id: string; name: string; email: string };
};

export default function AusenciaPDFPage() {
  const { id } = useParams<{ id: string }>();
  const [ausencia, setAusencia] = useState<Ausencia | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getAusenciaUnica(Number(id))
      .then((res) => setAusencia(res.data[0]))
      .catch(() => setError("No se pudo cargar la ausencia."));
  }, [id]);

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-sm text-destructive">
        {error}
      </div>
    );

  if (!ausencia)
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Cargando...
      </div>
    );

  return (
    <PDFViewer style={{ width: "100%", height: "100vh", border: "none" }}>
      <AusenciaDocument ausencia={ausencia} />
    </PDFViewer>
  );
}
