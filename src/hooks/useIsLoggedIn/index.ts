"use client";

import "client-only";

import { useContext, useMemo } from "react";

import { WhoamiContext } from "./context";

export const useIsLoggedIn = (): boolean | undefined => {
  const { whoami } = useContext(WhoamiContext);
  return useMemo(() => {
    if (whoami.checking) return undefined;
    else return !!whoami.whoami;
  }, [whoami]);
};
