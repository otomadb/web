"use client";
import "client-only";

import { useSearchParams } from "next/navigation";
import React, { ReactNode, useContext, useState } from "react";

export const SourceIdContext = React.createContext<{
  sourceId: string | null;
  setSourceId(id: string): void;
  clearSourceId(): void;
}>({
  sourceId: null,
  setSourceId: () => {}, // eslint-disable-line no-empty-function
  clearSourceId: () => {}, // eslint-disable-line no-empty-function
});

export const SourceIdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams()!;
  const [sourceId, setSourceId] = useState(searchParams.get("sourceId"));

  return (
    <SourceIdContext.Provider
      value={{
        sourceId,
        setSourceId: (i) => setSourceId(i),
        clearSourceId: () => setSourceId(null),
      }}
    >
      {children}
    </SourceIdContext.Provider>
  );
};

export const useSourceId = () => {
  const { sourceId } = useContext(SourceIdContext);
  return sourceId;
};

export const useSetSourceId = () => {
  const { setSourceId } = useContext(SourceIdContext);
  return setSourceId;
};

export const useClearSourceId = () => {
  const { clearSourceId } = useContext(SourceIdContext);
  return clearSourceId;
};
