import { useCallback } from "react";
import { useNavigate } from "react-router";

import {
  CalendarBlank,
  House,
  Newspaper,
  Television,
  UserMinus,
  Users,
} from "@phosphor-icons/react";
import { SignOut, UserCircle } from "@phosphor-icons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Cliente } from "@/configuracion/Cliente";
import { tienePermiso } from "@/lib/permisos";

export function AppSidebar() {
  const { data: session } = Cliente.useSession();
  const navigate = useNavigate();

  const permisos = session?.user.permisos ?? "";

  const iniciales = session?.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Callback para checkear si tiene el permiso
  const tieneAlguno = useCallback(
    (lista: string[]): boolean => lista.some((p) => tienePermiso(permisos, p)),
    [permisos],
  );

  // Subrayado en rojo para seccion sin permisos
  const claseItem = (lista: string[]) =>
    !tieneAlguno(lista) ? "line-through decoration-red-500" : "";

  return (
    <Sidebar>
      {/* Titulo */}
      <SidebarHeader className="p-4">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Polo Educativo Tecnologico
        </p>
      </SidebarHeader>

      <SidebarContent>
        {/* General */}
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/dashboard")}>
                  <House size={16} />
                  Inicio
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Gestion */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled={!tieneAlguno(["noticias"])}
                  className={claseItem(["noticias"])}
                  onClick={() => navigate("/dashboard/noticias")}
                >
                  <Newspaper size={16} />
                  Noticias
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled={!tieneAlguno(["ausencias"])}
                  className={claseItem(["ausencias"])}
                  onClick={() => navigate("/dashboard/ausencias")}
                >
                  <UserMinus size={16} />
                  Ausencias
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled={!tieneAlguno(["eventos"])}
                  className={claseItem(["eventos"])}
                  onClick={() => navigate("/dashboard/eventos")}
                >
                  <CalendarBlank size={16} />
                  Eventos
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Administracion */}
        <SidebarGroup>
          <SidebarGroupLabel>Administracion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled={!tieneAlguno(["usuarios"])}
                  className={claseItem(["usuarios"])}
                  onClick={() => navigate("/dashboard/usuarios")}
                >
                  <Users size={16} />
                  Usuarios
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Acciones rapidas */}
        <SidebarGroup>
          <SidebarGroupLabel>Acciones rapidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/tv")}>
                  <Television size={16} />
                  TV
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => navigate("/perfil")}>
                                    <UserCircle size={16} />
                                    Perfil
                                </SidebarMenuButton>
                            </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — card de usuario */}
      <SidebarFooter className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 border border-border p-3 cursor-pointer hover:bg-accent transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{iniciales ?? "?"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate leading-none mb-0.5">
                  {session?.user.name ?? "—"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {session?.user.email ?? "—"}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <UserCircle size={16} className="mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                Cliente.signOut({
                  fetchOptions: {
                    onSuccess: () => navigate("/tv", { replace: true }),
                  },
                });
              }}
              className="text-destructive focus:text-destructive"
            >
              <SignOut size={16} className="mr-2" />
              Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
