import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Pages/Auth.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
        index: true,
      },
      {
        path: "signup",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
