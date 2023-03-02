"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useState } from "react";

import { Fetcher } from "./Fetcher";

export const InfiniteVideosGrid: React.FC<{
  className?: string;
  initAfter?: string;
}> = ({ className, initAfter }) => {
  const [afters, setAfters] = useState<string[]>(initAfter ? [initAfter] : []);

  const pushAfter = useCallback(
    (next: string) =>
      setAfters((prev) => (prev.includes(next) ? prev : [...prev, next])),
    []
  );
  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      {!initAfter && <Fetcher pushAfter={pushAfter} />}
      {afters.map((after) => (
        <Fetcher key={after} after={after} pushAfter={pushAfter} />
      ))}
    </div>
  );
};
