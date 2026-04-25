import { createBrowserRouter, redirect } from "react-router";
import { requiereSession, requiereSinSession } from "@/loaders/ClienteLoader";

import HomePage from "../paginas/HomePage";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";
import Perfil from "@/paginas/Perfil/Perfil";
import LayoutDashboard from "@/paginas/Administracion/LayoutDashboard";
import DashInicial from "@/paginas/Administracion/paginas/DashInicio";
import DashInicio from "@/paginas/Administracion/paginas/DashInicio";
import DashNoticias from "@/paginas/Administracion/paginas/DashNoticias";
import DashAusencias from "@/paginas/Administracion/paginas/DashAusencias";
import DashEventos from "@/paginas/Administracion/paginas/DashEventos";
import DashUsuarios from "@/paginas/Administracion/paginas/DashUsuarios";
import Televisor from "@/paginas/Televisor/Televisor";

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
                path: "inicio",
                element: <DashInicio />
            },

            /**
             * Seccion de datos
             */
            {
                path: "noticias",
                element: <DashNoticias />
            },
            {
                path: "ausencias",
                element: <DashAusencias />
            },
            {
                path: "eventos",
                element: <DashEventos />
            },
            {
                path: "usuarios",
                element: <DashUsuarios />
            }
        ]
    }
])