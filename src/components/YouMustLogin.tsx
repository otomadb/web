"use client";

import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

export const YouMustLogin: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (typeof isLoggedIn === "boolean" && !isLoggedIn)
      router.replace("/login");
  }, [isLoggedIn, router]);

  return <>{children}</>;
};
