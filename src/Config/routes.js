import { lazy } from "react";
import PrivateRoute from "./private.component";
import ProtectedRoute from "./protected.component";

export const routes = {
  login: {
    name: "Login",
    path: "/login",
    component: lazy(() => import("../Pages/Login/Login")),
    type: ProtectedRoute,
  },
  dashboard: {
    name: "Dashboard",
    path: "/home",
    component: lazy(() => import("../Pages/Dashboard/Dashboard")),
    type: PrivateRoute,
  },
  emptyRoute: {
    name: "DefautlRoute",
    path: "/",
    component: lazy(() => import("../Pages/Login/Login")),
    type: ProtectedRoute,
  },
};

export const renderRoutes = Object.entries(routes);