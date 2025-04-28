import FunctionNodePage from "@/pages/functionNodePage/FunctionNodePage";
import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import { FunctionNodeGraph } from "./components/FunctionNodeNetworkGraph";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/function-nodes" replace />,
      },
      {
        path: "/function-nodes",
        element: <FunctionNodePage />,
        children: [
          {
            path: "/function-nodes/:fileId",
            element: <FunctionNodeGraph />,
          },
        ],
      },
    ],
  },
]);
