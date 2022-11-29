"use client";

import "client-only";

import { useCallback } from "react";

export const useLogin = ({ onSuccess }: { onSuccess(): void }) => {
  const handler = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      onSuccess();
    },
    [onSuccess]
  );
  return handler;
};
