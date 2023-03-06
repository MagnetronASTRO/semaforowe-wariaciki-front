import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Mainboard from "./routes/mainboard";
import Addeventform from "./routes/addEventForm";
import Viewevents from "./routes/viewEvents";
import Home from "./routes/home";
import Navbar from "./routes/navbar";

const apiAdress = "https://6354-149-156-8-98.eu.ngrok.io/";
export default apiAdress;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mainboard",
    element: <Mainboard />,
  },
  {
    path: "/routes/home",
    element: <Home />,
  },
  {
    path: "/routes/viewEvents",
    element: <Viewevents />,
  },
  {
    path: "/routes/addEventForm",
    element: <Addeventform />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
