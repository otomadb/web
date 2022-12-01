"use client";

import "client-only";

import ky from "ky";
import { rest } from "msw";
import { useCallback, useContext } from "react";

import { WhoamiContext } from "./useIsLoggedIn/context";

export const mockLogoutHandler = rest.post(
  "/auth/logout",
  async (req, res, ctx) => {
    return res(
      ctx.cookie("otmd-session", "", {
        expires: new Date(Date.now() - 60),
        // httpOnly: true,
        // sameSite: "strict",
        // secure: false,
      })
    );
  }
);

export const useLogout = ({ onSuccess }: { onSuccess(): void }) => {
  const { removeId } = useContext(WhoamiContext);
  const handler = useCallback(async () => {
    const result = await ky.post("/auth/logout", {
      throwHttpErrors: false,
    });
    if (result.ok) {
      removeId();
      onSuccess();
    }
  }, [removeId, onSuccess]);
  return handler;
};
