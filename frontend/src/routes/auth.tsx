import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AuthLayout from "../components/AuthLayout";

const authRoutes = {
  path: '/auth',
  Component: AuthLayout,
  children: [
    {
      path: 'login',
      Component: Login,
    },
    {
      path: 'sign-up',
      Component: Register,
    },
    {
      path: 'forgot-password',
      Component: ForgotPassword,
    },
    {
      path: 'reset-password',
      Component: ResetPassword,
    }
  ]
};

export default authRoutes;