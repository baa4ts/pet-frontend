import { createBrowserRouter, redirect } from "react-router";
import { requierePermiso, requiereSession, requiereSinSession } from "@/loaders/ClienteLoader";

import HomePage from "../paginas/HomePage";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";
import Perfil from "@/paginas/Perfil/Perfil";
import LayoutDashboard from "@/paginas/Administracion/LayoutDashboard";
import DashInicio from "@/paginas/Administracion/paginas/DashInicio";
import DashNoticias from "@/paginas/Administracion/paginas/DashNoticias";
import DashAusencias from "@/paginas/Administracion/paginas/DashAusencias";
import DashEventos from "@/paginas/Administracion/paginas/DashEventos";
import DashUsuarios from "@/paginas/Administracion/paginas/DashUsuarios";
import Televisor from "@/paginas/Televisor/Televisor";
import DashNoPermisos from "@/paginas/Administracion/paginas/DashNoPermisos";

export const AppRouter = createBrowserRouter([

    /**
     * Punto de entrada de la web
     */
    {
        index: true,
        element: <HomePage />
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
                loader: () => redirect("/autenticacion/login")
            },

            /**
             * Login
             */
            {
                path: "login",
                element: <LoginPage />
            },

            /**
             * Register
             */
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },

    /**
     * Seccion para televisores
     */
    {
        path: "/tv",
        element: <Televisor />
    },

    /**
     * Seccion para el perfil del usuario
     */
    {
        path: "/perfil",
        loader: requiereSession,
        element: <Perfil />
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
                element: <DashInicio />
            },

            /**
             * Seccion de datos
             */
            {
                path: "noticias",
                loader: () => requierePermiso("noticias", "/dashboard/sin-permisos"),
                element: <DashNoticias />
            },
            {
                path: "ausencias",
                loader: () => requierePermiso("ausencias", "/dashboard/sin-permisos"),
                element: <DashAusencias />
            },
            {
                path: "eventos",
                loader: () => requierePermiso("eventos", "/dashboard/sin-permisos"),
                element: <DashEventos />
            },
            {
                path: "usuarios",
                loader: () => requierePermiso("usuarios", "/dashboard/sin-permisos"),
                element: <DashUsuarios />
            },

            /**
             * Seccion sin permisos
             */
            {
                path: "sin-permisos",
                element: <DashNoPermisos />
            }
        ]
    }
])