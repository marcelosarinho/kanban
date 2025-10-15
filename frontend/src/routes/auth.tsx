import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";
import AuthLayout from "@components/auth/AuthLayout";
import VerifyDevice from "@pages/auth/VerifyDevice";
import VerifyEmail from "@pages/auth/VerifyEmail";
import auth from "@api/middlewares/auth";
import PrivateRoute from "@pages/auth/PrivateRoute";

const authRoutes = {
  path: '/auth',
  Component: AuthLayout,
  children: [
    { path: 'login', Component: Login },
    { path: 'verify-device', middleware: [auth], Component: () => (
      <PrivateRoute>
        <VerifyDevice />
      </PrivateRoute>
    ) },
    { path: 'sign-up', Component: Register },
    { path: 'verify-email', Component: VerifyEmail },
    { path: 'forgot-password', Component: ForgotPassword },
    { path: 'reset-password', Component: ResetPassword },
  ]
};

export default authRoutes;