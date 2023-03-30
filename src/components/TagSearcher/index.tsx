"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useState } from "react";

import { Query, SearchBox } from "./SearchBox";
import Suggests from "./Suggests";

export const TagSearcher: React.FC<{
  className?: string;
  style?: React.CSSProperties;

  handleSelect(id: string): void;
  limit?: number;
  disabled?: boolean;
  Optional?: React.FC<{ query: string; clearQuery(): void }>;
}> = ({ className, style, handleSelect, limit = 5 }) => {
  const [result, setResult] = useState<
    ResultOf<typeof Query>["searchTags"] | undefined
  >();

  return (
    <div className={clsx(className, ["relative"])} style={style}>
      <SearchBox limit={limit} setResult={(r) => setResult(r)} />
      <div className={clsx(["absolute"], ["w-full"])}>
        {result && <Suggests fragment={result} handleSelect={handleSelect} />}
      </div>
    </div>
  );
};
