import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";

const appRoutes = [
  {
    path: '/kanban',
    Component: Kanban,
  },
  {
    path: '/profile',
    Component: Profile,
  }
]

export default appRoutes;