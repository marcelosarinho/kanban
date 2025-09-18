import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
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