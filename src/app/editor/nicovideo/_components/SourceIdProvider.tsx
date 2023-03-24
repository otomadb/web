"use client";
import "client-only";

import { useSearchParams } from "next/navigation";
import React, { ReactNode, useContext, useState } from "react";

const Context = React.createContext<{
  sourceId: string | null;
  setSourceId(id: string): void;
  clearSourceId(): void;
}>({
  sourceId: null,
  setSourceId: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  clearSourceId: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export const SourceIdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchParams = useSearchParams()!;
  const [sourceId, setSourceId] = useState(searchParams.get("sourceId"));

  return (
    <Context.Provider
      value={{
        sourceId,
        setSourceId: (i) => setSourceId(i),
        clearSourceId: () => setSourceId(null),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSourceId = () => {
  const { sourceId } = useContext(Context);
  return sourceId;
};

export const useSetSourceId = () => {
  const { setSourceId } = useContext(Context);
  return setSourceId;
};

export const useClearSourceId = () => {
  const { clearSourceId } = useContext(Context);
  return clearSourceId;
};
