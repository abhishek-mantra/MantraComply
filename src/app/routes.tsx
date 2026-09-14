import { createBrowserRouter, Navigate } from "react-router";

// Eager load layouts to avoid nested lazy loading
import { ProviderLayout } from "./components/ProviderLayout";
import { AdminLayout } from "./components/AdminLayout";
import { Login } from "./pages/Login";
import MyProfile from "./pages/MyProfile";

// Eager load provider page components
import Tasks from "./pages/Tasks";
import { ActiveInsurance } from "./pages/ActiveInsurance";

// Eager load admin pages to avoid dynamic import errors
import Overview from "./pages/admin/Overview";
import Providers from "./pages/admin/Providers";
import ProviderProfile from "./pages/admin/ProviderProfile";
import AdminTasks from "./pages/admin/Tasks";
import Groups from "./pages/admin/Groups";
import GroupDetail from "./pages/admin/GroupDetail";
import Licenses from "./pages/admin/Licenses";
import Documents from "./pages/admin/Documents";
import Credentialing from "./pages/admin/Credentialing";
import Payers from "./pages/admin/Payers";
import Settings from "./pages/admin/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/provider",
    Component: ProviderLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/provider/credentialing" replace />,
      },
      { path: "credentialing", Component: MyProfile },
      { path: "tasks", Component: Tasks },
      { path: "active-insurance", Component: ActiveInsurance },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/overview" replace />,
      },
      { path: "overview", Component: Overview },
      { path: "providers", Component: Providers },
      { path: "providers/:id", Component: ProviderProfile },
      { path: "tasks", Component: AdminTasks },
      { path: "groups", Component: Groups },
      { path: "groups/:id", Component: GroupDetail },
      { path: "licenses", Component: Licenses },
      { path: "documents", Component: Documents },
      { path: "credentialing", Component: Credentialing },
      { path: "payers", Component: Payers },
      { path: "settings", Component: Settings },
    ],
  },
]);