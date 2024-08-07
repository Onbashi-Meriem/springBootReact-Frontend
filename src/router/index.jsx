/* eslint-disable react-refresh/only-export-components */
import { SignUp } from "@/pages/SignUp/index.jsx";
import { Home } from "@/pages/Home.jsx";
import { Activation } from "@/pages/Activation/index.jsx";
import App from "@/App.jsx";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <>Not found</>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/activation/:token",
        Component: Activation,
      },
    ],
  },
]);
