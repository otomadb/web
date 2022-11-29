"use client";
import { useMemo } from "react";

import { useWhoami } from "./useWhoami";

export const useLoggedIn = () => {
  const whoami = useWhoami();
  return useMemo(() => whoami !== undefined && whoami !== null, [whoami]);
};
