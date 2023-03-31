import { ResultOf } from "@graphql-typed-document-node/core";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
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
}> = ({ className, style, setResult, disabled, limit }) => {
  const [value, setValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: value === "",
    variables: { query, limit },
  });

  useDebounce(
    () => {
      setQuery(value);
    },
    250,
    [value]
  );

  useEffect(
    () => {
      setResult([value, value === "" ? undefined : data?.searchTags]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, data]
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
          setValue(e.target.value);
        }}
        disabled={disabled}
      />
    </label>
  );
};
