"use client";

import "client-only";

import ky from "ky";
import { rest } from "msw";
import { useCallback } from "react";

export const mockLoginHandler = rest.post(
  "/auth/login",
  async (req, res, ctx) => {
    const result = await req.json<{ name: string; password: string }>();
    if (result.name !== "test")
      return res(ctx.status(400), ctx.json({ error: "user not found" }));
    if (result.password !== "pass")
      return res(ctx.status(400), ctx.json({ error: "password wrong" }));

    return res(
      ctx.cookie("otmd-session", "1-secret", {
        // httpOnly: true,
        // sameSite: "strict",
        // secure: false,
      }),
      ctx.json({ id: "1" })
    );
  }
);

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess(): void;
  onError(status: "NO_USER" | "WRONG_PASSWORD" | "UNKNOWN"): void;
}) => {
  const handler = useCallback(
    async ({ name, password }: { name: string; password: string }) => {
      const result = await ky.post("/auth/login", {
        body: JSON.stringify({ name, password }),
        throwHttpErrors: false,
      });
      if (result.ok) {
        onSuccess();
      } else {
        const { error } = await result.json<{ error: string }>();
        switch (error) {
          case "user not found":
            onError("NO_USER");
            break;
          case "password wrong":
            onError("WRONG_PASSWORD");
            break;
          default:
            onError("UNKNOWN");
            break;
        }
      }
    },
    [onError, onSuccess]
  );
  return handler;
};
