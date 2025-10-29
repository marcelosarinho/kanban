import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";

const appRoutes = [
  {
    path: '/kanban',
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
]

export default appRoutes;