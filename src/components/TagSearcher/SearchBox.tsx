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
  limit: number;
  setResult(data: ResultOf<typeof Query>["searchTags"]): void;
  disabled?: boolean;
}> = ({ setResult, disabled, limit }) => {
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: query === "",
    variables: { query, limit },
  });

  useEffect(() => {
    if (data) setResult(data.searchTags);
  }, [data, setResult]);

  return (
    <label
      className={clsx(
        ["flex", "items-stretch"],
        ["border", "border-slate-300"],
        ["rounded"],
        ["overflow-hidden"]
      )}
    >
      <div
        className={clsx(["flex-shrink-0"], ["px-4", "py-2"], ["bg-slate-400"])}
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
