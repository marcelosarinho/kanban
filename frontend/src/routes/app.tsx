import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";
import { authMiddleware } from "./functions";

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

export default appRoutes;