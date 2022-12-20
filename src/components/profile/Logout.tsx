"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

import { useLogout } from "~/hooks/useLogout";

export const Logout: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const logout = useLogout({
    onSuccess() {
      router.push("/");
    },
  });

  return (
    <button
      className={clsx(
        className,
        ["px-2"],
        ["py-1"],
        ["bg-blue-400"],
        ["text-white"],
        ["rounded"]
      )}
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};
