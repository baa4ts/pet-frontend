import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { File, FilePdf, UploadSimple, X } from "@phosphor-icons/react";
import { toast } from "sonner";

import { actionNuevoRecurso } from "@/actions/nuevo/actionNuevoRecurso";
import { Button } from "@/components/ui/button";

const FORMATOS = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".mp4", ".zip"];
const ACCEPT = FORMATOS.join(",");

type ArchivoPreview = { archivo: File; preview: string | null };

const PreviewArchivo = ({ ap }: { ap: ArchivoPreview }) => {
  const tipo = ap.archivo.type;

  if (tipo.startsWith("image/") && ap.preview) {
    return (
      <img
        src={ap.preview}
        className="w-full h-full object-cover"
        alt={ap.archivo.name}
      />
    );
  }

  if (tipo.startsWith("video/") && ap.preview) {
    return (
      <video src={ap.preview} className="w-full h-full object-cover" muted controls />
    );
  }

  if (tipo === "application/pdf") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted rounded-md">
        <FilePdf size={36} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground truncate px-3 max-w-full">
          {ap.archivo.name}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted rounded-md">
      <File size={36} className="text-muted-foreground" />
      <span className="text-xs text-muted-foreground truncate px-3 max-w-full">
        {ap.archivo.name}
      </span>
    </div>
  );
};

const RecursosForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [ap, setAp] = useState<ArchivoPreview | null>(null);
  const [dragging, setDragging] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const cargarArchivo = (f: File) => {
    const valido = FORMATOS.some((ext) => f.name.toLowerCase().endsWith(ext));
    if (!valido) {
      toast.error("Formato no permitido", { position: "top-center" });
      return;
    }
    const preview =
      f.type.startsWith("image/") || f.type.startsWith("video/")
        ? URL.createObjectURL(f)
        : null;
    if (ap?.preview) URL.revokeObjectURL(ap.preview);
    setAp({ archivo: f, preview });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) cargarArchivo(f);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) cargarArchivo(f);
  };

  const quitar = () => {
    if (ap?.preview) URL.revokeObjectURL(ap.preview);
    setAp(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ap) return;

    setEnviando(true);
    const toastId = toast.loading(`Subiendo "${ap.archivo.name}"...`, {
      position: "top-center",
    });

    const ok = await actionNuevoRecurso(ap.archivo);

    if (ok) {
      toast.success(`"${ap.archivo.name}" subido correctamente`, {
        id: toastId,
        position: "top-center",
      });
      setTimeout(() => navigate("/dashboard/recursos", { replace: true }), 500);
    } else {
      toast.error(`Error al subir "${ap.archivo.name}"`, {
        id: toastId,
        position: "top-center",
      });
      setEnviando(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl">Subir un recurso</h1>

        {/* Zona de drop / preview */}
        {!ap ? (
          <>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={handleInput}
            />
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-10 cursor-pointer transition-colors duration-200
                ${
                  dragging
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-foreground/30 hover:bg-foreground/5 text-muted-foreground"
                }`}
            >
              <UploadSimple size={28} />
              <p className="text-sm">
                Arrastra un archivo o <span className="underline">selecciona</span>
              </p>
              <p className="text-xs">{FORMATOS.join(", ")} — max. 10MB</p>
            </div>
          </>
        ) : (
          <div className="relative group aspect-video rounded-md overflow-hidden border border-border">
            <PreviewArchivo ap={ap} />
            <button
              type="button"
              onClick={quitar}
              className="absolute top-2 right-2 bg-black/60 hover:bg-destructive text-white rounded-full p-1 transition-colors duration-200"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <Button type="submit" disabled={!ap || enviando}>
          {enviando ? "Subiendo..." : "Subir recurso"}
        </Button>
      </form>
    </section>
  );
};

export default RecursosForm;
