import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";

interface AuthRedirectOptions {
  role?: string;
  router?: NextRouter
}

export function useAuthRedirect(
  to: string,
  options: AuthRedirectOptions = {
    role: "user",
  }
) {

  if (!options.router) {
    throw new Error("useAuthRedirect: router is required");
  }

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      options.router?.push(to);
    },
  });

  if (session?.role !== options.role) {
    options.router.push(to);
  }

  return { status, session };
}
