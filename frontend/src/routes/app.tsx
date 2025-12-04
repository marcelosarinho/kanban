import auth from "@api/middlewares/auth";
import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";
import { redirect } from "react-router";
import { userContext } from "./contexts/userContext";

const appRoutes = [
  {
    path: '/kanban',
    middleware: [timingMiddleware],
    Component: Kanban,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/new-email',
    Component: VerifyNewEmail,
  }
];

async function timingMiddleware({ context }, next) {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation took ${duration}ms`);
}

// @ts-expect-error -- React Router ainda não exporta tipos oficiais para middleware context e temos que usar any, infelizmente.
async function authMiddleware({ context }) {
  const user = await auth();

  console.log('oi');

  if (!user) {
    return redirect('/auth/login');
  }

  context.set(userContext, user);
}

export default appRoutes;