"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function LoginCheck({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) router.replace("/me");
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
