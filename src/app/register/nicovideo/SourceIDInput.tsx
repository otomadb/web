"use client";

import clsx from "clsx";
import ky from "ky";
import React, { useCallback, useMemo, useState } from "react";

export const SourceIDInput: React.FC<{
  className?: string;
  setRemote(
    data:
      | undefined
      | null
      | {
          id: string;
          title: string;
          tags: string[];
          thumbnails: { original: string; large: string };
        }
  ): void;
}> = ({ className, setRemote }) => {
  const [sourceId, setSourceId] = useState<string>("");
  const [updatable, setUpdatable] = useState(false);
  const apiUrl = useMemo(() => {
    if (!sourceId || !/(sm)\d+/.test(sourceId)) return undefined;
    const url = new URL(
      `/${sourceId}`,
      "https://nicovideo-gti-proxy.deno.dev/"
    );
    return url.toString();
  }, [sourceId]);

  const handleClick = useCallback(async () => {
    if (!updatable) return;
    if (!apiUrl) return;

    setRemote(undefined);
    const result = await ky.get(apiUrl);
    if (!result.ok) {
      setRemote(null);
      return;
    }

    const { id, title, tags, thumbnails } = await result
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
        thumbnails: {
          original: thumbnail_url.original,
          large: thumbnail_url.large,
        },
      }));
    setRemote({ id, title, tags, thumbnails });
    setUpdatable(false);
  }, [apiUrl, setRemote, updatable]);

  return (
    <form className={clsx(className, ["flex", ["items-stretch"]])}>
      <input
        aria-label="ID入力"
        className={clsx(
          ["px-2"],
          ["py-1"],
          ["text-sm"],
          ["font-mono"],
          ["bg-white"],
          ["border", "border-gray-300"],
          ["rounded"]
        )}
        value={sourceId}
        onChange={(e) => {
          setSourceId(e.target.value);
          setUpdatable(true);
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
          ["text-sm"],
          "cursor-pointer",
          ["flex", "items-center"]
        )}
        onClick={() => {
          handleClick();
        }}
      >
        <div>検索</div>
      </div>
    </form>
  );
};
