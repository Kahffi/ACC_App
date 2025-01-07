import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./Pages/AuthPage.tsx";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Report from "./Pages/Report.tsx";

import ExcelDataContextProvider from "./contexts/ExcelDataContextProvider.tsx";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: (
              <ExcelDataContextProvider>
                <Dashboard />
              </ExcelDataContextProvider>
            ),
          },
          {
            path: "report",
            element: (
              <ExcelDataContextProvider>
                <Report />,
              </ExcelDataContextProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "auth/:session",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
