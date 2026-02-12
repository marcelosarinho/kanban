import { redirect } from "react-router";
import auth from "@api/middlewares/auth";
import { userContext } from "./contexts/userContext";
import { verifyResetPassword } from "@api/user";

// @ts-expect-error -- React Router ainda não exporta tipos oficiais para middleware context e temos que usar any, infelizmente.
export async function authMiddleware({ context }) {
  try {
    const response = await auth<{ message: string, data: unknown }>();

    if (!response) {
      return redirect('/auth/login');
    }

    context.set(userContext, response.data);
    return null;
  } catch {
    return redirect('/auth/login');
  }
}

export async function resetPasswordMiddleware({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);

    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      return redirect("/auth/login");
    }

    const response = await verifyResetPassword({ token, email });

    if (!response || !response.data.valid) {
      return redirect("/auth/login");
    }

    return {
      token,
      email,
      valid: response.data.valid,
      message: response.message
    }
  } catch (error) {
    console.log(error);
  }
}