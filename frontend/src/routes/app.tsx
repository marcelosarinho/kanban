import auth from "@api/middlewares/auth";
import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";
import { redirect } from "react-router";
import { userContext } from "./contexts/userContext";

const appRoutes = [
  {
    path: '/kanban',
    loader: authMiddleware,
    Component: Kanban,
  },
  {
    path: '/profile',
    loader: authMiddleware,
    Component: Profile,
  },
  {
    path: '/new-email',
    loader: authMiddleware,
    Component: VerifyNewEmail,
  }
];

// @ts-expect-error -- React Router ainda não exporta tipos oficiais para middleware context e temos que usar any, infelizmente.
async function authMiddleware({ context }) {
  try {
    const response = await auth<{ message: string, data: unknown }>();

    if (!response) {
      return redirect('/auth/login');
    }

    context.set(userContext, response.data);
    return null;
  } catch {
    return redirect('/auth/login');
  }
}

export default appRoutes;