import { createBrowserRouter, redirect } from "react-router";

import HomePage from "../paginas/HomePage";
import LoginPage from "@/paginas/Autenticacion/LoginPage";
import RegisterPage from "@/paginas/Autenticacion/RegisterPage";

export const AppRouter = createBrowserRouter([
    {
        index: true,
        element: <HomePage />
    },
    {
        path: "/autenticacion",
        children: [
            // Login
            {
                path: "login",
                element: <LoginPage />
            },
            // Registro
            {
                path: "register",
                element: <RegisterPage/>
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
    }
])