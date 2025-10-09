import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";
import AuthLayout from "@components/auth/AuthLayout";
import VerifyDevice from "@pages/auth/VerifyDevice";

const authRoutes = {
  path: '/auth',
  Component: AuthLayout,
  children: [
    { path: 'login', Component: Login },
    { path: 'verify-device', Component: VerifyDevice },
    { path: 'sign-up', Component: Register },
    { path: 'forgot-password', Component: ForgotPassword },
    { path: 'reset-password', Component: ResetPassword },
  ]
};

export default authRoutes;