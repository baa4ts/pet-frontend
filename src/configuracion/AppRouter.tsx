import { createBrowserRouter, redirect } from "react-router";

import {
  requierePermiso,
  requiereSession,
  requiereSinSession,
  requiereVariosPermisos,
} from "@/loaders/ClienteLoader";
import LayoutDashboard from "@/paginas/Administracion/LayoutDashboard";
import LayoutFilters from "@/paginas/Administracion/LayoutFilters";
import DashAusencias from "@/paginas/Administracion/dash/DashAusencias";
import DashEventos from "@/paginas/Administracion/dash/DashEventos";
import DashNoticias from "@/paginas/Administracion/dash/DashNoticias";
import DashUsuarios from "@/paginas/Administracion/dash/DashUsuarios";
import DashInicio from "@/paginas/Administracion/no-it/DashInicio";
import DashNoPermisos from "@/paginas/Administracion/no-it/DashNoPermisos";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";
import Perfil from "@/paginas/Perfil/Perfil";
import Televisor from "@/paginas/Televisor/Televisor";
import AusenciasForm from "@/paginas/nuevos/AusenciasForm";
import EventosForm from "@/paginas/nuevos/EventosForm";
import NoticiasForm from "@/paginas/nuevos/NoticiasForm";
import { PermisosForm } from "@/paginas/nuevos/PermisosForm";
import { SelectorUsuarios } from "@/paginas/selector/SelectorUsuarios";
import VentanaAusencia from "@/paginas/ventanas/VentanaAusencia";
import VentanaEvento from "@/paginas/ventanas/VentanaEvento";
import VentanaNoticia from "@/paginas/ventanas/VentanaNoticia";
import VentanaUsuario from "@/paginas/ventanas/VentanaUsuario";

import HomePage from "../paginas/HomePage";

export const AppRouter = createBrowserRouter([
  /**
   * Punto de entrada de la web
   */
  {
    index: true,
    loader: () => redirect("/autenticacion/login"),
    element: <HomePage />,
  },

  /**
   * Seccion para registro y login
   */
  {
    path: "/autenticacion",
    loader: requiereSinSession,
    children: [
      /**
       * Redireccion por seguridad
       */
      {
        index: true,
        loader: () => redirect("/autenticacion/login"),
      },

      /**
       * Login
       */
      {
        path: "login",
        element: <LoginPage />,
      },

      /**
       * Register
       */
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  /**
   * Seccion para televisores
   */
  {
    path: "/tv",
    element: <Televisor />,
  },

  /**
   * Seccion para el perfil del usuario
   */
  {
    path: "/perfil",
    loader: requiereSession,
    element: <Perfil />,
  },

  /**
   * Seccion administrativa. dashboard y estadisticas
   */
  {
    path: "/dashboard",
    loader: requiereSession,
    element: <LayoutDashboard />,
    children: [
      /**
       * Seccion inicial dentro del dashboard
       */
      {
        index: true,
        element: <DashInicio />,
      },

      /**
       * Seccion de datos
       *
       * Nota: Todos los elementos de aqui cuentan con la barra de limit, offset, full.
       * Solo filtros no paginacion
       */
      {
        element: <LayoutFilters />,
        children: [
          {
            path: "noticias",
            loader: () =>
              requierePermiso("noticias", "/dashboard/sin-permisos?seccion=noticias"),
            element: <DashNoticias />,
          },
          {
            path: "ausencias",
            loader: () =>
              requierePermiso("ausencias", "/dashboard/sin-permisos?seccion=ausencias"),
            element: <DashAusencias />,
          },
          {
            path: "eventos",
            loader: () =>
              requierePermiso("eventos", "/dashboard/sin-permisos?seccion=eventos"),
            element: <DashEventos />,
          },
          {
            path: "usuarios",
            loader: () =>
              requiereVariosPermisos(
                ["usuarios", "permisos"],
                "/dashboard/sin-permisos?seccion=usuarios",
              ),
            element: <DashUsuarios />,
          },
        ],
      },

      /**
       * Seccion sin permisos
       */
      {
        path: "sin-permisos",
        element: <DashNoPermisos />,
      },
    ],
  },
  /**
   * Seccion ventanas
   */
  {
    path: "ventanas",
    loader: requiereSession,
    children: [
      {
        path: "ausencia/:id",
        loader: () =>
          requierePermiso("ausencias", "/dashboard/sin-permisos?seccion=ausencias"),
        element: <VentanaAusencia />,
      },
      {
        path: "evento/:id",
        loader: () =>
          requierePermiso("eventos", "/dashboard/sin-permisos?seccion=eventos"),
        element: <VentanaEvento />,
      },
      {
        path: "noticia/:id",
        loader: () =>
          requierePermiso("noticias", "/dashboard/sin-permisos?seccion=noticias"),
        element: <VentanaNoticia />,
      },
      {
        path: "usuario/:id",
        loader: () =>
          requierePermiso("usuarios", "/dashboard/sin-permisos?seccion=usuarios"),
        element: <VentanaUsuario />,
      },
    ],
  },
  /**
   * Seccion para crear y editar
   */
  {
    path: "/nuevo",
    loader: requiereSession,
    children: [
      {
        path: "eventos",
        loader: () =>
          requierePermiso("eventos", "/dashboard/sin-permisos?seccion=eventos"),
        element: <EventosForm />,
      },
      {
        path: "ausencias",
        loader: () =>
          requierePermiso("ausencias", "/dashboard/sin-permisos?seccion=ausencias"),
        element: <AusenciasForm />,
      },
      {
        path: "noticias",
        loader: () =>
          requierePermiso("noticias", "/dashboard/sin-permisos?seccion=noticias"),
        element: <NoticiasForm />,
      },

      /**
       * Seccion para editar permisos
       */
      {
        path: "permisos",
        children: [
          {
            index: true,
            loader: () => redirect("/dashboard"),
          },
          {
            path: ":id",
            loader: () =>
              requiereVariosPermisos(
                ["permisos", "usuarios"],
                "/dashboard/sin-permisos?seccion=permisos",
              ),
            element: <PermisosForm />,
          },
        ],
      },
    ],
  },
  /**
   * Seccion para los selectores
   */
  {
    path: "/selector",
    loader: requiereSession,
    children: [
      {
        path: "usuarios",
        loader: () =>
          requierePermiso("usuarios", "/dashboard/sin-permisos?seccion=usuarios"),
        element: <SelectorUsuarios />,
      },
    ],
  },
]);
