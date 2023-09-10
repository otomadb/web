"use client";
import "client-only";

import React, { useContext } from "react";

export const RequestContext = React.createContext<{
  setRequestId(reqId: string | null): void;
}>({
  /* eslint-disable no-empty-function */
  setRequestId: () => {},
  /* eslint-enable no-empty-function */
});

export const useSetRequestId = () => {
  const { setRequestId } = useContext(RequestContext);
  return setRequestId;
};
