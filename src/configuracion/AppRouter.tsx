import { createBrowserRouter, redirect } from "react-router";
import { requiereSession, requiereSinSession } from "@/loaders/ClienteLoader";

import HomePage from "../paginas/HomePage";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";
import Perfil from "@/paginas/Usuario/Perfil";
import Televisor from "@/paginas/Televisor/Televisor";
import LayoutDashboard from "@/paginas/Administracion/LayoutDashboard";

export const AppRouter = createBrowserRouter([
    {
        index: true,
        element: <HomePage />
    },
    {
        path: "/autenticacion",
        loader: requiereSinSession,
        children: [
            // Login
            {
                path: "login",
                element: <LoginPage />
            },
            // Registro
            {
                path: "register",
                element: <RegisterPage />
            },

            /**
             * Redireccion automatica al login
             */
            {
                index: true,
                path: "*",
                loader: () => redirect("/autenticacion/login")
            },
        ]
    },
    /**
     * Seccion para usuarios
     */
    {
        path: "/perfil",
        children: [
            {
                index: true,
                loader: requiereSession,
                element: <Perfil />
            }
        ]
    },
    /**
     * Seccion para el TV
     */
    {
        path: "/tv",
        element: <Televisor />
    },
    /**
     * Seccion dashboard y estadisticas
     */
    {
        path: "/dashboard",
        loader: requiereSession,
        element: <LayoutDashboard />
    }
])