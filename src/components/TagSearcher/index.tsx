"use client";

import "client-only";

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

  Optional?: React.FC<{ query: string }>;
}> = ({ className, style, handleSelect, limit = 5, Optional }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestsData, setSuggestsData] = useState<
    ResultOf<typeof Query>["searchTags"] | undefined
  >();

  return (
    <div className={clsx(className, ["relative", "group"])} style={style}>
      <SearchBox
        limit={limit}
        query={query}
        setQuery={(q) => setQuery(q)}
        setResult={([q, d]) => {
          setQuery(q);
          setSuggestsData(d);
        }}
      />
      <div
        className={clsx(
          ["invisible", "group-focus-within:visible"],
          ["border", ["border-slate-300"]],
          ["absolute", "z-1"],
          ["w-full"]
        )}
      >
        {suggestsData && (
          <Suggests
            fragment={suggestsData}
            handleSelect={(s) => {
              handleSelect(s);
            }}
          />
        )}
        {query !== "" && Optional && (
          <div
            className={clsx(
              ["px-2", "py-1"],
              ["bg-slate-50"],
              ["border-t-4", ["border-slate-300"]]
            )}
          >
            <Optional query={query} />
          </div>
        )}
      </div>
    </div>
  );
};
