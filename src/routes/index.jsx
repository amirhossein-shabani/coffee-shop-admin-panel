// Pages

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Setting from "../pages/Setting";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Menu = lazy(() => import("../pages/Menu"));
const Categories = lazy(() => import("../pages/Categories"));
const Users = lazy(() => import("../pages/Users"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/menu",
    element: (
      <Layout>
        <Menu />
      </Layout>
    ),
  },
  {
    path: "/categories",
    element: (
      <Layout>
        <Categories />
      </Layout>
    ),
  },
  {
    path: "/setting",
    element: (
      <Layout>
        <Setting />
      </Layout>
    ),
  },
  // {
  //   path: "/users",
  //   element: (
  //     <Layout>
  //       <Users />
  //     </Layout>
  //   ),
  // },
]);
