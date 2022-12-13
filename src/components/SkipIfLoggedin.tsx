"use client";

import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

export const SkipIfLoggedin: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  return <>{children}</>;
};
