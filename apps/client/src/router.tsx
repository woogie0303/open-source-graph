import FunctionNodePage from "@/pages/functionNodePage/FunctionNodePage";
import { createBrowserRouter } from "react-router";
import App from "./App";
import { FunctionNodeNetworkGraph } from "./components/FunctionNodeNetworkGraph";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/function-nodes",
        element: <FunctionNodePage />,
        children: [
          {
            path: "/function-nodes/:fileId",
            element: <FunctionNodeNetworkGraph />,
          },
        ],
      },
    ],
  },
]);
