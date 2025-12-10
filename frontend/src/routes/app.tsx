import auth from "@api/middlewares/auth";
import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";
import { redirect } from "react-router";
import { userContext } from "./contexts/userContext";

const appRoutes = [
  {
    path: '/kanban',
    middleware: [authMiddleware],
    loader: async () => null,
    Component: Kanban,
  },
  {
    path: '/profile',
    middleware: [authMiddleware],
    loader: async () => null,
    Component: Profile,
  },
  {
    path: '/new-email',
    middleware: [authMiddleware],
    loader: async () => null,
    Component: VerifyNewEmail,
  }
];

// @ts-expect-error -- React Router ainda não exporta tipos oficiais para middleware context e temos que usar any, infelizmente.
async function authMiddleware({ context }) {
  console.log('oi');

  const user = await auth();

  console.log(user);

  if (!user) {
    return redirect('/auth/login');
  }

  context.set(userContext, user);
}

export default appRoutes;