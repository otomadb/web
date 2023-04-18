"use client";
import "client-only";

import React, { useContext } from "react";

export const RequestContext = React.createContext<{
  setRequestId(reqId: string | null): void;
}>({
  /* eslint-disable @typescript-eslint/no-empty-function */
  setRequestId: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
});

export const useSetRequestId = () => {
  const { setRequestId } = useContext(RequestContext);
  return setRequestId;
};
