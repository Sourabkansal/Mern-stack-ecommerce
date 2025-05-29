import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import Dashbord from "./components/dashbord.jsx";
import Products from "./components/products.jsx";
import Customers from "./components/customers.jsx";
import AddProduct from "./components/AddProduct.jsx";

const routerr = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "c",
        element: <Dashbord />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routerr}/>
);
