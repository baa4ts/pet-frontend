import { redirect } from "react-router";

import { Cliente } from "@/configuracion/Cliente";
import { tienePermiso } from "@/lib/permisos";

export async function requiereSession() {
  const session = await Cliente.getSession();

  if (!session.data) {
    throw redirect("/autenticacion/login");
  }
}

export async function requiereSinSession() {
  try {
    const session = await Cliente.getSession();
    if (session.data) {
      throw redirect("/perfil");
    }
  } catch (e) {
    if (e instanceof Response) throw e;
  }
}

export async function requierePermiso(permiso: string, url: string) {
  const session = await Cliente.getSession();

  if (!session.data) {
    throw redirect("/autenticacion/login");
  }

  if (!tienePermiso(session.data.user.permisos || "", permiso)) {
    throw redirect(url);
  }
}

export async function requiereVariosPermisos(permisos: string[], url: string) {
  const session = await Cliente.getSession();

  if (!session.data) {
    throw redirect("/autenticacion/login");
  }

  const tieneVarios = permisos.every(p =>
    tienePermiso(session.data!.user.permisos || "", p)
  )

  if (!tieneVarios) {
    throw redirect(url);
  }
}