import { createBrowserRouter } from "react-router";
import authRoutes from "./auth";
import appRoutes from "./app";

const router = createBrowserRouter([authRoutes, appRoutes]);

export default router;