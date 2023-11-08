"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { SearchBox } from "./SearchBox";
import Suggests from "./Suggests";

export const Query = graphql(`
  query TagSearcher($query: String!, $limit: Int) {
    searchTags(input: { query: $query, limit: $limit }) {
      ...TagSearcher_Suggests
    }
  }
`);
export const TagSearcher: React.FC<{
  className?: string;
  style?: React.CSSProperties;

  handleSelect(id: string): void;
  limit?: number;
  disabled?: boolean;

  Optional?: React.FC<{ query: string }>;
}> = ({
  className,
  style,
  handleSelect,
  limit = 5,
  Optional = ({ query }) => <span>{query}</span>,
}) => {
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: query === "",
    variables: { query, limit },
  });

  return (
    <div className={clsx(className, "group relative")} style={style}>
      <SearchBox
        limit={limit}
        fetching={fetching}
        setQuery={(q) => {
          setQuery(q);
        }}
      />
      <div
        className={clsx({ hidden: query === "" }, [
          "invisible absolute z-1 w-full border border-slate-300 group-focus-within:visible",
        ])}
      >
        {data && (
          <Suggests
            fragment={data.searchTags}
            handleSelect={(s) => {
              handleSelect(s);
            }}
          />
        )}
        {
          <div className={clsx("border-t border-slate-300")}>
            <Optional query={query} />
          </div>
        }
      </div>
    </div>
  );
};
