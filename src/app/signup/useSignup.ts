"use client";

import "client-only";

import ky from "ky";
import { rest } from "msw";
import { useCallback } from "react";

import { useViewer } from "~/hooks/useViewer";

export const mockSignupHandler = rest.post(
  new URL("/auth/signup", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  async (req, res, ctx) => {
    const result = await req.json<{
      name: string;
      displayName: string;
      email: string;
      password: string;
    }>();

    if (result.name === "already")
      return res(
        ctx.status(400),
        ctx.json({ code: "USER_NAME_ALREADY_REGISTERED" })
      );

    if (result.email === "already@example.com")
      return res(
        ctx.status(400),
        ctx.json({ code: "EMAIL_ALREADY_REGISTERED" })
      );

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

export type SignupErrorStatus =
  | "USER_NAME_ALREADY_REGISTERED"
  | "EMAIL_ALREADY_REGISTERED"
  | "UNKNOWN";

export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess(): void;
  onError(status: SignupErrorStatus): void;
}) => {
  const [, update] = useViewer();

  const handler = useCallback(
    async ({
      name,
      password,
      displayName,
      email,
    }: {
      name: string;
      displayName: string;
      password: string;
      email: string;
    }) => {
      const result = await ky.post(
        new URL(
          "/auth/signup",
          process.env.NEXT_PUBLIC_API_ENDPOINT
        ).toString(),
        {
          json: { name, password, displayName, email },
          throwHttpErrors: false,
          credentials: "include",
        }
      );
      if (result.ok) {
        const { id } = await result.json<{ id: string }>();
        update();
        onSuccess();
      } else {
        const { code } = await result.json<{ code: string }>();
        switch (code) {
          case "USER_NAME_ALREADY_REGISTERED":
            onError("USER_NAME_ALREADY_REGISTERED");
            break;
          case "EMAIL_ALREADY_REGISTERED":
            onError("EMAIL_ALREADY_REGISTERED");
            break;
          default:
            onError("UNKNOWN");
            break;
        }
      }
    },
    [onError, onSuccess, update]
  );
  return handler;
};
