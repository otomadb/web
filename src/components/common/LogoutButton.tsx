"use client";

import "client-only";

import clsx from "clsx";
import ky from "ky";
import { rest } from "msw";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

import { useViewer } from "~/hooks/useViewer";

export const mockLogoutHandler = rest.post(
  new URL("/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  async (req, res, ctx) => {
    return res(
      ctx.cookie("otmd-session", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        expires: new Date(Date.now() - 1),
      })
    );
  }
);

export const LogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [{ data }] = useViewer();

  const router = useRouter();
  const handleLogout = useCallback(async () => {
    const result = await ky.post(
      new URL("/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
      { throwHttpErrors: false, credentials: "include" }
    );
    if (result.ok) {
      // update({ requestPolicy: "network-only" });
      router.push("/");
    }
  }, [router]);

  return (
    <button
      className={clsx(className)}
      type="button"
      onClick={() => handleLogout()}
    >
      ログアウト
    </button>
  );
};
