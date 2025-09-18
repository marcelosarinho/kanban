import { createBrowserRouter } from "react-router";
import authRoutes from "./auth";
import appRoutes from "./app";
import Error from "@pages/error/Error";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [authRoutes, appRoutes]
  },
]);

export default router;