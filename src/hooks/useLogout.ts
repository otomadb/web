"use client";

import "client-only";

import ky from "ky";
import { rest } from "msw";
import { useCallback } from "react";

import { useViewer } from "./useViewer";

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

export const useLogout = ({ onSuccess }: { onSuccess(): void }) => {
  const [, update] = useViewer();

  const handler = useCallback(async () => {
    const result = await ky.post(
      new URL("/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
      { throwHttpErrors: false, credentials: "include" }
    );
    if (result.ok) {
      onSuccess();
      update({ requestPolicy: "network-only" });
    }
  }, [onSuccess, update]);
  return handler;
};
