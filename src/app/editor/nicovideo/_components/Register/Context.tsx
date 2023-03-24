"use client";
import "client-only";

import React from "react";

export const RegisterContext = React.createContext<{
  setTitle(title: string): void;
  setSourceId(sourceId: string): void;
  setThumbnailUrl(url: string): void;
  setNicovideoRequestId(reqId: string): void;

  toggleTag(id: string): void;
  toggleSemitag(name: string): void;
}>({
  /* eslint-disable @typescript-eslint/no-empty-function */
  setTitle: () => {},
  setSourceId: () => {},
  setThumbnailUrl: () => {},
  setNicovideoRequestId: () => {},
  toggleTag: () => {},
  toggleSemitag: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
});
