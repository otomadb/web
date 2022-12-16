"use client";

import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

import { useIsLogin } from "~/hooks/useIsLogin";

export const YouMustLogin: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const isLogin = useIsLogin();

  useEffect(() => {
    if (typeof isLogin === "boolean" && !isLogin) router.replace("/login");
  }, [isLogin, router]);

  return <>{children}</>;
};
