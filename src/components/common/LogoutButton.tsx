"use client";

import "client-only";

import clsx from "clsx";
import ky from "ky";
import { rest } from "msw";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { LogoutButtonDocument } from "~/gql/graphql";

export const mockLogoutHandler = rest.post(
  new URL("/api/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
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

graphql(`
  query LogoutButton {
    whoami {
      id
    }
  }
`);
export const LogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [, updateViewer] = useQuery({
    query: LogoutButtonDocument,
    pause: true,
  });

  const router = useRouter();
  const handleLogout = useCallback(async () => {
    const result = await ky.post(
      new URL(
        "/api/auth/logout",
        process.env.NEXT_PUBLIC_API_ENDPOINT
      ).toString(),
      { throwHttpErrors: false, credentials: "include" }
    );
    if (result.ok) {
      updateViewer({ requestPolicy: "network-only" });
      router.push("/");
    }
  }, [router, updateViewer]);

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
