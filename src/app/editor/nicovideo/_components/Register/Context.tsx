"use client";
import "client-only";

import React from "react";

export const RegisterContext = React.createContext<{
  setSource: (source: {
    sourceId: string;
    title: string;
    thumbnailUrl: string;
    nicovideoRequestId: string | null;
  }) => void;

  toggleTag(id: string): void;
  toggleSemitag(name: string): void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTag: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleSemitag: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSource: () => {},
});
