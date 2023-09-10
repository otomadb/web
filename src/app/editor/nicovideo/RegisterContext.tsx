"use client";
import "client-only";

import React, { useContext } from "react";

export const RegisterContext = React.createContext<{
  setTitle(title: string): void;
  setSourceId(sourceId: string): void;
  setThumbnailUrl(url: string): void;

  toggleTag(id: string): void;
  toggleSemitag(name: string): void;
}>({
  /* eslint-disable no-empty-function */
  setTitle: () => {},
  setSourceId: () => {},
  setThumbnailUrl: () => {},
  toggleTag: () => {},
  toggleSemitag: () => {},
  /* eslint-enable no-empty-function */
});

export const useSetTitle = () => {
  const { setTitle } = useContext(RegisterContext);
  return setTitle;
};

export const useSetThumbnailUrl = () => {
  const { setThumbnailUrl } = useContext(RegisterContext);
  return setThumbnailUrl;
};

export const useSetSourceId = () => {
  const { setSourceId } = useContext(RegisterContext);
  return setSourceId;
};

export const useToggleTag = () => {
  const { toggleTag } = useContext(RegisterContext);
  return toggleTag;
};

export const useToggleSemitag = () => {
  const { toggleSemitag } = useContext(RegisterContext);
  return toggleSemitag;
};
