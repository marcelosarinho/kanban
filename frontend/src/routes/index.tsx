import { createBrowserRouter } from "react-router";
import authRoutes from "@routes/auth";
import appRoutes from "@routes/app";
import Error from "@pages/error/Error";
import Home from "@pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      authRoutes,
      appRoutes,
    ],
  },
]);

export default router;