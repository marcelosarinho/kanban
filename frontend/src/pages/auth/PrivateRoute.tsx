import auth from "@api/middlewares/auth";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    auth().then(() => setAuthenticated(true)).catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <div>Carregando...</div>
  }

  if (!authenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <>
      {children}
    </>
  )
}