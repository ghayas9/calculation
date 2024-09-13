import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Workspace from "./pages/Workspace";
import InviteMember from "./pages/InviteMember";
import FinanceForm from "./pages/FinanceForm";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "workspace/:id",
      element: <Workspace />,
    },
    {
      path: "workspace/:id/invite",
      element: <InviteMember />,
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
