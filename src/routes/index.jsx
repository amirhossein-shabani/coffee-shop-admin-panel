// Pages

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Menu = lazy(() => import("../pages/Menu"));
const MenuItemDetail = lazy(() => import("../pages/MenuItemDetail"));
const Categories = lazy(() => import("../pages/Categories"));
const Setting = lazy(() => import("../pages/Setting"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menu/id",
        element: <MenuItemDetail />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);
