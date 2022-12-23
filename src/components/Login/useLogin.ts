"use client";

import "client-only";

import ky from "ky";
import { useCallback } from "react";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess(): void;
  onError(status: "NO_USER" | "WRONG_PASSWORD" | "UNKNOWN"): void;
}) => {
  const handler = useCallback(
    async ({ name, password }: { name: string; password: string }) => {
      const result = await ky.post(
        new URL("/auth/login", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
        {
          json: { name, password },
          throwHttpErrors: false,
          credentials: "include",
        }
      );
      if (result.ok) {
        // const { id } = await result.json<{ id: string }>();
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
