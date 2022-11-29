"use client";
import "client-only";

import { useEffect, useState } from "react";

export const useAccessToken = (): [
  string | null,
  (token: string | null) => void
] => {
  const [token, setter] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    if (token !== null) {
      window.localStorage.setItem("access_token", JSON.stringify(token));
    } else {
      const saved = window.localStorage.getItem("access_token");
      if (saved !== null) setter(JSON.parse(saved));
    }
  }, [token, setter]);

  return [token, setter];
};
