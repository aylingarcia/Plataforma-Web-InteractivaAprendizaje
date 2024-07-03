import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Game } from "../game/Game";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { Admin } from "../user/admin/Admin"; // Suponiendo que tienes un componente Admin
import { Student } from "../user/student/Student"; // Suponiendo que tienes un componente Student
import { useAuth } from "../provider/AuthProvider";

const Router = () => {
  const { token } = useAuth();

  const getRoleFromToken = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  };

  const role = token ? getRoleFromToken(token) : null;

  const publicRoutes = [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
  ];

  const privateRoutes = [
    {
      path: "/admin",
      element: role === "administrador" ? <Admin /> : <Login />,
    },
    {
      path: "/student",
      element: role === "estudiante" ? <Student /> : <Login />,
    },
    {
      path: "/game",
      element: <Game />,
    },
  ];

  const allRoutes = [...publicRoutes, ...privateRoutes];

  const router = createBrowserRouter(allRoutes);

  return <RouterProvider router={router} />;
};

export default Router;
