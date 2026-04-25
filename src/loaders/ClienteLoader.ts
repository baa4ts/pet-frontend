import { Cliente } from "@/configuracion/Cliente"
import { tienePermiso } from "@/lib/permisos"
import { redirect } from "react-router"

export async function requiereSession() {
    const session = await Cliente.getSession()

    if (!session.data) {
        throw redirect('/autenticacion/login')
    }
}

export async function requiereSinSession() {
    try {
        const session = await Cliente.getSession()
        if (session.data) {
            throw redirect('/perfil')
        }
    } catch (e) {
        if (e instanceof Response) throw e
    }
}

export async function requierePermiso(permiso: string, url: string) {
    const session = await Cliente.getSession()

    if (!session.data) {
        throw redirect('/autenticacion/login')
    }

    if (!tienePermiso(session.data.user.permisos || "", permiso)) {
        throw redirect(url)
    }
}