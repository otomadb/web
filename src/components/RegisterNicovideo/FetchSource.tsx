"use client";

import clsx from "clsx";
import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";

import { useGetRemoteNicovideo } from "~/rest";

export type SourceData = {
  sourceId: string;
  title: string;
  tags: string[];
  thumbnail: string;
};

export const FetchSource: React.FC<{
  className?: string;
  setSource(data: SourceData | null | undefined): void;
}> = ({ className, setSource }) => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const trigger = useGetRemoteNicovideo();

  useSWRImmutable(
    search && /(sm)\d+/.test(search) ? search : null,
    (i) =>
      trigger(i).json<{
        sourceId: string;
        title: string;
        tags: { name: string }[];
        thumbnails: { ogp: string };
      }>(),
    {
      onSuccess(data) {
        setSource({
          sourceId: data.sourceId,
          title: data.title,
          tags: data.tags.map((v) => v.name),
          thumbnail: data.thumbnails.ogp,
        });
      },
      onError() {
        setSource(null);
      },
    }
  );

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
