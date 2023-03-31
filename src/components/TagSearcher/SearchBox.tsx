import { ResultOf } from "@graphql-typed-document-node/core";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useQuery } from "urql";

import { TextInput } from "~/components/common/TextInput";
import { graphql } from "~/gql";

export const Query = graphql(`
  query TagSearcher_SearchBox($query: String!, $limit: Int) {
    searchTags(input: { query: $query, limit: $limit }) {
      ...TagSearcher_Suggests
    }
  }
`);
export const SearchBox: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  limit: number;
  setResult(
    result: [string, ResultOf<typeof Query>["searchTags"] | undefined]
  ): void;
  disabled?: boolean;

  query: string;
  setQuery(query: string): void;
}> = ({ className, style, setResult, disabled, limit }) => {
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: query === "",
    variables: { query, limit },
  });

  useEffect(
    () => {
      if (data) setResult([query, data.searchTags]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  useEffect(
    () => {
      if (query === "") setResult([query, undefined]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return (
    <label
      className={clsx(
        className,
        ["flex", "items-stretch"],
        ["border", "border-slate-300"],
        ["rounded"],
        ["overflow-hidden"]
      )}
      style={style}
    >
      <div
        className={clsx(["flex-shrink-0"], ["px-3", "py-2"], ["bg-slate-400"])}
      >
        <MagnifyingGlassIcon
          className={clsx(
            { hidden: fetching },
            ["w-4", "h-4"],
            ["text-slate-200"]
          )}
        />
        <ArrowPathIcon
          className={clsx(
            { hidden: !fetching },
            ["text-slate-200"],
            ["w-4", "h-4"],
            ["animate-spin"]
          )}
        />
      </div>
      <TextInput
        className={clsx(["flex-grow"], ["px-2"])}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        disabled={disabled}
      />
    </label>
  );
};
