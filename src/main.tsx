import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import Lists from "./Pages/Dashboard/OutLet/List.tsx";
import Templates from "./Pages/Dashboard/OutLet/Templates.tsx";
import Campaigns from "./Pages/Dashboard/OutLet/Campaigns.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CreateTemplate from "./Pages/Dashboard/OutLet/CreateTemplate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        element: <Campaigns />,
        path: "",
        index:true,
      },
      {
        element: <Campaigns />,
        path: "campaigns",
      },
      {
        element: <Lists />,
        path: "lists",
      },
      { element: <CreateTemplate />,
         path: "create-template/:id" },
      {
        element: <Templates />,
        path: "templates",
      },
      { element: <CreateTemplate />, path: "templates/create-template" },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
