"use client";

import clsx from "clsx";
import ky from "ky";
import React, { useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";

export type SourceData = {
  id: string;
  title: string;
  tags: string[];
  thumbnails: {
    type: string;
    url: string;
  }[];
};

export const FetchSource: React.FC<{
  className?: string;
  setSource(data: SourceData | null | undefined): void;
}> = ({ className, setSource }) => {
  const [input, setInput] = useState<string>("");
  const [sourceId, setSourceId] = useState<string | undefined>(undefined);

  const apiUrl = useMemo(() => {
    if (!sourceId || !/(sm)\d+/.test(sourceId)) return undefined;
    const url = new URL(
      `/${sourceId}`,
      "https://nicovideo-gti-proxy.deno.dev/"
    );
    return url.toString();
  }, [sourceId]);
  useSWRImmutable(
    apiUrl,
    (url) =>
      ky
        .get(url, { throwHttpErrors: false })
        .json<{
          id: string;
          title: string;
          tags: { value: string }[];
          watch_url: string;
          uploaded_at: string;
          thumbnail_url: { original: string; large: string };
        }>()
        .then(({ id, title, tags, thumbnail_url }) => ({
          id,
          title,
          tags: tags.map((v) => v.value),
          thumbnails: [
            { type: "original", url: thumbnail_url.original },
            { type: "large", url: thumbnail_url.large },
          ],
        })),
    {
      onSuccess(data) {
        setSource(data);
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
        onClick={() => {
          setSourceId(input);
        }}
      >
        <div>検索</div>
      </div>
    </form>
  );
};
