import auth from "@api/middlewares/auth";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    authUser();
  }, []);

  async function authUser() {
    try {
      const response = await auth();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {children}
    </>
  )
}