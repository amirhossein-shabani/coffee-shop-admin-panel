// Pages

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Menu = lazy(() => import("../pages/Menu"));
const Categories = lazy(() => import("../pages/Categories"));
const Setting = lazy(() => import("../pages/Setting"));
const AddEditItem = lazy(() => import("../pages/AddEditItem"));
const AddEditCategory = lazy(() => import("../pages/AddEditCategory"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    handle: { title: "ورود" },
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: { title: "داشبورد" },
      },
      {
        path: "menu",
        element: <Menu />,
        handle: { title: "منو" },
        children: [
          {
            path: ":id",
            element: <AddEditItem />,
          },
          {
            path: "add",
            element: <AddEditItem />,
          },
        ],
      },
      {
        path: "categories",
        element: <Categories />,
        handle: { title: "دسته‌بندی‌ها" },
        children: [
          {
            path: ":href",
            element: <AddEditCategory />,
          },
          {
            path: "add",
            element: <AddEditCategory />,
          },
        ],
      },
      {
        path: "setting",
        element: <Setting />,
        handle: { title: "تنظیمات" },
      },
    ],
  },
]);
