"use client";
import "client-only";

import React from "react";

export const RegisterContext = React.createContext<{
  toggleTag(id: string): void;
  toggleSemitag(name: string): void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTag: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleSemitag: () => {},
});
