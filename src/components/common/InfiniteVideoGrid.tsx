"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useState } from "react";

export const InfiniteVideosGrid: React.FC<{
  className?: string;
  initAfter?: string;
  Fetcher: React.FC<{ after?: string; pushAfter(after: string): void }>;
}> = ({ className, initAfter, Fetcher: Fetcher2 }) => {
  const [afters, setAfters] = useState<string[]>(initAfter ? [initAfter] : []);

  const pushAfter = useCallback(
    (next: string) =>
      setAfters((prev) => (prev.includes(next) ? prev : [...prev, next])),
    []
  );
  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      {!initAfter && <Fetcher2 pushAfter={pushAfter} />}
      {afters.map((after) => (
        <Fetcher2 key={after} after={after} pushAfter={pushAfter} />
      ))}
    </div>
  );
};
