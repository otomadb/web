"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function LoginCheck({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) router.replace("/me");
  }, [isAuthenticated, router]);

  return (
    <div className="relative">
      <div
        className={clsx(
          "fixed left-0 top-0 z-infinity h-screen w-full bg-coal-darkest",
          { hidden: !isLoading }
        )}
      />
      <div
        className={clsx("relative z-0", {
          hidden: isLoading || isAuthenticated,
        })}
      >
        {children}
      </div>
    </div>
  );
}
