"use client";

import { atom } from "recoil";

export const stateWhoAmI = atom<{
  id: string;
  name: string;
  displayName: string;
  icon: string;
} | null>({
  key: "whoami",
  default: null,
});
