import { Cliente } from "@/configuracion/Cliente"
import { redirect } from "react-router"

export async function requiereSession() {
    const session = await Cliente.getSession()

    if (!session.data) {
        throw redirect('/autenticacion/login')
    }
}

export async function requiereSinSession() {
    const session = await Cliente.getSession()

    if (session.data) {
        throw redirect('/usuario')
    }
}