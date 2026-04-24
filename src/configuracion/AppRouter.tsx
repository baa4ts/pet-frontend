import { createBrowserRouter, redirect } from "react-router";
import { requiereSession, requiereSinSession } from "@/loaders/ClienteLoader";

import HomePage from "../paginas/HomePage";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";
import Perfil from "@/paginas/Perfil/Perfil";
import LayoutDashboard from "@/paginas/Administracion/LayoutDashboard";

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
            {
                index: true,
                element: <h1>Hola</h1>
            }
        ]
    }
])