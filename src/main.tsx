import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, History, NotFound } from "@/pages";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/history", element: <History /> },
  { path: "/*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
