"use client";

import "client-only";

import { useMemo } from "react";

import { useWhoami } from "./useWhoami";

export const useIsLoggedIn = () => {
  const whoami = useWhoami();
  return useMemo(() => whoami !== undefined && whoami !== null, [whoami]);
};
