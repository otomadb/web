"use client";

import "client-only";

import { useCallback, useContext } from "react";

import { WhoamiContext } from "./useWhoami";

export const useLogout = ({ onSuccess }: { onSuccess(): void }) => {
  const { clear } = useContext(WhoamiContext);
  const handler = useCallback(async () => {
    clear();
    onSuccess();
  }, [clear, onSuccess]);
  return handler;
};
