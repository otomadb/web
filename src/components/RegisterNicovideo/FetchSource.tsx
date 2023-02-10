"use client";

import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_FetchNicovideoDocument,
  RegisterNicovideoPage_FetchNicovideoSourceFragment,
  RegisterNicovideoPage_FetchNicovideoSourceFragmentDoc,
} from "~/gql/graphql";
import { useGetRemoteNicovideo } from "~/rest";

graphql(`
  query RegisterNicovideoPage_FetchNicovideo($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        ...RegisterNicovideoPage_FetchNicovideoSource
      }
    }
  }
`);

export const FetchSource: React.FC<{
  className?: string;
  setSource(
    data: RegisterNicovideoPage_FetchNicovideoSourceFragment | null | undefined
  ): void;
}> = ({ className, setSource }) => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const trigger = useGetRemoteNicovideo();

  const sourceId = useMemo(
    () => (search && /(sm)\d+/.test(search) ? search : null),
    [search]
  );

  const [{ data, error }] = useQuery({
    query: RegisterNicovideoPage_FetchNicovideoDocument,
    variables: sourceId ? { sourceId } : undefined,
  });
  useEffect(() => {
    if (!data || !data.fetchNicovideo.source) {
      setSource(null);
      return;
    }

    const {
      fetchNicovideo: { source },
    } = data;
    setSource(
      getFragment(RegisterNicovideoPage_FetchNicovideoSourceFragmentDoc, source)
    );
  }, [data, setSource]);

  return (
    <form className={clsx(className, ["flex", ["items-stretch"]])}>
      <input
        aria-label="ID入力"
        className={clsx(
          ["px-2"],
          ["py-1"],
          ["font-mono"],
          ["bg-white"],
          ["border", "border-gray-300"],
          ["rounded"]
        )}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="sm2057168"
      />
      <div
        role={"button"}
        aria-label="検索"
        className={clsx(
          ["ml-1"],
          ["bg-blue-400", "hover:bg-blue-500"],
          ["text-blue-50", "hover:text-blue-100"],
          ["px-4"],
          ["rounded"],
          ["cursor-pointer"],
          ["flex", "items-center"]
        )}
        onClick={() => setSearch(input)}
      >
        <div>検索</div>
      </div>
    </form>
  );
};
