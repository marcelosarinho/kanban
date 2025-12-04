import auth from "@api/middlewares/auth";
import PrivateRoute from "@pages/auth/PrivateRoute";
import Kanban from "@pages/kanban/Kanban";
import Profile from "@pages/kanban/Profile";
import VerifyNewEmail from "@pages/kanban/VerifyNewEmail";

const appRoutes = [
  {
    path: '/kanban',
    middleware: [auth],
    Component: () => (
      <PrivateRoute>
        <Kanban />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    middleware: [auth],
    Component: () => (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/new-email',
    middleware: [auth],
    Component: () => (
      <PrivateRoute>
        <VerifyNewEmail />
      </PrivateRoute>
    ),
  }
]

export default appRoutes;