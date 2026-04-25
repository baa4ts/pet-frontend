import { Cliente } from "@/configuracion/Cliente"
import { useSearchParams, useNavigate } from "react-router"
import { ArrowLeft, WarningCircle, ArrowRight } from "@phosphor-icons/react"

const SECCIONES: Record<string, string> = {
    noticias:  "/dashboard/noticias",
    ausencias: "/dashboard/ausencias",
    eventos:   "/dashboard/eventos",
    usuarios:  "/dashboard/usuarios",
}

const DashSinPermisos = () => {
    const [searchParams] = useSearchParams()
    const { data: session } = Cliente.useSession()
    const navigate = useNavigate()

    const seccion = searchParams.get("seccion")
    const seccionesDisponibles = (session?.user.permisos?.split(",").filter(Boolean) ?? []).filter(p => p in SECCIONES)

    return (
        <section className="flex flex-col flex-1 gap-10 p-8 max-w-2xl">

            <div className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-destructive bg-destructive/10 border border-destructive/20 rounded px-2 py-1 w-fit mb-4">
                    <WarningCircle size={10} />
                    Acceso denegado
                </span>
                <div className="w-12 h-0.75 bg-destructive/30 rounded-full mb-5" />
                <h1 className="text-4xl font-medium leading-tight mb-2.5">
                    No podes ver<br />
                    <span className="text-destructive">{seccion ?? "esta pagina."}</span>
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu cuenta no tiene los permisos necesarios
                    {seccion && <> para acceder a <strong>{seccion}</strong></>}.
                    Contacta a un administrador si crees que esto es un error.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        Secciones disponibles
                    </span>
                    <span className="text-[11px] text-muted-foreground bg-secondary border border-border rounded-full px-2 py-0.5">
                        {seccionesDisponibles.length}
                    </span>
                </div>

                {seccionesDisponibles.length > 0 ? (
                    <div className="flex flex-col divide-y divide-border border border-border rounded-lg overflow-hidden">
                        {seccionesDisponibles.map(p => (
                            <button
                                key={p}
                                onClick={() => navigate(SECCIONES[p])}
                                className="flex items-center justify-between px-4 py-2.5 bg-background hover:bg-accent transition-colors group text-left"
                            >
                                <span className="text-sm">{p}</span>
                                <ArrowRight size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No tenes acceso a ninguna seccion.</p>
                )}
            </div>

            <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity w-fit"
            >
                <ArrowLeft size={13} />
                Volver al inicio
            </button>

        </section>
    )
}

export default DashSinPermisos