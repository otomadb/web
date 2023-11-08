"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";

import Button from "~/components/Button";
import { TextInput2 } from "~/components/TextInput";
import { extractBilibiliSourceId } from "~/utils/extractSourceId";

export default function NicovideoIDForm({
  className,
  style,
  set,
}: {
  className?: string;
  style?: React.CSSProperties;
  set(sourceId: string): void;
}) {
  const [input, setInput] = useState("");
  const parsed = useMemo<{ sourceId: string } | null>(() => {
    const sourceId = extractBilibiliSourceId(input);
    if (sourceId) return { sourceId };
    return null;
  }, [input]);

  const handleSubmit = useCallback(() => {
    if (!parsed) return;
    const { sourceId } = parsed;
    set(sourceId);
  }, [parsed, set]);

  return (
    <form
      className={clsx(
        className,
        ["flex", "flex-col", "items-start", "gap-y-2"],
        ["px-4", "py-4"]
      )}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className={clsx(["w-full"], ["flex", "flex-col", "gap-y-1"])}>
        <div className={clsx(["text-slate-400", "text-sm"])}>
          ビリビリ動画の動画IDの入力
        </div>
        <TextInput2
          size="medium"
          aria-label="ビリビリ動画の動画ID"
          placeholder="https://www.bilibili.com/video/BV1xx411c7mu"
          value={input}
          onChange={(s) => setInput(s)}
          className={clsx(["w-full"])}
        />
      </label>
      <div className={clsx(["mt-auto"])}>
        <Button
          submit
          color="blue"
          size="medium"
          text="検索"
          ariaLabel="ビリビリ動画からの検索"
          disabled={!parsed}
        />
      </div>
    </form>
  );
}
