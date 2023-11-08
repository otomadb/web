"use client";

import "client-only";

import clsx from "clsx";
import React, { ComponentProps, useMemo, useState } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import SearchBox from "./SearchBox";
import Suggests from "./Suggests";

export const Query = graphql(`
  query TagSearcher2($query: String!, $limit: Int) {
    searchTags(input: { query: $query, limit: $limit }) {
      ...TagSearcher2_Suggests
    }
  }
`);
export default function TagSearcher({
  className,
  style,
  size,
  handleSelect,
  limit,
  Additional,
  handleAdditionalClicked,
  showAdditional,
}: {
  className?: string;
  style?: React.CSSProperties;
  size: "small" | "medium" | "large";

  handleSelect: ComponentProps<typeof Suggests>["handleSelect"];
  limit: number;
  disabled?: boolean;

  Additional?: React.FC<{ query: string }>;
  showAdditional?: (query: string) => boolean;
  handleAdditionalClicked?(query: string): void;
}) {
  const [q, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: q === "",
    variables: { query: q, limit },
  });
  const isShowAdditional = useMemo(() => {
    if (!data) return false;
    return showAdditional ? showAdditional(q) : true;
  }, [data, q, showAdditional]);

  return (
    <div className={clsx(className, ["relative", "group"])} style={style}>
      <SearchBox
        size={size}
        fetching={fetching}
        query={q}
        setQuery={(v) => setQuery(v)}
      />
      <div
        className={clsx(
          { hidden: q === "" },
          ["invisible", "group-focus-within:visible"],
          ["border", ["border-slate-800"]],
          ["absolute", "z-1"],
          ["w-full"],
          ["mt-[1px]"]
        )}
      >
        {data && (
          <Suggests
            size={size}
            fragment={data.searchTags}
            handleSelect={handleSelect}
          />
        )}
        {Additional && isShowAdditional && (
          <div
            role="button"
            tabIndex={0}
            className={clsx(
              ["border-t", "border-slate-800"],
              ["bg-slate-950", "hover:bg-slate-900"],
              {
                small: ["py-1", "px-2"],
                medium: ["py-2", "px-2"],
                large: ["py-2", "px-2"],
              }[size],
              { "cursor-pointer": !!handleAdditionalClicked }
            )}
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
              if (handleAdditionalClicked) handleAdditionalClicked(q);
            }}
          >
            <Additional query={q} />
          </div>
        )}
      </div>
    </div>
  );
}
